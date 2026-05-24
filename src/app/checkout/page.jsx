'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/Toast';
import { Loader } from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { MapPin, CreditCard, Banknote, Plus, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { items, total: cartTotal, loading: cartLoading, clearCart } = useCart();
  const router = useRouter();
  const { addToast } = useToast();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [fetchingAddresses, setFetchingAddresses] = useState(true);

  // New Address Form State
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', pincode: '', phone: '' });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/checkout');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAddresses();
    }
  }, [isAuthenticated]);

  const fetchAddresses = async () => {
    try {
      const res = await api.getAddresses();
      if (res.success) {
        setAddresses(res.data);
        if (res.data.length > 0) {
          setSelectedAddressId(res.data[0].id);
        } else {
          setShowNewAddress(true);
        }
      }
    } catch (err) {
      console.error(err);
      addToast('Failed to load addresses', 'error');
    } finally {
      setFetchingAddresses(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await api.addAddress(newAddress);
      if (res.success) {
        addToast('Address added successfully', 'success');
        setAddresses([...addresses, res.data]);
        setSelectedAddressId(res.data.id);
        setShowNewAddress(false);
        setNewAddress({ street: '', city: '', state: '', pincode: '', phone: '' });
      }
    } catch (err) {
      addToast(err.message || 'Failed to add address', 'error');
    }
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      addToast('Please select a shipping address', 'error');
      return;
    }

    if (items.length === 0) {
      addToast('Your cart is empty', 'error');
      return;
    }

    setIsPlacingOrder(true);
    try {
      const hasDummyItems = items.some(item => String(item.product_id).length < 10);
      
      const finalizeDemoOrder = async () => {
        addToast('Order placed successfully (Demo Mode)!', 'success');
        const fakeOrderId = 'DEMO-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        const demoOrder = {
           id: fakeOrderId,
           status: 'pending',
           created_at: new Date().toISOString(),
           payment_method: paymentMethod,
           total: finalTotal,
           subtotal: cartTotal,
           tax: tax,
           shipping_fee: shipping,
           items: items.map(i => ({ 
             product_name: i.product?.name || i.name || 'Exclusive Item', 
             quantity: i.quantity, 
             price: i.final_price || i.price, 
             size: i.size 
           }))
        };
        
        const existingDemoOrders = JSON.parse(localStorage.getItem('demoOrders') || '[]');
        localStorage.setItem('demoOrders', JSON.stringify([demoOrder, ...existingDemoOrders]));

        await clearCart();
        router.push('/checkout/success?order_id=' + fakeOrderId);
      };

      if (hasDummyItems) {
        if (paymentMethod === 'razorpay') {
          // Open Razorpay widget without order_id for demo purposes
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_StD2ExcM7XOJ5B',
            amount: finalTotal, // paise (already calculated as paise)
            currency: 'INR',
            name: 'Noore Imperial',
            description: 'Demo Payment Authorization',
            image: window.location.origin + '/logo.png',
            config: {
              display: {
                blocks: {
                  upi: { name: 'UPI & QR', instruments: [{ method: 'upi' }] },
                  cards: { name: 'Cards', instruments: [{ method: 'card' }] },
                  other: { name: 'Other Options', instruments: [{ method: 'netbanking' }, { method: 'wallet' }, { method: 'paylater' }] }
                },
                sequence: ['block.upi', 'block.cards', 'block.other'],
                preferences: { show_default_blocks: false }
              }
            },
            handler: async function (response) {
              await finalizeDemoOrder();
            },
            theme: { color: '#D4AF37' }
          };
          
          const rzp = new window.Razorpay(options);
          rzp.on('payment.failed', function (response){
             addToast('Payment cancelled or failed.', 'error');
             setIsPlacingOrder(false);
          });
          rzp.open();
        } else {
          await finalizeDemoOrder();
        }
        return;
      }

      // Real Order Logic
      const orderItems = items.map(item => ({
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity
      }));

      const res = await api.createOrder({
        address_id: selectedAddressId,
        items: orderItems,
        payment_method: paymentMethod
      });

      if (res.success) {
        const order = res.data;
        if (paymentMethod === 'razorpay' && order.razorpay_order_id) {
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_StD2ExcM7XOJ5B',
            amount: order.total, // amount is already in paise from backend!
            currency: 'INR',
            name: 'Noore Imperial',
            description: 'Luxury Fashion Order',
            image: window.location.origin + '/logo.png',
            order_id: order.razorpay_order_id,
            config: {
              display: {
                blocks: {
                  upi: { name: 'UPI & QR', instruments: [{ method: 'upi' }] },
                  cards: { name: 'Cards', instruments: [{ method: 'card' }] },
                  other: { name: 'Other Options', instruments: [{ method: 'netbanking' }, { method: 'wallet' }, { method: 'paylater' }] }
                },
                sequence: ['block.upi', 'block.cards', 'block.other'],
                preferences: { show_default_blocks: false }
              }
            },
            handler: async function (response) {
              addToast('Payment Successful!', 'success');
              await clearCart();
              router.push('/checkout/success?order_id=' + order.id);
            },
            theme: { color: '#D4AF37' }
          };
          
          const rzp = new window.Razorpay(options);
          rzp.on('payment.failed', function (response){
             addToast('Payment failed. Please try again.', 'error');
             setIsPlacingOrder(false);
          });
          rzp.open();
        } else {
          addToast('Order placed successfully!', 'success');
          await clearCart();
          router.push('/checkout/success?order_id=' + order.id);
        }
      }
    } catch (err) {
      addToast(err.message || 'Failed to place order', 'error');
      setIsPlacingOrder(false);
    }
  };

  if (authLoading || !isAuthenticated || cartLoading || fetchingAddresses) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><Loader /></div>;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 px-4 flex flex-col items-center justify-center font-poppins">
        <h2 className="text-3xl text-gold font-cormorant mb-6">Your Cart is Empty</h2>
        <Button variant="primary" onClick={() => router.push('/shop')}>Continue Shopping</Button>
      </div>
    );
  }

  const shipping = cartTotal > 100000 ? 0 : 5000;
  const tax = Math.round(cartTotal * 0.18);
  const finalTotal = cartTotal + shipping + tax;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8 font-poppins">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-cormorant text-4xl md:text-5xl text-gold mb-12 uppercase tracking-widest text-center">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Details */}
          <div className="flex-1 space-y-12">
            
            {/* Address Section */}
            <section className="bg-black border border-white/10 p-6 md:p-8">
              <h2 className="text-xl text-ivory tracking-widest uppercase mb-6 flex items-center gap-3">
                <MapPin className="text-gold w-5 h-5" /> Shipping Address
              </h2>
              
              {addresses.length > 0 && !showNewAddress && (
                <div className="space-y-4 mb-6">
                  {addresses.map(addr => (
                    <div 
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`relative p-5 border cursor-pointer transition-all duration-300 ${selectedAddressId === addr.id ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-white/30'}`}
                    >
                      {selectedAddressId === addr.id && <CheckCircle2 className="absolute top-4 right-4 text-gold w-5 h-5" />}
                      <p className="text-ivory font-medium mb-1">{addr.street}</p>
                      <p className="text-grey text-sm">{addr.city}, {addr.state} - {addr.pincode}</p>
                      {addr.phone && <p className="text-grey text-sm mt-1">Phone: {addr.phone}</p>}
                    </div>
                  ))}
                  <button onClick={() => setShowNewAddress(true)} className="text-gold text-sm tracking-widest hover:text-white transition-colors flex items-center gap-2 mt-4 uppercase">
                    <Plus className="w-4 h-4" /> Add New Address
                  </button>
                </div>
              )}

              {showNewAddress && (
                <form onSubmit={handleAddAddress} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-grey mb-2">Street Address</label>
                    <input type="text" required value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} className="w-full bg-transparent border border-white/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-grey mb-2">City</label>
                      <input type="text" required value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="w-full bg-transparent border border-white/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-grey mb-2">State</label>
                      <input type="text" required value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} className="w-full bg-transparent border border-white/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-grey mb-2">Pincode</label>
                      <input type="text" required value={newAddress.pincode} onChange={e => setNewAddress({...newAddress, pincode: e.target.value})} className="w-full bg-transparent border border-white/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-grey mb-2">Phone (Optional)</label>
                      <input type="text" value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} className="w-full bg-transparent border border-white/20 text-ivory p-3 focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <Button type="submit" variant="primary" className="text-xs">Save Address</Button>
                    {addresses.length > 0 && (
                      <button type="button" onClick={() => setShowNewAddress(false)} className="text-grey hover:text-white text-xs uppercase tracking-widest transition-colors">Cancel</button>
                    )}
                  </div>
                </form>
              )}
            </section>

            {/* Payment Section */}
            <section className="bg-black border border-white/10 p-6 md:p-8">
              <h2 className="text-xl text-ivory tracking-widest uppercase mb-6 flex items-center gap-3">
                <CreditCard className="text-gold w-5 h-5" /> Payment Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-5 border cursor-pointer flex items-center gap-4 transition-colors ${paymentMethod === 'razorpay' ? 'border-gold bg-gold/5 text-ivory' : 'border-white/10 text-grey hover:border-white/30'}`}
                >
                  <CreditCard className={paymentMethod === 'razorpay' ? 'text-gold' : 'text-grey'} />
                  <div>
                    <p className="font-medium">Online Payment</p>
                    <p className="text-xs mt-1 opacity-70">Credit/Debit Card, UPI</p>
                  </div>
                </div>
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-5 border cursor-pointer flex items-center gap-4 transition-colors ${paymentMethod === 'cod' ? 'border-gold bg-gold/5 text-ivory' : 'border-white/10 text-grey hover:border-white/30'}`}
                >
                  <Banknote className={paymentMethod === 'cod' ? 'text-gold' : 'text-grey'} />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-xs mt-1 opacity-70">Pay when you receive</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column - Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-black border border-white/10 p-6 sticky top-28">
              <h2 className="text-xl text-ivory tracking-widest uppercase mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-white/10 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-16 h-20 bg-white/5 relative shrink-0">
                      {item.product?.images?.[0] && (
                         <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-ivory text-sm line-clamp-1">{item.product?.name || item.name}</p>
                      <p className="text-grey text-xs mt-1">Qty: {item.quantity}</p>
                      {item.variant_id && <p className="text-grey text-xs mt-0.5">Size: {item.size || 'Standard'}</p>}
                    </div>
                    <p className="text-gold text-sm">{formatPrice(item.final_price || item.price)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-grey uppercase tracking-widest text-[10px]">Subtotal</span>
                  <span className="text-ivory">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-grey uppercase tracking-widest text-[10px]">Estimated Tax (18%)</span>
                  <span className="text-ivory">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-grey uppercase tracking-widest text-[10px]">Shipping</span>
                  <span className="text-ivory">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8 pt-6 border-t border-white/10">
                <span className="text-ivory uppercase tracking-widest">Total</span>
                <span className="text-2xl text-gold font-cormorant">{formatPrice(finalTotal)}</span>
              </div>

              <Button 
                variant="primary" 
                className="w-full uppercase tracking-[0.2em] text-xs h-12"
                onClick={handlePlaceOrder}
                isLoading={isPlacingOrder}
                disabled={isPlacingOrder || !selectedAddressId}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
