'use client';
import { ShoppingCart, Users, Calendar, TrendingUp, Package, BarChart3 } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RevenueChart from '@/components/dashboard/RevenueChart';
import OrdersTable from '@/components/dashboard/OrdersTable';

const sidebarLinks = [
  { href: '/dashboard/branch-manager', icon: BarChart3, label: 'Overview' },
  { href: '/dashboard/branch-manager/orders', icon: ShoppingCart, label: 'Orders', badge: '8' },
  { href: '/dashboard/branch-manager/inventory', icon: Package, label: 'Inventory' },
  { href: '/dashboard/branch-manager/staff', icon: Users, label: 'Staff' },
  { href: '/dashboard/branch-manager/appointments', icon: Calendar, label: 'Appointments' },
];

const STATS = [
  { label: 'Branch Revenue', value: 850000, prefix: '₹', change: 22, icon: TrendingUp },
  { label: 'Orders This Month', value: 124, change: 18, icon: ShoppingCart },
  { label: 'Pending Orders', value: 8, change: -2, icon: Package },
  { label: 'Consultations', value: 32, change: 12, icon: Calendar },
];

const ORDERS = [
  { id: 'NI-2025-089', customer: 'Priya Sharma', items: 2, total: 37000, status: 'pending', date: '2025-05-24' },
  { id: 'NI-2025-088', customer: 'Arjun Mehta', items: 1, total: 85000, status: 'confirmed', date: '2025-05-24' },
  { id: 'NI-2025-087', customer: 'Kavya Reddy', items: 3, total: 28500, status: 'shipped', date: '2025-05-23' },
];

export default function BranchManagerDashboard() {
  return (
    <div className="flex min-h-screen bg-[#FAF6F0]">
      <Sidebar links={sidebarLinks} subtitle="Branch Manager" />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <p className="font-montserrat text-[0.6rem] tracking-[0.3em] uppercase text-[#8A8A8A]">Branch Manager</p>
          <h1 className="font-cormorant text-4xl font-light text-[#0A0A0A]">Delhi Branch</h1>
        </div>
        <div className="space-y-6">
          <DashboardStats stats={STATS} />
          <RevenueChart />
          <div className="dashboard-card">
            <h3 className="font-cormorant text-xl font-medium text-[#0A0A0A] mb-4">Recent Orders</h3>
            <OrdersTable orders={ORDERS} showCustomer />
          </div>
        </div>
      </main>
    </div>
  );
}
