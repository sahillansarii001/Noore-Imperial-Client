'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Loader } from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Package, ChevronRight, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function OrdersPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/profile/orders');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.getOrders();
      
      let realOrders = [];
      if (res.success) {
        realOrders = res.data;
      }
      
      // Merge with demo orders from localStorage
      const demoOrders = JSON.parse(localStorage.getItem('demoOrders') || '[]');
      
      // Sort combined orders by date (newest first)
      const allOrders = [...realOrders, ...demoOrders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      setOrders(allOrders);
      
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      // Even if API fails, show demo orders
      const demoOrders = JSON.parse(localStorage.getItem('demoOrders') || '[]');
      setOrders(demoOrders);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gold" />;
    }
  };

  if (authLoading || loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><Loader /></div>;
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8 font-poppins">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-cormorant text-4xl md:text-5xl text-gold mb-12 uppercase tracking-widest">Order History</h1>
        
        {orders.length === 0 ? (
          <div className="bg-black border border-white/10 p-12 text-center">
            <Package className="w-16 h-16 text-white/20 mx-auto mb-6" />
            <h2 className="text-2xl text-ivory font-cormorant mb-4">No Orders Found</h2>
            <p className="text-grey mb-8 max-w-md mx-auto">You haven't placed any orders with Noore Imperial yet. Discover our exclusive collections.</p>
            <Button variant="primary" onClick={() => router.push('/shop')} className="uppercase tracking-[0.2em] text-xs h-12 px-8">
              Explore Collections
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-black border border-white/10 p-6 md:p-8 hover:border-white/20 transition-colors">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-6 pb-6 border-b border-white/10">
                  <div>
                    <p className="text-grey text-xs uppercase tracking-widest mb-1">Order #{order.id.substring(0, 8).toUpperCase()}</p>
                    <p className="text-ivory text-sm">Placed on {new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="text-ivory text-sm capitalize">{order.status}</span>
                    </div>
                    <div className="h-8 w-px bg-white/10 mx-2 hidden md:block"></div>
                    <div>
                      <p className="text-grey text-xs uppercase tracking-widest mb-1">Total Amount</p>
                      <p className="text-gold font-cormorant text-xl">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-grey text-sm">Payment Method: <span className="text-ivory uppercase text-xs tracking-widest ml-1">{order.payment_method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span></p>
                  
                  <button 
                    onClick={() => router.push(`/profile/orders/${order.id}`)}
                    className="flex items-center gap-2 text-gold hover:text-white transition-colors text-xs uppercase tracking-widest"
                  >
                    View Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
