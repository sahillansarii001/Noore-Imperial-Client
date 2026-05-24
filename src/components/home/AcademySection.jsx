'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { BookOpen, Award, Users } from 'lucide-react';

export default function AcademySection() {
  return (
    <section className="py-0 bg-black border-y border-white/10 flex flex-col md:flex-row min-h-[600px]">
      
      {/* Left Content */}
      <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center">
        <span className="font-montserrat text-gold tracking-[0.3em] uppercase text-xs mb-4">Learn From The Masters</span>
        <h2 className="font-cormorant text-5xl md:text-6xl text-ivory leading-tight mb-8">
          The Academy of <br/> <span className="italic text-gold">Fashion Excellence</span>
        </h2>
        <p className="font-poppins text-grey mb-12 max-w-md leading-relaxed">
          Transform your passion into a profession. Join our elite academy to master fashion design, styling, and boutique management under the guidance of industry veterans.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 border-t border-b border-white/10 py-8">
          <div className="flex flex-col items-start gap-2">
            <BookOpen className="w-6 h-6 text-gold mb-2" />
            <h4 className="font-cormorant text-2xl text-ivory">20+</h4>
            <span className="font-montserrat text-[10px] text-grey uppercase tracking-widest">Courses</span>
          </div>
          <div className="flex flex-col items-start gap-2 border-l border-white/10 pl-6">
            <Users className="w-6 h-6 text-gold mb-2" />
            <h4 className="font-cormorant text-2xl text-ivory">1000+</h4>
            <span className="font-montserrat text-[10px] text-grey uppercase tracking-widest">Alumni</span>
          </div>
          <div className="flex flex-col items-start gap-2 border-l border-white/10 pl-6">
            <Award className="w-6 h-6 text-gold mb-2" />
            <h4 className="font-cormorant text-2xl text-ivory">100%</h4>
            <span className="font-montserrat text-[10px] text-grey uppercase tracking-widest">Certification</span>
          </div>
        </div>

        <Link href="/academy">
          <Button variant="primary">Explore Courses</Button>
        </Link>
      </div>

      {/* Right Image/Categories */}
      <div className="w-full md:w-1/2 relative bg-[#111] overflow-hidden min-h-[400px]">
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1974&auto=format&fit=crop" 
          alt="Fashion Academy" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/80" />
        
        <div className="relative z-10 h-full p-12 flex flex-col justify-end">
          <h3 className="font-cormorant text-3xl text-gold mb-6">Popular Disciplines</h3>
          <div className="flex flex-col gap-4">
            {['Fashion Design & Illustration', 'Bridal Couture Creation', 'Boutique Management & Retail', 'Professional Styling'].map((course, i) => (
              <motion.div 
                key={course}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center justify-between p-4 bg-black/50 border border-white/10 hover:border-gold backdrop-blur-sm cursor-pointer transition-colors"
              >
                <span className="font-poppins text-sm text-ivory group-hover:text-gold transition-colors">{course}</span>
                <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
