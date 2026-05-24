'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <section ref={ref} className="relative h-dvh min-h-[700px] w-full overflow-hidden bg-black flex flex-col items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-black/60 z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Fashion"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-20 flex flex-col items-center justify-center px-4 w-full max-w-5xl mx-auto text-center mt-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-px bg-gold/50" />
          <span className="font-montserrat text-[10px] tracking-[0.4em] text-gold uppercase">
            The Epitome of Elegance
          </span>
          <div className="w-12 h-px bg-gold/50" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="font-cormorant text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-wide mb-6 uppercase"
        >
          Noore <span className="text-gold italic">Imperial</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="font-playfair text-white/80 text-lg md:text-xl font-light tracking-wide mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Where timeless tradition meets contemporary couture. Discover our exquisite bridal collection crafted for the modern visionary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link
            href="/shop"
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gold text-black font-montserrat text-[11px] tracking-[0.2em] uppercase font-medium overflow-hidden w-full sm:w-auto min-w-[200px]"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">Explore Collection</span>
            <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
          </Link>

          <Link
            href="/consultation/book"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-black/20 text-white border border-white/20 font-montserrat text-[11px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500 w-full sm:w-auto min-w-[200px] backdrop-blur-md"
          >
            Book Consultation
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
