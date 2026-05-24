'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Aisha Raza',
    role: 'Bride, Delhi',
    avatar: 'AR',
    text: 'My bridal consultation was an absolute dream. The attention to detail and the craftsmanship of my lehenga left me completely speechless. Truly imperial.',
    rating: 5,
  },
  {
    name: 'Sarah Mehta',
    role: 'Fashion Enthusiast',
    avatar: 'SM',
    text: "I've shopped luxury brands worldwide, but the fit and finish of Noore Imperial's Western Edit is unmatched. The quality speaks for itself.",
    rating: 5,
  },
  {
    name: 'Meera Tiwari',
    role: 'Academy Graduate',
    avatar: 'MT',
    text: 'Enrolling in the Fashion Design academy was the best decision for my career. The faculty is incredible and the curriculum is world-class.',
    rating: 5,
  },
  {
    name: 'Priya Kapoor',
    role: 'Loyal Customer',
    avatar: 'PK',
    text: 'The Indo-Western cape set I bought was a showstopper at my sister\'s reception. Truly elegant, truly Noore Imperial.',
    rating: 5,
  },
  {
    name: 'Zara Khan',
    role: 'Franchise Partner',
    avatar: 'ZK',
    text: 'Partnering with Noore Imperial for my boutique was the best business decision. The brand support and training are exceptional.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const scrollRef = useRef(null);

  return (
    <section className="section-sm bg-black relative overflow-hidden">
      <div className="gold-line absolute top-0 left-0 right-0" />

      <div className="container-xl mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4"
        >
          <div>
            <p className="font-montserrat text-[9px] tracking-[0.4em] text-gold uppercase mb-4">
              Client Stories
            </p>
            <h2 className="font-cormorant text-5xl text-ivory leading-[0.9]">
              Imperial<br />
              <em className="text-grey/50 font-light">Voices</em>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' })}
              className="w-10 h-10 border border-white/10 flex items-center justify-center text-grey hover:border-gold hover:text-gold transition-all"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' })}
              className="w-10 h-10 border border-white/10 flex items-center justify-center text-grey hover:border-gold hover:text-gold transition-all"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory px-5 md:px-10 xl:px-[calc((100vw-1440px)/2+40px)] pb-4"
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex-shrink-0 w-[300px] md:w-[360px] snap-start card-luxury rounded-sm p-8 flex flex-col justify-between"
          >
            {/* Quote mark */}
            <div>
              <span className="font-cormorant text-6xl text-gold/20 leading-none block mb-2">"</span>
              <p className="font-playfair text-grey/80 text-[15px] italic leading-[1.8] font-light">
                {t.text}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <span className="font-montserrat text-[9px] text-gold font-semibold">{t.avatar}</span>
                </div>
                <div>
                  <p className="font-montserrat text-[10px] tracking-[0.15em] uppercase text-ivory">{t.name}</p>
                  <p className="font-poppins text-[11px] text-grey/50 mt-0.5">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-gold text-xs">★</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
