'use client';
import CategoryBanner from '@/components/shop/CategoryBanner';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Award, Building2 } from 'lucide-react';

export default function FranchisePage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-24">
      <CategoryBanner title="Franchise Opportunities" breadcrumb={false} image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop" />
      
      {/* Overview Section */}
      <div className="container-xl mt-20 mb-16 text-center max-w-4xl">
        <h2 className="font-cormorant text-5xl text-ivory mb-6">Partner With The Empire</h2>
        <p className="font-poppins text-grey/70 text-sm leading-relaxed mb-12 font-light">
          Noore Imperial is expanding its legacy globally. We invite visionaries, luxury retail experts, and passionate entrepreneurs to join our exclusive network of franchise partners. 
          Experience unparalleled brand support, comprehensive training, and the prestige of representing a world-class luxury fashion house.
        </p>
      </div>

      {/* Models Section */}
      <div className="bg-[#050505] py-20 border-y border-white/5 mb-20">
        <div className="container-xl">
          <div className="text-center mb-16">
            <span className="font-montserrat text-[9px] tracking-[0.4em] text-gold uppercase mb-3 block">Investment</span>
            <h3 className="font-cormorant text-4xl text-ivory">Franchise Models</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Model 1 */}
            <div className="card-luxury p-8 rounded-sm text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-gold/5 flex items-center justify-center border border-gold/20 mb-6">
                <TrendingUp className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-cormorant text-2xl text-ivory mb-2">Boutique Partner</h4>
              <p className="font-montserrat text-[9px] tracking-widest text-gold uppercase mb-4">₹50L - ₹1Cr Investment</p>
              <p className="font-poppins text-xs text-grey/60 leading-relaxed">Curate our pret collections in your luxury retail space with full brand support and marketing collateral.</p>
            </div>
            
            {/* Model 2 */}
            <div className="card-luxury p-8 rounded-sm text-center border-gold/30 shadow-[0_0_30px_rgba(201,168,76,0.05)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 flex items-center justify-center border border-gold/30 mb-6">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-cormorant text-2xl text-ivory mb-2">Bridal Studio</h4>
              <p className="font-montserrat text-[9px] tracking-widest text-gold uppercase mb-4">₹1Cr - ₹3Cr Investment</p>
              <p className="font-poppins text-xs text-grey/60 leading-relaxed">Establish a dedicated Noore Imperial bridal experience center with bespoke consultation services.</p>
            </div>
            
            {/* Model 3 */}
            <div className="card-luxury p-8 rounded-sm text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-gold/5 flex items-center justify-center border border-gold/20 mb-6">
                <Award className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-cormorant text-2xl text-ivory mb-2">Academy Partner</h4>
              <p className="font-montserrat text-[9px] tracking-widest text-gold uppercase mb-4">₹3Cr+ Investment</p>
              <p className="font-poppins text-xs text-grey/60 leading-relaxed">Establish a certified fashion academy utilizing our curriculum, brand name, and placement network.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container-xl max-w-3xl">
        <div className="text-center mb-10">
          <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-6">
            <Building2 className="w-5 h-5 text-ivory" />
          </div>
          <h2 className="font-cormorant text-4xl text-ivory mb-4">Submit Your Application</h2>
          <p className="font-poppins text-sm text-grey/50">Please provide your details below, and our expansion director will be in touch.</p>
        </div>

        <form className="card-luxury p-8 md:p-12 text-left space-y-8" onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <input type="text" id="fname" className="w-full bg-transparent border-b border-white/15 py-3 px-0 text-ivory text-sm font-poppins focus:border-gold outline-none transition-colors peer placeholder-transparent" required placeholder="First Name" />
              <label htmlFor="fname" className="absolute left-0 top-3 font-montserrat text-[9px] text-grey/50 tracking-[0.25em] uppercase transition-all pointer-events-none peer-focus:-top-3 peer-focus:text-[8px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-gold/70">First Name</label>
            </div>
            <div className="relative group">
              <input type="text" id="lname" className="w-full bg-transparent border-b border-white/15 py-3 px-0 text-ivory text-sm font-poppins focus:border-gold outline-none transition-colors peer placeholder-transparent" required placeholder="Last Name" />
              <label htmlFor="lname" className="absolute left-0 top-3 font-montserrat text-[9px] text-grey/50 tracking-[0.25em] uppercase transition-all pointer-events-none peer-focus:-top-3 peer-focus:text-[8px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-gold/70">Last Name</label>
            </div>
          </div>
          
          <div className="relative group">
            <input type="email" id="email" className="w-full bg-transparent border-b border-white/15 py-3 px-0 text-ivory text-sm font-poppins focus:border-gold outline-none transition-colors peer placeholder-transparent" required placeholder="Email" />
            <label htmlFor="email" className="absolute left-0 top-3 font-montserrat text-[9px] text-grey/50 tracking-[0.25em] uppercase transition-all pointer-events-none peer-focus:-top-3 peer-focus:text-[8px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-gold/70">Email Address</label>
          </div>

          <div className="relative group">
            <input type="tel" id="phone" className="w-full bg-transparent border-b border-white/15 py-3 px-0 text-ivory text-sm font-poppins focus:border-gold outline-none transition-colors peer placeholder-transparent" required placeholder="Phone" />
            <label htmlFor="phone" className="absolute left-0 top-3 font-montserrat text-[9px] text-grey/50 tracking-[0.25em] uppercase transition-all pointer-events-none peer-focus:-top-3 peer-focus:text-[8px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-gold/70">Phone Number</label>
          </div>

          <div className="relative group">
            <input type="text" id="company" className="w-full bg-transparent border-b border-white/15 py-3 px-0 text-ivory text-sm font-poppins focus:border-gold outline-none transition-colors peer placeholder-transparent" placeholder="Company" />
            <label htmlFor="company" className="absolute left-0 top-3 font-montserrat text-[9px] text-grey/50 tracking-[0.25em] uppercase transition-all pointer-events-none peer-focus:-top-3 peer-focus:text-[8px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-gold/70">Company / Organization</label>
          </div>

          <div className="relative group">
            <input type="text" id="location" className="w-full bg-transparent border-b border-white/15 py-3 px-0 text-ivory text-sm font-poppins focus:border-gold outline-none transition-colors peer placeholder-transparent" required placeholder="Location" />
            <label htmlFor="location" className="absolute left-0 top-3 font-montserrat text-[9px] text-grey/50 tracking-[0.25em] uppercase transition-all pointer-events-none peer-focus:-top-3 peer-focus:text-[8px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-gold/70">Proposed Location (City/Country)</label>
          </div>

          <div className="pt-2">
            <label className="block font-montserrat text-[9px] tracking-[0.25em] text-grey/50 uppercase mb-4">Investment Range</label>
            <select className="w-full bg-[#0F0F0F] border border-white/10 p-4 text-sm font-poppins text-ivory focus:border-gold outline-none appearance-none" required>
              <option value="">Select an option</option>
              <option value="tier1">₹50L - ₹1Cr (Boutique Partner)</option>
              <option value="tier2">₹1Cr - ₹3Cr (Bridal Studio)</option>
              <option value="tier3">₹3Cr+ (Academy Partner / Master Franchise)</option>
            </select>
          </div>

          <div className="pt-2">
            <label className="block font-montserrat text-[9px] tracking-[0.25em] text-grey/50 uppercase mb-4">Message / Background</label>
            <textarea className="w-full bg-[#0F0F0F] border border-white/10 p-4 text-sm font-poppins text-ivory focus:border-gold outline-none h-32" required placeholder="Tell us about your background and vision..."></textarea>
          </div>

          <Button variant="gold" type="submit" size="lg" className="w-full mt-4">
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
}
