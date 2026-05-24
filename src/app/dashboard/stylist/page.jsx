'use client';
import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import DashboardStats from '@/components/dashboard/DashboardStats';
import AppointmentList from '@/components/dashboard/AppointmentList';
import { Calendar, Users, Star, User, Lock, Mail, Phone, CalendarRange } from 'lucide-react';
import Button from '@/components/ui/Button';

function StylistDashboardContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const activeTab = searchParams ? searchParams.get('tab') : null;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Settings form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.getConsultations();
        if (res.success) setAppointments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const stats = [
    { label: 'Today\'s Appointments', value: '3', icon: Calendar },
    { label: 'Total Clients', value: '142', icon: Users },
    { label: 'Average Rating', value: '4.9', icon: Star },
  ];

  if (loading) return <div className="text-ivory animate-pulse font-poppins text-sm tracking-wide">Loading workspace...</div>;

  // 1. Appointments View
  if (activeTab === 'appointments') {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="font-cormorant text-4xl text-ivory mb-2">My Appointments</h1>
          <p className="font-poppins text-grey text-xs">View all upcoming virtual style consultations and branch visits.</p>
        </div>
        <AppointmentList appointments={appointments} isStylist={true} />
      </div>
    );
  }

  // 2. Clients View
  if (activeTab === 'clients') {
    const mockClients = [
      { id: 1, name: 'Deepika Padukone', email: 'deepika@bollywood.in', phone: '+91 98765 43210', lastApt: '2026-05-10', totalApts: 5 },
      { id: 2, name: 'Karan Johar', email: 'karan@dharma.com', phone: '+91 99999 88888', lastApt: '2026-05-24', totalApts: 12 },
      { id: 3, name: 'Priyanka Chopra', email: 'priyanka@hollywood.com', phone: '+1 415 555 2672', lastApt: '2026-04-18', totalApts: 3 },
    ];

    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="font-cormorant text-4xl text-ivory mb-2">Client Portfolio</h1>
          <p className="font-poppins text-grey text-xs">Review client style preferences, fit sheets, and measurements history.</p>
        </div>

        <div className="bg-[#0F0F0F] border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-poppins text-xs">
              <thead className="bg-[#070707] border-b border-white/5">
                <tr>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Client Name</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Email</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Phone</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Last Session</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium text-center">Consultations</th>
                  <th className="px-6 py-4.5 font-montserrat text-[10px] text-gold uppercase tracking-[0.2em] font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockClients.map((client) => (
                  <tr key={client.id} className="hover:bg-white/[0.01] transition-all duration-300">
                    <td className="px-6 py-4.5 text-ivory/95 font-medium">{client.name}</td>
                    <td className="px-6 py-4.5 text-grey font-light">{client.email}</td>
                    <td className="px-6 py-4.5 text-grey/90 font-light">{client.phone}</td>
                    <td className="px-6 py-4.5 text-grey">{client.lastApt}</td>
                    <td className="px-6 py-4.5 text-center text-gold font-mono">{client.totalApts} sessions</td>
                    <td className="px-6 py-4.5 text-center">
                      <button className="text-gold hover:text-ivory transition-colors duration-300 text-[10px] tracking-[0.2em] uppercase font-montserrat underline underline-offset-4">
                        View Profile
                      </button>
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

  // 3. Settings View
  if (activeTab === 'settings') {
    return (
      <div className="space-y-8 animate-fade-in max-w-2xl">
        <div>
          <h1 className="font-cormorant text-4xl text-ivory mb-2">Stylist Profile</h1>
          <p className="font-poppins text-grey text-xs">Update your professional details and availability configurations.</p>
        </div>
        
        <div className="bg-[#0F0F0F] border border-white/5 p-8 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2 text-gold">
            <User className="w-4 h-4" />
            <h3 className="font-cormorant text-xl tracking-wider uppercase">Professional Info</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-[10px] uppercase tracking-wider text-grey">Stylist Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 p-3 text-xs font-poppins text-ivory focus:border-gold/50 focus:ring-0 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-montserrat text-[10px] uppercase tracking-wider text-grey">Work Email</label>
              <input 
                type="email" 
                value={email} 
                disabled
                className="w-full bg-black/10 border border-white/5 p-3 text-xs font-poppins text-grey/60 cursor-not-allowed"
              />
            </div>
          </div>
          
          <Button variant="primary" className="text-[10px] tracking-[0.2em] font-semibold w-full sm:w-auto self-start mt-2">
            Save Workspace
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

  // Default Stylist Dashboard View
  return (
    <div className="space-y-12 animate-fade-in">
      <div>
        <h1 className="font-cormorant text-4xl text-ivory mb-2">Stylist Workspace</h1>
        <p className="font-poppins text-grey text-xs">Welcome back, {user?.name}. Here is your schedule.</p>
      </div>

      <DashboardStats stats={stats} />

      <div>
        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
          <h3 className="font-cormorant text-2xl text-gold uppercase tracking-wider">Upcoming Sessions</h3>
          <a href="/dashboard/stylist?tab=appointments" className="text-[10px] font-montserrat text-grey uppercase tracking-widest hover:text-ivory transition-colors">View Calendar</a>
        </div>
        <AppointmentList appointments={appointments} isStylist={true} />
      </div>
    </div>
  );
}

export default function StylistDashboard() {
  return (
    <Suspense fallback={<div className="text-ivory animate-pulse font-poppins text-sm tracking-wide">Loading workspace...</div>}>
      <StylistDashboardContent />
    </Suspense>
  );
}
