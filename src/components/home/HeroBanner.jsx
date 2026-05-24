'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroBanner() {
  const title = "NOORE IMPERIAL".split(" ");
  
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0 animate-image-reveal">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Fashion Hero" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-20 text-center px-4 flex flex-col items-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-montserrat text-gold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 flex items-center gap-4"
        >
          <span className="w-12 h-[1px] bg-gold/50"></span>
          The Epitome of Elegance
          <span className="w-12 h-[1px] bg-gold/50"></span>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
          {title.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 0.5 + (i * 0.2), ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant text-6xl md:text-8xl lg:text-[120px] text-ivory tracking-widest leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="font-playfair text-grey/80 text-lg md:text-2xl max-w-2xl mx-auto mb-14 italic font-light tracking-wide"
        >
          Where timeless tradition meets contemporary couture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link 
            href="/shop"
            className="group relative px-8 py-4 bg-gold text-black font-montserrat text-xs tracking-[0.2em] uppercase overflow-hidden hover:text-white transition-colors duration-500 min-w-[220px]"
          >
            <span className="relative z-10 font-semibold">Explore Collection</span>
            <div className="absolute inset-0 bg-gold-dark transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
          </Link>
          
          <Link 
            href="/consultation/book"
            className="group relative px-8 py-4 bg-transparent text-ivory border border-white/20 font-montserrat text-xs tracking-[0.2em] uppercase overflow-hidden hover:border-gold transition-colors duration-500 min-w-[220px]"
          >
            <span className="relative z-10 group-hover:text-gold transition-colors duration-500">Book Consultation</span>
            <div className="absolute inset-0 bg-white/5 transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out z-0"></div>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="font-montserrat text-[9px] text-ivory/50 tracking-[0.3em] uppercase">Discover</span>
        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
