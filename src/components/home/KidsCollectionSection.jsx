'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function KidsCollectionSection() {
  const categories = [
    { name: 'Girls Formal', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop', link: '/shop/kids/girls' },
    { name: 'Boys Traditional', img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2070&auto=format&fit=crop', link: '/shop/kids/boys' },
    { name: 'Infants', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1926&auto=format&fit=crop', link: '/shop/kids/infants' },
  ];

  return (
    <section className="py-24 bg-black relative">
      <div className="gold-line absolute top-0 left-0 right-0" />
      <div className="container-xl">
        <div className="text-center mb-16">
          <span className="font-montserrat text-gold tracking-[0.3em] uppercase text-[10px] mb-4 block">Noore Imperial Petit</span>
          <h2 className="font-cormorant text-5xl md:text-6xl text-ivory mb-6">Little Royals</h2>
          <p className="font-poppins text-grey/70 text-sm font-light max-w-2xl mx-auto">
            Luxury knows no age. Discover our meticulously crafted collection for the youngest members of the imperial family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <Link href={cat.link} className="group block relative overflow-hidden aspect-[4/5] bg-white">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="w-full flex justify-between items-center">
                    <h3 className="font-cormorant text-3xl text-ivory">{cat.name}</h3>
                    <span className="font-montserrat text-[9px] text-gold tracking-widest uppercase border border-gold/40 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Shop
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <Link href="/shop/kids">
            <Button variant="outline" className="px-10 py-4 text-[10px] tracking-[0.25em]">Explore Collection</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
