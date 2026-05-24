'use client';
import CategoryBanner from '@/components/shop/CategoryBanner';
import Button from '@/components/ui/Button';

export default function FranchisePage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-24">
      <CategoryBanner title="Franchise Opportunities" breadcrumb={false} />
      
      <div className="container mx-auto px-4 max-w-3xl mt-16 text-center">
        <h2 className="font-cormorant text-4xl text-gold mb-6">Partner With The Empire</h2>
        <p className="font-poppins text-grey mb-12">
          Thank you for your interest in joining the Noore Imperial family. Please fill out the form below 
          with your business details, and our expansion team will contact you to discuss potential franchise models.
        </p>

        <form className="bg-[#111] p-8 md:p-12 border border-white/10 text-left space-y-6" onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-montserrat text-xs text-ivory tracking-widest uppercase mb-2">First Name</label>
              <input type="text" className="w-full bg-black border border-white/20 p-3 text-ivory focus:border-gold outline-none" required />
            </div>
            <div>
              <label className="block font-montserrat text-xs text-ivory tracking-widest uppercase mb-2">Last Name</label>
              <input type="text" className="w-full bg-black border border-white/20 p-3 text-ivory focus:border-gold outline-none" required />
            </div>
          </div>
          
          <div>
            <label className="block font-montserrat text-xs text-ivory tracking-widest uppercase mb-2">Email Address</label>
            <input type="email" className="w-full bg-black border border-white/20 p-3 text-ivory focus:border-gold outline-none" required />
          </div>

          <div>
            <label className="block font-montserrat text-xs text-ivory tracking-widest uppercase mb-2">Phone Number</label>
            <input type="tel" className="w-full bg-black border border-white/20 p-3 text-ivory focus:border-gold outline-none" required />
          </div>

          <div>
            <label className="block font-montserrat text-xs text-ivory tracking-widest uppercase mb-2">Company / Organization</label>
            <input type="text" className="w-full bg-black border border-white/20 p-3 text-ivory focus:border-gold outline-none" />
          </div>

          <div>
            <label className="block font-montserrat text-xs text-ivory tracking-widest uppercase mb-2">Proposed Location (City/Country)</label>
            <input type="text" className="w-full bg-black border border-white/20 p-3 text-ivory focus:border-gold outline-none" required />
          </div>

          <div>
            <label className="block font-montserrat text-xs text-ivory tracking-widest uppercase mb-2">Investment Range</label>
            <select className="w-full bg-black border border-white/20 p-3 text-ivory focus:border-gold outline-none" required>
              <option value="">Select an option</option>
              <option value="tier1">₹50L - ₹1Cr (Boutique Partner)</option>
              <option value="tier2">₹1Cr - ₹3Cr (Bridal Studio)</option>
              <option value="tier3">₹3Cr+ (Academy Partner / Master Franchise)</option>
            </select>
          </div>

          <div>
            <label className="block font-montserrat text-xs text-ivory tracking-widest uppercase mb-2">Message / Background</label>
            <textarea className="w-full bg-black border border-white/20 p-3 text-ivory focus:border-gold outline-none h-32" required></textarea>
          </div>

          <Button variant="primary" type="submit" className="w-full mt-4">
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
}
