'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8 font-poppins flex items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-gold" />
          </div>
        </div>

        <h1 className="font-cormorant text-5xl md:text-6xl text-ivory mb-6 tracking-wide">
          Thank You
        </h1>
        
        <p className="text-grey text-lg mb-2">
          Your order has been placed successfully.
        </p>
        
        {orderId && (
          <p className="text-white/50 text-sm mb-12 uppercase tracking-widest">
            Order Reference: <span className="text-gold font-medium">{orderId.split('-')[0]}</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button 
            variant="secondary" 
            className="uppercase tracking-[0.2em] text-xs h-12 min-w-[200px]"
            onClick={() => router.push('/profile/orders')}
          >
            View Order
          </Button>
          <Button 
            variant="primary" 
            className="uppercase tracking-[0.2em] text-xs h-12 min-w-[200px] flex items-center justify-center gap-2"
            onClick={() => router.push('/shop')}
          >
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Button>
        </div>

      </div>
    </div>
  );
}
