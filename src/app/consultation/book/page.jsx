import BookingForm from '@/components/consultation/BookingForm';
import CategoryBanner from '@/components/shop/CategoryBanner';
import { CalendarHeart, Star, Clock } from 'lucide-react';

export default function BookConsultationPage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-24">
      <CategoryBanner title="Book a Consultation" breadcrumb={false} image="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop" />
      
      <div className="container-xl mt-20 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto mb-20 border-y border-white/5 py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center border border-gold/20">
              <CalendarHeart className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-cormorant text-2xl text-ivory">Private Sessions</h3>
            <p className="font-poppins text-xs text-grey/60 max-w-xs">Dedicated one-on-one time with our master stylists in our luxury suite.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center border border-gold/20">
              <Star className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-cormorant text-2xl text-ivory">Expert Guidance</h3>
            <p className="font-poppins text-xs text-grey/60 max-w-xs">Personalized advice tailored to your body type, occasion, and preferences.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center border border-gold/20">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-cormorant text-2xl text-ivory">Virtual or In-Person</h3>
            <p className="font-poppins text-xs text-grey/60 max-w-xs">Meet us at our Delhi studio or consult virtually from anywhere in the world.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-cormorant text-4xl text-ivory mb-4">Schedule Your Appointment</h2>
            <p className="font-poppins text-sm text-grey/50">Please fill out the form below and our concierge team will confirm your session.</p>
          </div>
          <div className="card-luxury p-8 rounded-sm">
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  );
}
