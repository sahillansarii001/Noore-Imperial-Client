'use client';
import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import DashboardStats from '@/components/dashboard/DashboardStats';
import OrdersTable from '@/components/dashboard/OrdersTable';
import AppointmentList from '@/components/dashboard/AppointmentList';
import { ShoppingBag, Calendar, Heart, User, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';

function CustomerDashboardContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const activeTab = searchParams ? searchParams.get('tab') : null;

  const [orders, setOrders] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Settings form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, consRes] = await Promise.all([
          api.getOrders(),
          api.getConsultations()
        ]);
        if (ordersRes.success) setOrders(ordersRes.data);
        if (consRes.success) setConsultations(consRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag },
    { label: 'Upcoming Consultations', value: consultations.filter(c => c.status === 'confirmed').length, icon: Calendar },
    { label: 'Wishlist Items', value: '4', icon: Heart },
  ];

  if (loading) return <div className="text-ivory animate-pulse font-poppins text-sm tracking-wide">Loading portal...</div>;

  // 1. My Orders View
  if (activeTab === 'orders') {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="font-cormorant text-4xl text-ivory mb-2">My Orders</h1>
          <p className="font-poppins text-grey text-xs">Track and view history of your placed orders.</p>
        </div>
        <OrdersTable orders={orders} />
      </div>
    );
  }

  // 2. Consultations View
  if (activeTab === 'consultations') {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="font-cormorant text-4xl text-ivory mb-2">Consultations</h1>
          <p className="font-poppins text-grey text-xs">Manage your upcoming and past bookings with our stylists.</p>
        </div>
        <AppointmentList appointments={consultations} />
      </div>
    );
  }

  // 3. Settings View
  if (activeTab === 'settings') {
    return (
      <div className="space-y-8 animate-fade-in max-w-2xl">
        <div>
          <h1 className="font-cormorant text-4xl text-ivory mb-2">Profile Settings</h1>
          <p className="font-poppins text-grey text-xs">Update your personal information and security configurations.</p>
        </div>
        
        <div className="bg-[#0F0F0F] border border-white/5 p-8 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2 text-gold">
            <User className="w-4 h-4" />
            <h3 className="font-cormorant text-xl tracking-wider uppercase">Personal Details</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-[10px] uppercase tracking-wider text-grey">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 p-3 text-xs font-poppins text-ivory focus:border-gold/50 focus:ring-0 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-[10px] uppercase tracking-wider text-grey">Email Address</label>
              <input 
                type="email" 
                value={email} 
                disabled
                className="w-full bg-black/10 border border-white/5 p-3 text-xs font-poppins text-grey/60 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-[10px] uppercase tracking-wider text-grey">Phone Number</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/40 border border-white/10 p-3 text-xs font-poppins text-ivory focus:border-gold/50 focus:ring-0 transition-colors"
              />
            </div>
          </div>
          
          <Button variant="primary" className="text-[10px] tracking-[0.2em] font-semibold w-full sm:w-auto self-start mt-2">
            Save Details
          </Button>
        </div>

        <div className="bg-[#0F0F0F] border border-white/5 p-8 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2 text-gold">
            <Lock className="w-4 h-4" />
            <h3 className="font-cormorant text-xl tracking-wider uppercase">Security</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-[10px] uppercase tracking-wider text-grey">Current Password</label>
              <input 
                type="password" 
                className="w-full bg-black/40 border border-white/10 p-3 text-xs font-poppins text-ivory focus:border-gold/50 focus:ring-0 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-[10px] uppercase tracking-wider text-grey">New Password</label>
              <input 
                type="password" 
                className="w-full bg-black/40 border border-white/10 p-3 text-xs font-poppins text-ivory focus:border-gold/50 focus:ring-0 transition-colors"
              />
            </div>
          </div>
          
          <Button variant="secondary" className="text-[10px] tracking-[0.2em] font-semibold w-full sm:w-auto self-start mt-2">
            Change Password
          </Button>
        </div>
      </div>
    );
  }

  // Default Dashboard Overview View
  return (
    <div className="space-y-12 animate-fade-in">
      <div>
        <h1 className="font-cormorant text-4xl text-ivory mb-2">Welcome, {user?.name}</h1>
        <p className="font-poppins text-grey text-xs">Manage your orders, consultations, and profile from here.</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <div>
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
            <h3 className="font-cormorant text-2xl text-gold uppercase tracking-wider">Recent Orders</h3>
            <a href="/dashboard/customer?tab=orders" className="text-[10px] font-montserrat text-grey uppercase tracking-widest hover:text-ivory transition-colors">View All</a>
          </div>
          <OrdersTable orders={orders.slice(0, 3)} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
            <h3 className="font-cormorant text-2xl text-gold uppercase tracking-wider">Upcoming Bookings</h3>
            <a href="/dashboard/customer?tab=consultations" className="text-[10px] font-montserrat text-grey uppercase tracking-widest hover:text-ivory transition-colors">View All</a>
          </div>
          <AppointmentList appointments={consultations.slice(0, 2)} />
        </div>
      </div>
    </div>
  );
}

export default function CustomerDashboard() {
  return (
    <Suspense fallback={<div className="text-ivory animate-pulse font-poppins text-sm tracking-wide">Loading dashboard view...</div>}>
      <CustomerDashboardContent />
    </Suspense>
  );
}
