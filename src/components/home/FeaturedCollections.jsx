'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FeaturedCollections() {
  const collections = [
    {
      title: "Bridal Couture",
      subtitle: "The Royal Edit",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1974&auto=format&fit=crop",
      link: "/shop/bridal",
      colSpan: "col-span-1 md:col-span-2",
      height: "h-[50vh] md:h-[70vh]"
    },
    {
      title: "Western Edit",
      subtitle: "Contemporary Grace",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1974&auto=format&fit=crop",
      link: "/shop/western",
      colSpan: "col-span-1",
      height: "h-[40vh] md:h-[33.5vh]"
    },
    {
      title: "Indo Western",
      subtitle: "Fusion Redefined",
      image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2000&auto=format&fit=crop",
      link: "/shop/indo-western",
      colSpan: "col-span-1",
      height: "h-[40vh] md:h-[33.5vh]"
    }
  ];

  return (
    <section className="py-24 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <span className="font-montserrat text-gold tracking-[0.3em] uppercase text-[10px] mb-4 block">
              Curated Selection
            </span>
            <h2 className="font-cormorant text-5xl md:text-6xl text-ivory leading-none">
              Featured<br/><i className="text-grey font-light">Collections</i>
            </h2>
          </div>
          <Link href="/shop" className="group flex items-center gap-4">
            <span className="font-montserrat text-[10px] tracking-[0.2em] text-ivory uppercase group-hover:text-gold transition-colors">View All</span>
            <div className="w-12 h-[1px] bg-white/20 group-hover:bg-gold transition-colors relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-gold rotate-45 transition-colors"></div>
            </div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {collections.map((col, index) => (
            <Link 
              key={col.title} 
              href={col.link} 
              className={`group block relative overflow-hidden ${col.colSpan} ${col.height}`}
            >
              <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="w-full h-full relative"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10" />
                <img 
                  src={col.image} 
                  alt={col.title} 
                  className="w-full h-full object-cover object-top transform group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-out"
                />
                
                {/* Elegant overlay frame */}
                <div className="absolute inset-4 md:inset-6 border border-white/10 group-hover:border-gold/40 transition-colors duration-700 z-20 pointer-events-none scale-[0.98] group-hover:scale-100 ease-out" />
                
                <div className="absolute inset-0 z-30 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="font-montserrat text-[9px] tracking-[0.3em] text-gold uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {col.subtitle}
                    </span>
                    <h3 className="font-cormorant text-3xl md:text-5xl text-ivory tracking-wide mb-4">
                      {col.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
