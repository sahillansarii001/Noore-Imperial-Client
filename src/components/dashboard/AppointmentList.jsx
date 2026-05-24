'use client';
import { formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import { Video, MapPin, User, Calendar, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AppointmentList({ appointments, isStylist = false }) {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="bg-[#0F0F0F] border border-white/5 py-16 px-6 text-center flex flex-col items-center justify-center select-none">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold/60 border border-white/5 mb-4">
          <Calendar className="w-5 h-5 font-light" />
        </div>
        <h4 className="font-cormorant text-2xl text-gold mb-2 tracking-wide uppercase">No Appointments</h4>
        <p className="font-poppins text-xs text-grey max-w-xs mb-6 leading-relaxed">
          You have no upcoming consultations scheduled. Connect with our styling experts to craft your custom look.
        </p>
        {!isStylist && (
          <Link 
            href="/consultation/book" 
            className="inline-flex items-center gap-2 bg-ivory text-black hover:bg-gold hover:text-black py-3 px-6 font-montserrat text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 border border-ivory hover:border-gold"
          >
            <Plus className="w-3.5 h-3.5" /> Book Consultation
          </Link>
        )}
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'green';
      case 'confirmed': return 'gold';
      case 'cancelled': return 'red';
      default: return 'black';
    }
  };

  return (
    <div className="space-y-4">
      {appointments.map((apt) => {
        const date = new Date(apt.scheduled_at);
        const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        return (
          <div key={apt.id} className="bg-[#0F0F0F] border border-white/5 p-6 hover:border-gold/20 transition-all duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/5">
              <div>
                <span className="font-montserrat text-[9px] text-gold uppercase tracking-[0.3em] mb-1 block">
                  {apt.type}
                </span>
                <h4 className="font-cormorant text-xl text-ivory/95 tracking-wide">
                  {isStylist ? apt.user?.name : apt.expert?.user?.name || "Master Stylist"}
                </h4>
              </div>
              <Badge variant={getStatusColor(apt.status)} className="self-start md:self-auto">{apt.status}</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-grey/60" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="font-poppins text-xs text-ivory/95 font-medium">{formatDate(apt.scheduled_at)}</span>
                  <span className="font-poppins text-[10px] text-grey">{timeString}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-grey/60" strokeWidth={1.5} />
                <span className="font-poppins text-xs text-grey">
                  {isStylist ? 'Client' : 'Stylist'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {apt.branch_id ? <MapPin className="w-4 h-4 text-grey/60" strokeWidth={1.5} /> : <Video className="w-4 h-4 text-grey/60" strokeWidth={1.5} />}
                <span className="font-poppins text-xs text-grey truncate">
                  {apt.branch?.name || 'Virtual Meeting'}
                </span>
              </div>
              
              <div className="flex items-center lg:justify-end">
                {(apt.status === 'confirmed' || apt.status === 'pending') && (
                  <button className="w-full lg:w-auto font-montserrat text-[9px] text-gold uppercase tracking-[0.25em] font-semibold border border-gold/30 px-5 py-2.5 hover:bg-gold hover:text-black hover:border-gold transition-all duration-300">
                    {apt.branch_id ? 'View Details' : 'Join Call'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
