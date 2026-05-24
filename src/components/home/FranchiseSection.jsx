'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function FranchiseSection() {
  const models = [
    { title: 'Boutique Partner', desc: 'Curate our pret collections in your luxury retail space.' },
    { title: 'Bridal Studio', desc: 'A dedicated Noore Imperial bridal experience center.' },
    { title: 'Academy Partner', desc: 'Establish a certified Noore Imperial fashion academy.' }
  ];

  return (
    <section className="py-24 bg-[#080808] border-y border-gold/10">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <span className="font-montserrat text-gold tracking-[0.3em] uppercase text-xs mb-4 block">Expand The Empire</span>
        <h2 className="font-cormorant text-4xl md:text-5xl text-ivory mb-6">Franchise Opportunities</h2>
        <p className="font-poppins text-grey max-w-2xl mx-auto mb-16">
          Partner with a brand that defines luxury. We are inviting visionaries to become a part of our global expansion through exclusive franchise models.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {models.map((model, i) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 border border-white/5 hover:border-gold/30 bg-[#0c0c0c] transition-colors flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mb-6">
                <span className="text-gold font-cormorant italic text-xl">{i+1}</span>
              </div>
              <h3 className="font-cormorant text-2xl text-ivory mb-4">{model.title}</h3>
              <p className="font-poppins text-sm text-grey">{model.desc}</p>
            </motion.div>
          ))}
        </div>

        <Link href="/franchise">
          <Button variant="secondary" size="lg">Apply For Franchise</Button>
        </Link>
      </div>
    </section>
  );
}
