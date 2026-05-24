'use client';
import { formatPrice, formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function OrdersTable({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-[#0F0F0F] border border-white/5 py-16 px-6 text-center flex flex-col items-center justify-center select-none">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold/60 border border-white/5 mb-4">
          <ShoppingBag className="w-5 h-5 font-light" />
        </div>
        <h4 className="font-cormorant text-2xl text-gold mb-2 tracking-wide uppercase">No Orders Found</h4>
        <p className="font-poppins text-xs text-grey max-w-xs mb-6 leading-relaxed">
          You haven't placed any orders with us yet. Begin your luxury journey by exploring our latest collection.
        </p>
        <Link 
          href="/shop" 
          className="inline-flex bg-ivory text-black hover:bg-gold hover:text-black py-3 px-6 font-montserrat text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 border border-ivory hover:border-gold"
        >
          Explore Creations
        </Link>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered': return 'green';
      case 'pending': return 'gold';
      case 'cancelled': return 'red';
      default: return 'black';
    }
  };

  return (
    <div className="bg-[#0F0F0F] border border-white/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-poppins text-xs">
          <thead className="bg-[#070707] border-b border-white/5">
            <tr>
              <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Order ID</th>
              <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Date</th>
              <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Status</th>
              <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium text-right">Total</th>
              <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/[0.01] transition-all duration-300">
                <td className="px-6 py-4.5 font-mono text-ivory/80 tracking-wider">#{order.id.slice(0, 8).toUpperCase()}</td>
                <td className="px-6 py-4.5 text-grey font-light">{formatDate(order.created_at)}</td>
                <td className="px-6 py-4.5">
                  <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                </td>
                <td className="px-6 py-4.5 text-ivory font-medium text-right tracking-wide">{formatPrice(order.total_amount)}</td>
                <td className="px-6 py-4.5 text-center">
                  <Link href={`/dashboard/orders/${order.id}`} className="inline-flex text-gold hover:text-ivory transition-colors duration-300 text-[10px] tracking-[0.2em] uppercase font-montserrat underline underline-offset-4">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
