'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const SERVICES = [
  'Bespoke Bridal Gowns',
  'Groom Styling & Sherwani',
  'Trousseau Curation',
  'Pre-Wedding Styling',
  'Custom Embroidery',
  'Jewellery Consultation',
];

export default function BridalStudioSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="section bg-[#080808] relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gold/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="gold-line absolute top-0 left-0 right-0" />

      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="font-montserrat text-[9px] tracking-[0.4em] text-gold uppercase">
                The Bridal Experience
              </span>
            </div>

            <h2 className="font-cormorant text-5xl md:text-6xl xl:text-7xl text-ivory leading-[0.9] mb-8">
              Your Fairytale,<br />
              <em className="text-gradient-gold font-playfair">Bespoke.</em>
            </h2>

            <p className="font-poppins text-grey/70 text-sm leading-[1.9] mb-10 max-w-md font-light">
              Step into a world where every stitch tells a story of romance. Our master artisans craft your dream bridal ensemble with unparalleled precision and artistry.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-white/6">
              {[['500+', 'Happy Brides'], ['50+', 'Artisans'], ['15+', 'Years']].map(([n, l]) => (
                <div key={l}>
                  <p className="font-cormorant text-4xl text-gold leading-none mb-1">{n}</p>
                  <p className="font-montserrat text-[8px] tracking-[0.2em] text-grey/50 uppercase">{l}</p>
                </div>
              ))}
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-2 gap-2 mb-10">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-2.5 py-2"
                >
                  <div className="w-1 h-1 rounded-full bg-gold shrink-0" />
                  <span className="font-poppins text-xs text-grey/70">{s}</span>
                </motion.div>
              ))}
            </div>

            <Link
              href="/bridal-studio"
              className="group inline-flex items-center gap-4 font-montserrat text-[10px] tracking-[0.25em] uppercase text-ivory hover:text-gold transition-colors"
            >
              Explore The Studio
              <div className="flex items-center gap-1">
                <div className="w-8 h-px bg-current group-hover:w-12 transition-all duration-500" />
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </motion.div>

          {/* Right — Images */}
          <div className="relative h-[600px] lg:h-[700px]">
            <motion.div
              style={{ y: y1 }}
              className="absolute top-0 right-0 w-[78%] h-[82%] overflow-hidden img-zoom shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
            >
              <div className="absolute inset-0 bg-black/10 z-10" />
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1964&auto=format&fit=crop"
                alt="Bridal Gown"
                className="zoom-target w-full h-full object-cover"
              />
              <div className="absolute inset-5 border border-white/10 z-20 pointer-events-none" />
            </motion.div>

            <motion.div
              style={{ y: y2 }}
              className="absolute bottom-0 left-0 w-[52%] h-[55%] overflow-hidden img-zoom shadow-[20px_-20px_60px_rgba(0,0,0,0.8)] bg-black"
            >
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1974&auto=format&fit=crop"
                alt="Bridal Details"
                className="zoom-target w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-4 border border-gold/20 z-20 pointer-events-none" />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute top-[30%] left-[18%] glass-gold rounded-sm px-5 py-4 z-30 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              <p className="font-cormorant text-3xl text-gold leading-none">500+</p>
              <p className="font-montserrat text-[8px] tracking-[0.2em] text-grey/60 uppercase mt-1">Brides Styled</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
