'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CalendarHeart } from 'lucide-react';

const SERVICES = [
  {
    title: 'Bridal Consultation',
    desc: 'Bespoke design sessions for your dream wedding ensemble.',
  },
  {
    title: 'Wardrobe Styling',
    desc: 'Personalized styling for trousseau and special occasions.',
  },
  {
    title: 'Private Viewing',
    desc: 'Exclusive access to our latest collections and high jewelry.',
  },
];

export default function ConsultationSection() {
  return (
    <section className="section bg-black relative overflow-hidden">
      <div className="gold-line absolute top-0 left-0 right-0" />
      
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          
          {/* Left - Images */}
          <div className="relative h-[600px] lg:h-[700px] order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-10 left-0 w-[80%] h-[80%] overflow-hidden img-zoom shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
            >
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop"
                alt="Consultation Session"
                className="zoom-target w-full h-full object-cover grayscale-30"
              />
              <div className="absolute inset-4 border border-white/10 z-20 pointer-events-none" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 right-0 w-[55%] h-[45%] overflow-hidden img-zoom shadow-[-20px_-20px_60px_rgba(0,0,0,0.8)] bg-black p-3"
            >
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1974&auto=format&fit=crop"
                alt="Styling Detail"
                className="zoom-target w-full h-full object-cover opacity-90"
              />
            </motion.div>
          </div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <CalendarHeart className="w-4 h-4 text-gold" />
              <span className="font-montserrat text-[9px] tracking-[0.4em] text-gold uppercase">
                Private Appointments
              </span>
            </div>

            <h2 className="font-cormorant text-5xl md:text-6xl text-ivory leading-[0.9] mb-8">
              Personalized<br />
              <em className="text-gradient-gold font-playfair">Consultations</em>
            </h2>

            <p className="font-poppins text-grey/70 text-sm leading-[1.9] mb-12 max-w-md font-light">
              Experience fashion tailored exclusively for you. Book a one-on-one session with our master stylists to curate your perfect wardrobe or conceptualize your dream bridal look.
            </p>

            <div className="space-y-6 mb-12">
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 border-l border-gold/20 pl-6"
                >
                  <div>
                    <h4 className="font-montserrat text-[10px] tracking-[0.15em] uppercase text-ivory mb-1">
                      {service.title}
                    </h4>
                    <p className="font-poppins text-[11px] text-grey/50 leading-relaxed font-light">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/consultation/book"
              className="group inline-flex items-center gap-4 px-10 py-4 bg-gold text-black font-montserrat text-[10px] tracking-[0.25em] uppercase font-semibold hover:bg-gold-light transition-all duration-400 min-w-[240px] justify-center relative overflow-hidden"
            >
              <span className="relative z-10 transition-all duration-500">Book Your Session</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
