'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CategoryBanner from '@/components/shop/CategoryBanner';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Sparkles, ArrowRight, HeartHandshake, Scissors, Ruler, CheckCircle } from 'lucide-react';

const SERVICES = [
  {
    title: 'Bespoke Bridal Gowns',
    desc: 'Custom-designed ensembles tailored perfectly to your vision and measurements.',
  },
  {
    title: 'Trousseau Curation',
    desc: 'Expertly assembled collections for your pre and post-wedding celebrations.',
  },
  {
    title: 'Groom Styling',
    desc: 'Coordinated sherwanis and suits to complement the bridal look perfectly.',
  },
  {
    title: 'Jewelry Consultation',
    desc: 'Guidance on selecting the perfect high-jewelry pieces for your ensemble.',
  },
];

const PROCESS = [
  {
    icon: HeartHandshake,
    title: 'Initial Consultation',
    desc: 'Discuss your vision, preferences, and venue with our master stylists.',
  },
  {
    icon: Scissors,
    title: 'Design & Fabric Selection',
    desc: 'Review sketches and choose from our archive of premium global fabrics.',
  },
  {
    icon: Ruler,
    title: 'Measurements & Toile',
    desc: 'Precise measurements taken for the creation of your initial toile fitting.',
  },
  {
    icon: CheckCircle,
    title: 'Final Fitting & Delivery',
    desc: 'The final reveal and adjustments to ensure absolute perfection.',
  },
];

const TESTIMONIALS = [
  {
    text: "The Noore Imperial team made me feel like royalty. My bridal lehenga was a masterpiece of craftsmanship.",
    name: "Aisha R.",
    location: "Delhi, India"
  },
  {
    text: "From the first sketch to the final fitting, the bespoke process was flawless. Truly the pinnacle of luxury.",
    name: "Sarah M.",
    location: "London, UK"
  }
];

export default function BridalStudioPage() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="min-h-screen bg-[#080808] pt-20">
      <CategoryBanner title="Bridal Studio" breadcrumb={false} />

      {/* Intro Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-xl px-4 text-center max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="font-montserrat text-[9px] tracking-[0.4em] text-gold uppercase">
                The Royal Journey
              </span>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-ivory mb-8 leading-[0.9]">
              The Bespoke<br />
              <em className="text-gradient-gold font-playfair">Bridal Experience</em>
            </h2>
            <p className="font-poppins text-grey/80 text-sm leading-relaxed mb-12 font-light">
              Your wedding day is a tapestry of moments that last a lifetime. At the Noore Imperial Bridal Studio, 
              we weave your dreams into reality. From the first consultation to the final fitting, our master 
              artisans work tirelessly to ensure you look nothing short of imperial. Every stitch tells a story of romance and unparalleled craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-black relative border-y border-white/[0.05]">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {SERVICES.map((service, idx) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex gap-6 group"
              >
                <div className="w-12 h-12 flex-shrink-0 border border-gold/20 flex items-center justify-center group-hover:border-gold transition-colors duration-500">
                  <span className="font-cormorant text-xl text-gold">0{idx + 1}</span>
                </div>
                <div>
                  <h3 className="font-cormorant text-3xl text-ivory mb-3">{service.title}</h3>
                  <p className="font-poppins text-sm text-grey/60 leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-28 relative">
        <div className="container-xl">
          <div className="text-center mb-16">
            <h2 className="font-cormorant text-4xl md:text-5xl text-ivory mb-4">The Making of a Masterpiece</h2>
            <p className="font-montserrat text-[9px] tracking-[0.3em] text-grey/50 uppercase">Step by step</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="text-center card-luxury p-8 rounded-sm relative"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gold/5 flex items-center justify-center border border-gold/20 mb-6">
                  <step.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                </div>
                <h4 className="font-montserrat text-[10px] tracking-widest uppercase text-ivory mb-4">{step.title}</h4>
                <p className="font-poppins text-xs text-grey/50 leading-relaxed">{step.desc}</p>
                
                {idx !== PROCESS.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-[1px] bg-gold/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Gallery & Quote */}
      <section ref={scrollRef} className="py-0 relative h-[70vh] min-h-[600px] overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0 z-0 scale-110">
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1964&auto=format&fit=crop" 
            alt="Bridal Details" 
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <Sparkles className="w-6 h-6 text-gold mx-auto mb-8 opacity-70" />
          <h3 className="font-cormorant text-4xl md:text-6xl text-gold italic leading-tight mb-8 drop-shadow-xl">
            "Crafting legends,<br/>one gown at a time."
          </h3>
          <div className="w-24 h-[1px] bg-gold/50 mx-auto" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#050505]">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-10 border border-white/5 bg-white/[0.01]"
              >
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className="text-gold text-sm">★</span>
                  ))}
                </div>
                <p className="font-playfair text-lg text-grey/90 italic mb-8">"{t.text}"</p>
                <div>
                  <p className="font-montserrat text-[10px] tracking-widest text-ivory uppercase">{t.name}</p>
                  <p className="font-poppins text-[10px] text-grey/40 mt-1">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-gold/10 relative overflow-hidden bg-black">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/[0.05] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-xl text-center relative z-10">
          <h2 className="font-cormorant text-5xl text-ivory mb-6">Begin Your Journey</h2>
          <p className="font-poppins text-sm text-grey/60 mb-10 max-w-lg mx-auto font-light">
            Schedule a private consultation at our studio to explore possibilities and begin crafting your dream bridal ensemble.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/consultation/book">
              <Button variant="gold" size="lg" className="w-full sm:w-auto flex items-center gap-2">
                Book Consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <Link href="/shop/bridal">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
