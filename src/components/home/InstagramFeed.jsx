'use client';
import { motion } from 'framer-motion';

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
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-8 text-center mb-12">
        <h2 className="font-cormorant text-4xl text-ivory mb-2">@nooreimperial</h2>
        <a href="#" className="font-montserrat text-gold tracking-widest text-xs uppercase hover:underline">Follow Us on Instagram</a>
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
            <img src={img} alt="Instagram post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-montserrat text-xs tracking-widest uppercase border border-white px-4 py-2">View</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
