'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function Newsletter() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="gold-line absolute top-0 left-0 right-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/3 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container-xl relative z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold/50" />
            <span className="font-montserrat text-[9px] tracking-[0.4em] text-gold uppercase">The Inner Circle</span>
            <div className="w-8 h-px bg-gold/50" />
          </div>
          <h2 className="font-cormorant text-5xl md:text-6xl text-ivory mb-6 leading-[0.9]">Join The<br /><em className="font-playfair text-gradient-gold">Imperial Access</em></h2>
          <p className="font-poppins text-grey/60 font-light mb-12 text-sm leading-[1.8]">
            Subscribe to receive exclusive access to new collections, private sales, and insider events from Noore Imperial.
          </p>

          <form className="flex flex-col sm:flex-row gap-6 mb-6 items-end" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1 group w-full">
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                className="w-full bg-transparent border-b border-white/15 py-4 px-0 text-ivory text-[13px] font-poppins focus:border-gold outline-none transition-colors duration-300 peer placeholder-transparent"
                id="newsletter-email"
              />
              <label 
                htmlFor="newsletter-email"
                className="absolute left-0 top-4 font-montserrat text-[9px] text-grey/50 tracking-[0.25em] uppercase transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-[8px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-gold/70"
              >
                Email Address
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gold group-focus-within:w-full transition-all duration-500" />
            </div>
            <button 
              type="submit" 
              className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-gold text-black font-montserrat text-[10px] tracking-[0.28em] uppercase font-semibold hover:bg-gold-dark transition-all duration-400 overflow-hidden w-full sm:w-auto"
            >
              <span className="absolute inset-0 bg-gold-light transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <span className="relative z-10">Subscribe</span>
            </button>
          </form>

          <p className="font-montserrat text-[8px] text-grey/30 uppercase tracking-[0.2em] mt-8">
            By subscribing, you agree to our Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
