'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function Newsletter() {
  return (
    <section className="py-32 bg-[#050505] border-t border-gold/10">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-cormorant text-5xl text-gold mb-6">Join The Inner Circle</h2>
          <p className="font-poppins text-grey mb-12">
            Subscribe to receive exclusive access to new collections, private sales, and insider events from Noore Imperial.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 mb-6" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your Email Address" 
              required
              className="flex-1 bg-transparent border border-white/20 px-6 py-4 font-poppins text-ivory focus:border-gold focus:outline-none transition-colors"
            />
            <Button variant="primary" type="submit" size="lg" className="sm:w-auto">
              Subscribe
            </Button>
          </form>

          <p className="font-poppins text-xs text-[#555]">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
