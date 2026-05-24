'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductCard from '@/components/shop/ProductCard';

export default function IndoWesternSection() {
  const products = [
    { id: 'iw1', slug: 'iw1', name: 'Embroidered Cape Set', price: 85900, images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2000&auto=format&fit=crop'] },
    { id: 'iw2', slug: 'iw2', name: 'Metallic Draped Saree', price: 62000, images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1974&auto=format&fit=crop'] },
  ];

  return (
    <section className="py-32 bg-[#050505] relative border-b border-white/5">
      <div className="gold-line absolute top-0 left-0 right-0" />
      <div className="container-xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-5/12 relative min-h-[600px] group overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1974&auto=format&fit=crop" 
              alt="Indo Western Campaign" 
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out"
            />
            
            <div className="absolute inset-6 border border-white/20 z-20 pointer-events-none" />

            <div className="absolute inset-0 z-30 p-12 flex flex-col justify-end">
              <span className="font-montserrat text-gold tracking-[0.4em] uppercase text-[10px] mb-4">Fusion Collection</span>
              <h2 className="font-cormorant text-5xl md:text-6xl text-ivory mb-8">Indo<br/><i className="font-light text-grey/90">Western</i></h2>
              
              <Link 
                href="/shop/indo-western"
                className="group/btn relative inline-flex items-center gap-6"
              >
                <span className="font-montserrat text-[10px] tracking-[0.3em] text-ivory uppercase group-hover/btn:text-gold transition-colors duration-300">
                  View Collection
                </span>
                <div className="w-12 h-px bg-white/20 relative group-hover/btn:w-20 group-hover/btn:bg-gold transition-all duration-500">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-white/20 group-hover/btn:border-gold rotate-45 transition-colors duration-300"></div>
                </div>
              </Link>
            </div>
          </motion.div>

          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mb-16 pl-8 md:pl-12 border-l border-gold/20"
            >
              <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-gold/50" />
              <p className="font-playfair text-xl md:text-2xl text-grey/90 italic font-light leading-relaxed">
                "Where heritage craftsmanship meets modern silhouettes. Redefining traditional wear for the contemporary muse."
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              {products.map((prod, i) => (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + (i * 0.2), ease: "easeOut" }}
                  className="group"
                >
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <ProductCard product={prod} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
