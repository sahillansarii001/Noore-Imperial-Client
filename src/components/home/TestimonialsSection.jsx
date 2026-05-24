'use client';
import { motion } from 'framer-motion';

export default function TestimonialsSection() {
  const testimonials = [
    { name: "Aisha R.", text: "My bridal consultation was an absolute dream. The attention to detail and the craftsmanship of my lehenga left me speechless.", rating: 5 },
    { name: "Sarah M.", text: "I've shopped luxury brands worldwide, but the fit and finish of Noore Imperial's Western Edit is unmatched.", rating: 5 },
    { name: "Meera T.", text: "Enrolling in the Fashion Design academy was the best decision for my career. The faculty is incredible.", rating: 5 },
    { name: "Priya K.", text: "The Indo-Western cape set I bought was a showstopper at my sister's reception. Truly elegant.", rating: 5 },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-16 text-center">
        <h2 className="font-cormorant text-4xl text-ivory mb-4">Imperial Voices</h2>
        <div className="w-12 h-[1px] bg-gold mx-auto" />
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory px-4 md:px-8 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1 }}
            className="min-w-[300px] md:min-w-[400px] bg-[#111] border border-white/5 p-8 snap-center flex flex-col justify-between"
          >
            <div>
              <span className="text-gold font-cormorant text-6xl leading-none block mb-[-20px]">"</span>
              <p className="font-playfair text-grey text-lg italic mb-6 leading-relaxed relative z-10">
                {t.text}
              </p>
            </div>
            <div className="flex justify-between items-end border-t border-white/10 pt-4">
              <span className="font-montserrat text-ivory text-sm tracking-widest uppercase">{t.name}</span>
              <div className="flex gap-1 text-gold">
                {[...Array(t.rating)].map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
