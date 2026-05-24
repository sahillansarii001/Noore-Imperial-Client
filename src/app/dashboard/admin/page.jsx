'use client';
import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RevenueChart from '@/components/dashboard/RevenueChart';
import OrdersTable from '@/components/dashboard/OrdersTable';
import { TrendingUp, ShoppingBag, Users, Activity, Eye, Edit, Trash2, Plus, User, Lock } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

function AdminDashboardContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const activeTab = searchParams ? searchParams.get('tab') : null;

  const [revenueData, setRevenueData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Settings form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revRes, ordRes] = await Promise.all([
          api.getRevenue('30d'),
          api.getOrders()
        ]);
        
        if (revRes.success) {
          setRevenueData(revRes.data);
          const total = revRes.data.reduce((sum, item) => sum + item.revenue, 0);
          setTotalRevenue(total);
        }
        
        if (ordRes.success) {
          setRecentOrders(ordRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Total Revenue (30d)', value: formatPrice(totalRevenue), icon: TrendingUp, change: '+12.5%', positive: true },
    { label: 'Total Orders', value: String(recentOrders.length || 450), icon: ShoppingBag, change: '+5.2%', positive: true },
    { label: 'Active Users', value: '2,401', icon: Users, change: '-1.4%', positive: false },
    { label: 'Conversion Rate', value: '3.8%', icon: Activity, change: '+0.4%', positive: true },
  ];

  if (loading) return <div className="text-ivory animate-pulse font-poppins text-sm tracking-wide">Loading Command Center...</div>;

  // 1. Analytics View
  if (activeTab === 'analytics') {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="font-cormorant text-4xl text-ivory mb-2">Revenue Analytics</h1>
          <p className="font-poppins text-grey text-xs">Visualize performance metrics, payouts, and revenue streams.</p>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <RevenueChart data={revenueData} />
        </div>
      </div>
    );
  }

  // 2. Orders View
  if (activeTab === 'orders') {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="font-cormorant text-4xl text-ivory mb-2">Order Management</h1>
          <p className="font-poppins text-grey text-xs">Manage client custom tailoring and Pret-a-Porter orders.</p>
        </div>
        <OrdersTable orders={recentOrders} />
      </div>
    );
  }

  // 3. Products View
  if (activeTab === 'products') {
    const mockProducts = [
      { id: '1', name: 'Midnight Velvet Gown', category: 'Bridal', price: 125000, stock: 12, status: 'In Stock' },
      { id: '2', name: 'Embroidered Cape Set', category: 'Indo Western', price: 85900, stock: 4, status: 'Low Stock' },
      { id: '3', name: 'Metallic Draped Saree', category: 'Indo Western', price: 62000, stock: 18, status: 'In Stock' },
      { id: '4', name: 'Classic Silk Sherwani', category: 'Bridal', price: 145000, stock: 0, status: 'Out of Stock' },
    ];

    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="font-cormorant text-4xl text-ivory mb-2">Product Catalog</h1>
            <p className="font-poppins text-grey text-xs">Manage and update premium catalog items.</p>
          </div>
          <Button variant="primary" className="text-[10px] tracking-[0.2em] font-semibold flex items-center gap-2 self-start sm:self-auto py-3">
            <Plus className="w-3.5 h-3.5" /> Add New Product
          </Button>
        </div>

        <div className="bg-[#0F0F0F] border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-poppins text-xs">
              <thead className="bg-[#070707] border-b border-white/5">
                <tr>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Product</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Category</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Price</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Stock</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Status</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-white/[0.01] transition-all duration-300">
                    <td className="px-6 py-4.5 text-ivory/95 font-medium">{prod.name}</td>
                    <td className="px-6 py-4.5 text-grey font-light">{prod.category}</td>
                    <td className="px-6 py-4.5 text-gold">{formatPrice(prod.price)}</td>
                    <td className="px-6 py-4.5 text-grey/95 font-mono">{prod.stock} units</td>
                    <td className="px-6 py-4.5">
                      <span className={`text-[10px] font-montserrat uppercase tracking-wider ${
                        prod.stock === 0 ? 'text-red-400' : prod.stock < 5 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {prod.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="flex items-center justify-center gap-3">
                        <button className="text-grey hover:text-gold transition-colors duration-300 p-1"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="text-grey hover:text-gold transition-colors duration-300 p-1"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="text-grey hover:text-red-400 transition-colors duration-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 4. Users View
  if (activeTab === 'users') {
    const mockUsers = [
      { id: '1', name: 'Alia Bhatt', email: 'alia@vogue.in', role: 'Customer', registered: '2026-04-12', status: 'Active' },
      { id: '2', name: 'Manish Malhotra', email: 'manish@couture.com', role: 'Stylist', registered: '2026-01-20', status: 'Active' },
      { id: '3', name: 'Noore Jahan', email: 'noore@imperial.com', role: 'CEO', registered: '2025-12-01', status: 'Active' },
      { id: '4', name: 'Siddharth Roy', email: 'siddharth@gmail.com', role: 'Customer', registered: '2026-05-15', status: 'Suspended' },
    ];

    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="font-cormorant text-4xl text-ivory mb-2">User Directory</h1>
          <p className="font-poppins text-grey text-xs">Manage active accounts, security roles, and permissions.</p>
        </div>

        <div className="bg-[#0F0F0F] border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-poppins text-xs">
              <thead className="bg-[#070707] border-b border-white/5">
                <tr>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Name</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Email</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Role</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Registered</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Status</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.01] transition-all duration-300">
                    <td className="px-6 py-4.5 text-ivory/95 font-medium">{u.name}</td>
                    <td className="px-6 py-4.5 text-grey font-light">{u.email}</td>
                    <td className="px-6 py-4.5">
                      <span className={`text-[10px] font-montserrat uppercase tracking-wider px-2 py-0.5 border ${
                        u.role === 'CEO' || u.role === 'Admin' ? 'border-red-500/20 text-red-400 bg-red-950/10' : u.role === 'Stylist' ? 'border-gold/20 text-gold bg-gold/10' : 'border-white/10 text-grey bg-white/5'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-grey font-light">{u.registered}</td>
                    <td className="px-6 py-4.5">
                      <span className={`text-[10px] font-montserrat uppercase tracking-wider ${
                        u.status === 'Active' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="flex items-center justify-center gap-3">
                        <button className="text-grey hover:text-gold transition-colors duration-300 p-1"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="text-grey hover:text-red-400 transition-colors duration-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 5. Settings View
  if (activeTab === 'settings') {
    return (
      <div className="space-y-8 animate-fade-in max-w-2xl">
        <div>
          <h1 className="font-cormorant text-4xl text-ivory mb-2">Command Settings</h1>
          <p className="font-poppins text-grey text-xs">Update your administrative credentials and email setups.</p>
        </div>
        
        <div className="bg-[#0F0F0F] border border-white/5 p-8 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2 text-gold">
            <User className="w-4 h-4" />
            <h3 className="font-cormorant text-xl tracking-wider uppercase">Account Details</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-[10px] uppercase tracking-wider text-grey">Administrative Name</label>
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
        <h1 className="font-cormorant text-4xl text-ivory mb-2">Imperial Command Center</h1>
        <p className="font-poppins text-grey text-xs">Logged in as {user?.role.toUpperCase()} - {user?.name}</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        
        <div className="xl:col-span-1 bg-[#0F0F0F] border border-white/5 p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-cormorant text-2xl text-gold mb-6 border-b border-white/5 pb-4 uppercase tracking-wider">Top Products</h3>
            <div className="space-y-4">
              {[
                { name: 'Midnight Velvet Gown', sales: 45, revenue: 5845500 },
                { name: 'Embroidered Cape Set', sales: 32, revenue: 2748800 },
                { name: 'Bridal Lehenga (Custom)', sales: 12, revenue: 4200000 },
              ].map((prod, i) => (
                <div key={i} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-b-0 last:pb-0">
                  <div>
                    <h4 className="font-poppins text-xs text-ivory/90 leading-tight">{prod.name}</h4>
                    <p className="font-montserrat text-[9px] text-grey uppercase tracking-wider mt-1">{prod.sales} Sales</p>
                  </div>
                  <span className="font-poppins text-xs text-gold font-medium">{formatPrice(prod.revenue)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
          <h3 className="font-cormorant text-2xl text-gold uppercase tracking-wider">Recent Transactions</h3>
          <a href="/dashboard/admin?tab=orders" className="text-[10px] font-montserrat text-grey uppercase tracking-widest hover:text-ivory transition-colors">View All</a>
        </div>
        <OrdersTable orders={recentOrders.slice(0, 3)} />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="text-ivory animate-pulse font-poppins text-sm tracking-wide">Loading Command Center view...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
