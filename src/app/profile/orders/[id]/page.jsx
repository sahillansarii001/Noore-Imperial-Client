'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Loader } from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, Package, Clock, CheckCircle2, XCircle } from 'lucide-react';
import Image from 'next/image';

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/auth/login?redirect=/profile/orders/${id}`);
    }
  }, [isAuthenticated, authLoading, router, id]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrderDetails();
    }
  }, [isAuthenticated, id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      
      if (id.startsWith('DEMO')) {
        const demoOrders = JSON.parse(localStorage.getItem('demoOrders') || '[]');
        const foundDemo = demoOrders.find(o => o.id === id);
        if (foundDemo) {
          setOrder(foundDemo);
        } else {
          router.push('/profile/orders');
        }
        setLoading(false);
        return;
      }

      const res = await api.getOrder(id);
      if (res.success) {
        setOrder(res.data);
      } else {
        router.push('/profile/orders');
      }
    } catch (err) {
      console.error('Failed to fetch order details:', err);
      router.push('/profile/orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gold" />;
    }
  };

  if (authLoading || loading || !order) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><Loader /></div>;
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8 font-poppins">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.push('/profile/orders')}
          className="flex items-center gap-2 text-grey hover:text-white transition-colors text-xs uppercase tracking-widest mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </button>

        <div className="bg-black border border-white/10 p-6 md:p-10 mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 mb-10 pb-10 border-b border-white/10">
            <div>
              <h1 className="font-cormorant text-3xl md:text-4xl text-gold mb-2">Order Details</h1>
              <p className="text-grey text-sm uppercase tracking-widest">#{order.id}</p>
              <p className="text-grey text-sm mt-2">Placed on {new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 rounded-full">
              {getStatusIcon(order.status)}
              <span className="text-ivory text-sm capitalize font-medium">{order.status}</span>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl text-ivory tracking-widest uppercase mb-6 flex items-center gap-3">
              <Package className="text-gold w-5 h-5" /> Items Ordered
            </h2>
            <div className="space-y-6">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex gap-6 items-center">
                  <div className="flex-1">
                    <p className="text-ivory text-lg mb-1">{item.product_name}</p>
                    <p className="text-grey text-sm">Qty: {item.quantity}</p>
                    {(item.size || item.color) && (
                      <p className="text-grey text-sm mt-1">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ' | '}
                        {item.color && `Color: ${item.color}`}
                      </p>
                    )}
                  </div>
                  <p className="text-gold font-cormorant text-xl">{formatPrice(item.price)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col items-end">
            <div className="w-full md:w-64 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-grey uppercase tracking-widest text-xs">Subtotal</span>
                <span className="text-ivory">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-grey uppercase tracking-widest text-xs">Tax (18%)</span>
                <span className="text-ivory">{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-grey uppercase tracking-widest text-xs">Shipping</span>
                <span className="text-ivory">{order.shipping_fee === 0 ? 'Free' : formatPrice(order.shipping_fee)}</span>
              </div>
            </div>

            <div className="w-full md:w-64 flex justify-between items-end pt-6 border-t border-white/10">
              <span className="text-ivory uppercase tracking-widest font-medium">Total</span>
              <span className="text-3xl text-gold font-cormorant">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
