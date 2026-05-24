'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import { api } from '@/lib/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync with local storage or backend
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      if (isAuthenticated) {
        try {
          const res = await api.getCart();
          if (res.success) {
            setItems(res.data.items || []);
          }
        } catch (error) {
          console.error('Failed to load cart from API');
        }
      } else {
        const localCart = localStorage.getItem('cartItems');
        if (localCart) {
          try {
            setItems(JSON.parse(localCart));
          } catch (e) {
            setItems([]);
          }
        }
      }
      setLoading(false);
    };

    loadCart();
  }, [isAuthenticated]);

  // Save to local storage if guest
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      localStorage.setItem('cartItems', JSON.stringify(items));
    }
  }, [items, isAuthenticated, loading]);

  const addItem = async (item) => {
    // If it is a dummy product from the homepage (short ID format instead of UUID)
    // we bypass the API call and just add it to local state so the user can test the UI
    if (item.product_id && String(item.product_id).length < 10) {
      setItems(prev => {
        const existing = prev.find(i => i.product_id === item.product_id && i.variant_id === item.variant_id);
        if (existing) {
          return prev.map(i => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i);
        }
        return [...prev, { 
          ...item, 
          cart_item_id: Math.random().toString(36).substr(2, 9),
          product: { 
            id: item.product_id, 
            name: item.name, 
            images: [item.image || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop'], 
            price: item.price 
          } 
        }];
      });
      return;
    }

    if (isAuthenticated) {
      try {
        await api.addToCart({ product_id: item.product_id, variant_id: item.variant_id, quantity: item.quantity });
        // Refresh cart
        const res = await api.getCart();
        if (res.success) setItems(res.data.items || []);
      } catch (err) {
        throw err;
      }
    } else {
      setItems(prev => {
        const existing = prev.find(i => i.product_id === item.product_id && i.variant_id === item.variant_id);
        if (existing) {
          return prev.map(i => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i);
        }
        return [...prev, { ...item, cart_item_id: Math.random().toString(36).substr(2, 9) }];
      });
    }
  };

  const removeItem = async (cartItemId) => {
    if (isAuthenticated && String(cartItemId).length > 15) {
      try {
        await api.removeFromCart(cartItemId);
        setItems(prev => prev.filter(i => i.cart_item_id !== cartItemId));
      } catch (err) {
        throw err;
      }
    } else {
      setItems(prev => prev.filter(i => i.cart_item_id !== cartItemId));
    }
  };

  const updateQty = async (cartItemId, quantity) => {
    if (isAuthenticated && String(cartItemId).length > 15) {
      try {
        await api.updateCartItem(cartItemId, quantity);
        setItems(prev => prev.map(i => i.cart_item_id === cartItemId ? { ...i, quantity } : i));
      } catch (err) {
        throw err;
      }
    } else {
      setItems(prev => prev.map(i => i.cart_item_id === cartItemId ? { ...i, quantity } : i));
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await api.clearCart();
        setItems([]);
      } catch (err) {
        throw err;
      }
    } else {
      setItems([]);
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + ((item.final_price || item.price) * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      total,
      loading,
      addItem,
      removeItem,
      updateQty,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
