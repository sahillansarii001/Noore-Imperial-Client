'use client';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Trash2, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items, total, removeItem, updateQty } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push('/checkout');
    } else {
      router.push('/auth/login?redirect=/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8 font-poppins">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-cormorant text-4xl md:text-5xl text-gold mb-10 text-center uppercase tracking-widest">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-20 bg-[#0a0a0a] border border-white/5">
            <p className="text-grey mb-8 font-poppins">Your cart is currently empty.</p>
            <Link href="/shop">
              <Button variant="primary">Return to Shop</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gold/30 text-grey uppercase tracking-widest text-xs font-montserrat mb-6">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="space-y-6">
                {items.map((item) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.cart_item_id} 
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#0a0a0a] md:bg-transparent p-4 md:p-0 border border-white/5 md:border-none"
                  >
                    {/* Mobile: Top Row with image and title */}
                    <div className="col-span-1 md:col-span-6 flex gap-4 items-center">
                      <div className="relative w-20 h-24 sm:w-24 sm:h-32 bg-white/5 shrink-0">
                        {item.product?.images?.[0] ? (
                           <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                        ) : (
                           <div className="w-full h-full bg-white/10" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <Link href={`/product/${item.product?.slug || item.product_id}`} className="text-ivory hover:text-gold transition-colors font-cormorant text-xl md:text-2xl mb-1">
                          {item.product?.name || 'Luxury Item'}
                        </Link>
                        {item.variant?.name && (
                          <span className="text-grey text-xs uppercase tracking-wider">{item.variant.name}</span>
                        )}
                        <button 
                          onClick={() => removeItem(item.cart_item_id)}
                          className="text-grey hover:text-red-500 transition-colors mt-3 flex items-center gap-1 text-xs uppercase tracking-wider w-fit"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-1 md:col-span-2 flex justify-between md:block md:text-center mt-4 md:mt-0">
                      <span className="md:hidden text-grey text-xs uppercase tracking-widest">Price</span>
                      <span className="text-ivory">₹{((item.final_price || item.price || 0) / 100).toLocaleString()}</span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center mt-2 md:mt-0">
                      <span className="md:hidden text-grey text-xs uppercase tracking-widest">Quantity</span>
                      <div className="flex items-center border border-white/20">
                        <button onClick={() => updateQty(item.cart_item_id, Math.max(1, item.quantity - 1))} className="p-2 text-grey hover:text-gold hover:bg-white/5 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-ivory text-sm">{item.quantity}</span>
                        <button onClick={() => updateQty(item.cart_item_id, item.quantity + 1)} className="p-2 text-grey hover:text-gold hover:bg-white/5 transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-1 md:col-span-2 flex justify-between md:block md:text-right mt-2 md:mt-0 pt-4 md:pt-0 border-t border-white/5 md:border-none">
                      <span className="md:hidden text-grey text-xs uppercase tracking-widest">Subtotal</span>
                      <span className="text-gold font-medium">₹{(((item.final_price || item.price || 0) * item.quantity) / 100).toLocaleString()}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80 shrink-0">
              <div className="bg-[#0a0a0a] border border-gold/30 p-6 md:p-8 sticky top-32">
                <h2 className="font-cormorant text-2xl text-ivory mb-6 border-b border-white/10 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-ivory text-sm">
                    <span className="text-grey">Subtotal</span>
                    <span>₹{(total / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-ivory text-sm">
                    <span className="text-grey">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-ivory text-sm">
                    <span className="text-grey">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="pt-4 border-t border-gold/30 flex justify-between items-center">
                    <span className="font-montserrat uppercase tracking-widest text-gold text-xs">Total</span>
                    <span className="font-cormorant text-3xl text-gold">₹{(total / 100).toLocaleString()}</span>
                  </div>
                </div>

                <Button variant="primary" className="w-full" onClick={handleCheckout}>Proceed to Checkout</Button>
                <div className="mt-4 text-center">
                  <Link href="/shop" className="text-grey hover:text-gold text-xs font-montserrat uppercase tracking-widest transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
