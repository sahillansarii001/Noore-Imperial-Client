import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#050505] pt-32 pb-10 mt-auto relative overflow-hidden border-t border-white/10">
      {/* Decorative background typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0 w-full overflow-hidden flex justify-center">
        <span className="font-cormorant text-[30vw] text-ivory leading-none whitespace-nowrap tracking-widest">NOORE</span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-8 group relative">
                <img src="/logo.png" alt="Noore Imperial" className="h-28 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(201,168,76,0.3)] transition-transform duration-500 group-hover:scale-105" />
                <div className="flex items-center gap-4 mt-6">
                  <span className="w-12 h-[1px] bg-gold"></span>
                  <span className="font-montserrat text-[9px] tracking-[0.4em] text-gold uppercase">Est. 2024</span>
                </div>
              </Link>
              <p className="text-grey/80 font-playfair text-sm leading-loose max-w-sm font-light mb-10">
                Elevating elegance to an imperial standard. Exclusive luxury fashion, bespoke bridal wear, and a world-class fashion academy.
              </p>
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-montserrat text-[10px] text-ivory hover:bg-gold hover:border-gold hover:text-black transition-all duration-300">
                IN
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-montserrat text-[10px] text-ivory hover:bg-gold hover:border-gold hover:text-black transition-all duration-300">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-montserrat text-[10px] text-ivory hover:bg-gold hover:border-gold hover:text-black transition-all duration-300">
                TW
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-montserrat text-[10px] text-ivory hover:bg-gold hover:border-gold hover:text-black transition-all duration-300">
                YT
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-montserrat text-[10px] text-gold tracking-[0.3em] uppercase mb-10">The Maison</h4>
            <ul className="space-y-6 font-poppins text-[13px] text-ivory/70 font-light tracking-wide">
              <li><Link href="/shop" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Collections</Link></li>
              <li><Link href="/bridal-studio" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Bridal Studio</Link></li>
              <li><Link href="/academy" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Academy</Link></li>
              <li><Link href="/franchise" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Franchise</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-montserrat text-[10px] text-gold tracking-[0.3em] uppercase mb-10">Client Services</h4>
            <ul className="space-y-6 font-poppins text-[13px] text-ivory/70 font-light tracking-wide">
              <li><Link href="/consultation/book" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Book Appointment</Link></li>
              <li><Link href="/shipping" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Contact Us</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-montserrat text-[10px] text-gold tracking-[0.3em] uppercase mb-10">Newsletter</h4>
            <p className="text-ivory/70 font-playfair italic text-sm leading-relaxed mb-8">
              Join our exclusive inner circle to receive priority access to new collections and editorial stories.
            </p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="w-full bg-transparent border-b border-white/30 py-3 outline-none text-ivory text-sm font-poppins placeholder-grey/50 transition-colors focus:border-gold"
                required
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 font-montserrat text-[10px] uppercase tracking-[0.2em] text-ivory hover:text-gold transition-colors">
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-montserrat text-[9px] text-grey/60 tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} Noore Imperial. All rights reserved.
          </p>
          <div className="flex gap-8 font-montserrat text-[9px] text-grey/60 tracking-[0.2em] uppercase">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
