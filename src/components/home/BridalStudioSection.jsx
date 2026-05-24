'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function BridalStudioSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={sectionRef} className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-start z-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-gold"></span>
              <span className="font-montserrat text-gold tracking-[0.4em] uppercase text-[10px]">The Bridal Experience</span>
            </div>
            
            <h2 className="font-cormorant text-6xl md:text-7xl lg:text-[80px] text-ivory leading-[0.9] mb-8">
              Your<br/>Fairytale, <br/>
              <span className="text-gold italic font-playfair font-light tracking-wide">Bespoke.</span>
            </h2>
            
            <p className="font-playfair text-grey/80 text-lg mb-12 leading-relaxed max-w-md font-light">
              Step into a world where every stitch tells a story of romance. Our bridal studio offers personalized consultations to craft the gown of your dreams.
            </p>
            
            <div className="grid grid-cols-2 gap-12 mb-12 w-full max-w-md relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
              <div>
                <h4 className="font-cormorant text-5xl text-gold mb-2">500<span className="text-2xl text-ivory/50">+</span></h4>
                <p className="font-montserrat text-[9px] text-grey tracking-[0.2em] uppercase">Happy Brides</p>
              </div>
              <div className="pl-4">
                <h4 className="font-cormorant text-5xl text-gold mb-2">50<span className="text-2xl text-ivory/50">+</span></h4>
                <p className="font-montserrat text-[9px] text-grey tracking-[0.2em] uppercase">Master Artisans</p>
              </div>
            </div>

            <Link 
              href="/bridal-studio"
              className="group relative inline-flex items-center gap-6"
            >
              <span className="font-montserrat text-[11px] tracking-[0.3em] text-ivory uppercase group-hover:text-gold transition-colors duration-300">
                Explore The Studio
              </span>
              <div className="w-16 h-[1px] bg-white/20 relative group-hover:w-24 group-hover:bg-gold transition-all duration-500">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-white/20 group-hover:border-gold rotate-45 transition-colors duration-300"></div>
              </div>
            </Link>
          </motion.div>

          <div className="lg:col-span-7 relative h-[700px] w-full">
            <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[80%] h-[85%] z-10 group overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1964&auto=format&fit=crop" 
                alt="Bridal Gown" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-6 border border-white/20 z-20 pointer-events-none" />
            </motion.div>
            
            <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[55%] h-[60%] z-20 shadow-[30px_-30px_60px_rgba(0,0,0,0.9)] group overflow-hidden bg-black">
              <img 
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1974&auto=format&fit=crop" 
                alt="Bridal Details" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-[2s] ease-out"
              />
              <div className="absolute inset-4 border border-gold/30 z-20 pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
