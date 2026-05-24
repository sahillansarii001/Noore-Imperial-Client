'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/shop/ProductCard';

export default function WesternCollectionSection() {
  const containerRef = useRef(null);
  
  // Minimal mock data for design
  const products = [
    { id: '1', slug: 'w1', name: 'Midnight Velvet Gown', price: 129900, images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2071&auto=format&fit=crop'], is_new: true },
    { id: '2', slug: 'w2', name: 'Silk Draped Corset', price: 54900, images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1974&auto=format&fit=crop'] },
    { id: '3', slug: 'w3', name: 'Asymmetric Blazer Dress', price: 89900, images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop'] },
    { id: '4', slug: 'w4', name: 'Ivory Satin Slip', price: 42900, images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1974&auto=format&fit=crop'], is_new: true },
  ];

  return (
    <section ref={containerRef} className="py-32 bg-black overflow-hidden relative">
      <div className="gold-line absolute top-0 left-0 right-0" />

      <div className="container-xl mb-16 flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-px bg-gold"></span>
            <span className="font-montserrat text-gold tracking-[0.4em] uppercase text-[10px]">Pret-a-Porter</span>
          </div>
          <h2 className="font-cormorant text-5xl md:text-6xl lg:text-7xl text-ivory tracking-wide">The Western Edit</h2>
        </div>
        <a href="/shop/western" className="group relative inline-flex items-center gap-4">
          <span className="font-montserrat text-[10px] tracking-[0.3em] text-ivory uppercase group-hover:text-gold transition-colors duration-300">
            View All Pieces
          </span>
          <div className="w-12 h-px bg-white/20 relative group-hover:w-16 group-hover:bg-gold transition-all duration-500">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-gold rotate-45 transition-colors duration-300"></div>
          </div>
        </a>
      </div>

      <div className="container-xl">
        <div className="flex gap-6 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          {products.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className="min-w-[280px] md:min-w-[340px] lg:min-w-[420px] snap-start group"
            >
              <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                <ProductCard product={product} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
