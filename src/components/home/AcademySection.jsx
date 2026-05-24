'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Award, Users, ArrowRight, GraduationCap } from 'lucide-react';

const COURSES = [
  { name: 'Fashion Design & Illustration', duration: '6 months', students: '1,200+', level: 'Professional' },
  { name: 'Bridal Couture Creation', duration: '4 months', students: '800+', level: 'Advanced' },
  { name: 'Boutique Management & Retail', duration: '3 months', students: '600+', level: 'Business' },
  { name: 'Professional Styling', duration: '2 months', students: '900+', level: 'Beginner' },
];

const STATS = [
  { icon: BookOpen, value: '20+', label: 'Courses' },
  { icon: Users, value: '3,000+', label: 'Alumni' },
  { icon: Award, value: '100%', label: 'Certified' },
  { icon: GraduationCap, value: '95%', label: 'Placement' },
];

export default function AcademySection() {
  return (
    <section className="section bg-black relative overflow-hidden">
      <div className="gold-line absolute top-0 left-0 right-0" />

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-[0.04]"
        />
      </div>

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-montserrat text-[9px] tracking-[0.4em] text-gold uppercase mb-5">
              Learn From The Masters
            </p>
            <h2 className="font-cormorant text-5xl md:text-6xl text-ivory leading-[0.9] mb-8">
              The Academy of<br />
              <em className="text-gradient-gold font-playfair">Fashion Excellence</em>
            </h2>
            <p className="font-poppins text-grey/70 text-sm leading-[1.9] mb-10 max-w-md font-light">
              Transform your passion into a profession. Join our elite academy to master fashion design, styling, and boutique management under the guidance of industry veterans.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="glass-gold rounded-sm p-4 text-center">
                  <Icon className="w-4 h-4 text-gold mx-auto mb-2" />
                  <p className="font-cormorant text-2xl text-ivory leading-none">{value}</p>
                  <p className="font-montserrat text-[8px] tracking-[0.2em] text-grey/50 uppercase mt-1">{label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/academy"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-black font-montserrat text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-colors"
            >
              Explore Courses
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right — Course list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="space-y-3"
          >
            <p className="font-montserrat text-[9px] tracking-[0.3em] text-grey/50 uppercase mb-6">
              Popular Disciplines
            </p>
            {COURSES.map((course, i) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href="/academy"
                  className="group flex items-center justify-between p-5 card-luxury rounded-sm hover:bg-white/2 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="tag bg-gold/10 text-gold border border-gold/20">
                        {course.level}
                      </span>
                    </div>
                    <h4 className="font-poppins text-sm text-ivory/90 group-hover:text-ivory transition-colors font-medium">
                      {course.name}
                    </h4>
                    <p className="font-montserrat text-[9px] tracking-[0.15em] text-grey/40 uppercase mt-1">
                      {course.duration} · {course.students} students
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-grey/30 group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                </Link>
              </motion.div>
            ))}

            <div className="pt-4">
              <Link
                href="/academy"
                className="font-montserrat text-[9px] tracking-[0.25em] uppercase text-grey/40 hover:text-gold transition-colors flex items-center gap-2"
              >
                View all 20+ courses
                <div className="w-6 h-px bg-current" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
