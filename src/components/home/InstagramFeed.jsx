'use client';
import { motion } from 'framer-motion';
const InstagramIcon = ({ className, strokeWidth = 1.5 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function InstagramFeed() {
  const images = [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500&auto=format&fit=crop"
  ];

  return (
    <section className="py-24 bg-black relative">
      <div className="gold-line absolute top-0 left-0 right-0" />
      <div className="container-xl text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-6 h-[1px] bg-gold/50" />
          <span className="font-montserrat text-[9px] tracking-[0.4em] text-gold uppercase">Social</span>
          <div className="w-6 h-[1px] bg-gold/50" />
        </div>
        <h2 className="font-cormorant text-4xl md:text-5xl text-ivory mb-4">@nooreimperial</h2>
        <a href="#" className="font-montserrat text-grey/60 tracking-widest text-[9px] uppercase hover:text-gold transition-colors inline-flex items-center gap-2">
          Follow The Journey
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
        {images.map((img, i) => (
          <motion.a
            href="#"
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group block relative aspect-square overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-gold/10 transition-colors duration-500 z-10 pointer-events-none" />
            <img src={img} alt="Instagram post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-0" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
              <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <InstagramIcon className="w-5 h-5 text-ivory" strokeWidth={1.5} />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
