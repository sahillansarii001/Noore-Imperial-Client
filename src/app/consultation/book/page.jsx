import BookingForm from '@/components/consultation/BookingForm';
import CategoryBanner from '@/components/shop/CategoryBanner';

export default function BookConsultationPage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-24">
      <CategoryBanner title="Book a Consultation" breadcrumb={false} />
      
      <div className="container mx-auto px-4 mt-16">
        <BookingForm />
      </div>
    </div>
  );
}
