'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    title: 'Bridal Couture',
    subtitle: 'The Royal Edit',
    tag: 'New Season',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1974&auto=format&fit=crop',
    path: '/shop/bridal',
    span: 'md:col-span-2 md:row-span-2',
    height: 'h-[55vh] md:h-full',
  },
  {
    title: 'Western Edit',
    subtitle: 'Contemporary Grace',
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1974&auto=format&fit=crop',
    path: '/shop/western',
    span: 'md:col-span-1',
    height: 'h-[40vh]',
  },
  {
    title: 'Indo Western',
    subtitle: 'Fusion Redefined',
    tag: 'Exclusive',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2000&auto=format&fit=crop',
    path: '/shop/indo-western',
    span: 'md:col-span-1',
    height: 'h-[40vh]',
  },
];

export default function FeaturedCollections() {
  return (
    <section className="section bg-black relative">
      <div className="gold-line absolute top-0 left-0 right-0" />

      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <p className="font-montserrat text-[9px] tracking-[0.4em] text-gold uppercase mb-4">
              Curated Selection
            </p>
            <h2 className="font-cormorant text-5xl md:text-6xl text-ivory leading-[0.9]">
              Featured<br />
              <em className="text-grey/60 font-light">Collections</em>
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-3 font-montserrat text-[10px] tracking-[0.2em] uppercase text-grey hover:text-gold transition-colors"
          >
            View All Collections
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3 md:h-[80vh]">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`${col.span} ${col.height}`}
            >
              <Link href={col.path} className="group relative block w-full h-full overflow-hidden img-zoom">
                {/* Image */}
                <img
                  src={col.image}
                  alt={col.title}
                  className="zoom-target w-full h-full object-cover object-top"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />

                {/* Inner border */}
                <div className="absolute inset-3 border border-white/0 group-hover:border-gold/30 transition-all duration-700 pointer-events-none" />

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="tag bg-gold text-black">
                    {col.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <motion.div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-montserrat text-[9px] tracking-[0.3em] text-gold uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {col.subtitle}
                    </p>
                    <h3 className="font-cormorant text-3xl md:text-4xl text-ivory tracking-wide mb-4">
                      {col.title}
                    </h3>
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                      <span className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-ivory/70">
                        Explore
                      </span>
                      <div className="w-8 h-[1px] bg-gold" />
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
