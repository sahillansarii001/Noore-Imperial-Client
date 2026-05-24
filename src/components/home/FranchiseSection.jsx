'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, MapPin, Users, Award, ArrowRight } from 'lucide-react';

const MODELS = [
  {
    icon: TrendingUp,
    title: 'Boutique Partner',
    desc: 'Curate our pret collections in your luxury retail space with full brand support.',
    roi: '40% ROI',
  },
  {
    icon: MapPin,
    title: 'Bridal Studio',
    desc: 'A dedicated Noore Imperial bridal experience center in your city.',
    roi: 'Premium Tier',
  },
  {
    icon: Award,
    title: 'Academy Partner',
    desc: 'Establish a certified Noore Imperial fashion academy with our curriculum.',
    roi: 'High Demand',
  },
];

export default function FranchiseSection() {
  return (
    <section className="section bg-[#080808] relative overflow-hidden">
      <div className="gold-line absolute top-0 left-0 right-0" />

      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-montserrat text-[9px] tracking-[0.4em] text-gold uppercase mb-5">
            Expand The Empire
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-ivory mb-6 leading-[0.9]">
            Franchise<br />
            <em className="text-gradient-gold font-playfair">Opportunities</em>
          </h2>
          <p className="font-poppins text-grey/60 text-sm max-w-xl mx-auto leading-[1.9] font-light">
            Partner with a brand that defines luxury. We invite visionaries to become part of our global expansion through exclusive franchise models.
          </p>
        </motion.div>

        {/* Models */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {MODELS.map((model, i) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group card-luxury rounded-sm p-8 flex flex-col hover:bg-white/[0.02] transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-sm border border-gold/20 flex items-center justify-center group-hover:border-gold/40 group-hover:bg-gold/5 transition-all">
                  <model.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="tag bg-gold/10 text-gold border border-gold/20">
                  {model.roi}
                </span>
              </div>
              <h3 className="font-cormorant text-2xl text-ivory mb-3 group-hover:text-gold transition-colors">
                {model.title}
              </h3>
              <p className="font-poppins text-sm text-grey/60 leading-relaxed flex-1 font-light">
                {model.desc}
              </p>
              <div className="mt-6 pt-6 border-t border-white/[0.05] flex items-center gap-2 font-montserrat text-[9px] tracking-[0.2em] uppercase text-grey/40 group-hover:text-gold transition-colors">
                Learn More
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/franchise"
            className="group inline-flex items-center gap-3 px-10 py-4 border border-gold/40 text-gold font-montserrat text-[10px] tracking-[0.25em] uppercase hover:bg-gold hover:text-black transition-all duration-300"
          >
            Apply For Franchise
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
