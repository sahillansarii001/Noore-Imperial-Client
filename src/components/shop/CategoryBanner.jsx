'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function CategoryBanner({ title, breadcrumb, image = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="relative bg-[#050505] py-24 border-b border-white/10 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-30">
        <img 
          src={image} 
          alt="Category Background" 
          className="w-full h-full object-cover object-center mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
      </motion.div>
      <div className="container-xl relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-cormorant text-5xl md:text-6xl text-gold mb-4 uppercase tracking-widest"
        >
          {title}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-center gap-2 font-montserrat text-xs tracking-widest uppercase text-grey"
        >
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          {breadcrumb && (
            <>
              <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
              <span>/</span>
            </>
          )}
          <span className="text-ivory">{title}</span>
        </motion.div>
      </div>
    </div>
  );
}
