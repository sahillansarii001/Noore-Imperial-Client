'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard/customer');
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login(email, password);
    if (res.success) {
      router.push('/dashboard/customer');
    } else {
      setError(res.error || 'Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left side: Editorial Image */}
      <div className="hidden lg:block w-[52%] relative bg-[#080808] flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1964&auto=format&fit=crop"
          alt="Luxury Fashion"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-75"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

        {/* Corner frames */}
        <div className="absolute top-10 left-10 w-16 h-16 border-t border-l border-gold/25" />
        <div className="absolute bottom-10 right-10 w-16 h-16 border-b border-r border-gold/25" />

        {/* Content */}
        <div className="absolute bottom-14 left-12 right-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[1px] bg-gold/50" />
            <span className="font-montserrat text-[9px] tracking-[0.4em] text-gold/70 uppercase">Imperial Access</span>
          </div>
          <h2 className="font-cormorant text-[3.2rem] text-ivory leading-[0.92] mb-5 tracking-wide">
            Enter the<br />Imperial Circle
          </h2>
          <p className="font-poppins text-[13px] text-ivory/55 font-light max-w-sm leading-relaxed">
            Experience exclusive collections, bespoke bridal services, and personalized styling consultations.
          </p>
        </div>

        {/* Logo */}
        <div className="absolute top-10 left-12 flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image src="/logo.png" alt="Noore Imperial" fill className="object-contain drop-shadow-[0_0_12px_rgba(201,168,76,0.4)]" />
          </div>
          <div>
            <p className="font-cormorant text-[17px] tracking-[0.25em] uppercase text-ivory leading-none">Noore Imperial</p>
            <p className="font-montserrat text-[7px] tracking-[0.4em] text-gold/55 uppercase mt-0.5">Luxury Fashion</p>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16 xl:p-24 pt-28 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="relative w-9 h-9">
              <Image src="/logo.png" alt="Noore Imperial" fill className="object-contain" />
            </div>
            <div>
              <p className="font-cormorant text-[16px] tracking-[0.22em] uppercase text-ivory leading-none">Noore Imperial</p>
              <p className="font-montserrat text-[7px] tracking-[0.38em] text-gold/60 uppercase mt-0.5">Luxury Fashion</p>
            </div>
          </div>

          <div className="mb-10">
            <p className="font-montserrat text-[9px] tracking-[0.4em] text-gold/70 uppercase mb-3">Welcome Back</p>
            <h1 className="font-cormorant text-[2.8rem] text-ivory mb-3 tracking-wide leading-[0.95]">Sign In</h1>
            <p className="font-poppins text-grey/50 text-[13px] font-light">Access your imperial account.</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-950/20 border border-red-900/30 text-red-300/80 p-4 mb-8 text-[11px] font-poppins tracking-wide text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Email */}
            <div className="relative group">
              <input
                type="email"
                className="w-full bg-transparent border-b border-white/15 py-4 px-0 text-ivory text-[13px] font-poppins focus:border-gold outline-none transition-colors duration-300 peer placeholder-transparent"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email"
                id="login-email"
              />
              <label
                htmlFor="login-email"
                className="absolute left-0 top-4 font-montserrat text-[9px] text-grey/50 tracking-[0.25em] uppercase transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-[8px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-gold/70"
              >
                Email Address
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold group-focus-within:w-full transition-all duration-500" />
            </div>

            {/* Password */}
            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-transparent border-b border-white/15 py-4 px-0 pr-20 text-ivory text-[13px] font-poppins focus:border-gold outline-none transition-colors duration-300 peer placeholder-transparent"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password"
                id="login-password"
              />
              <label
                htmlFor="login-password"
                className="absolute left-0 top-4 font-montserrat text-[9px] text-grey/50 tracking-[0.25em] uppercase transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-[8px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-gold/70"
              >
                Password
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold group-focus-within:w-full transition-all duration-500" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-grey/40 hover:text-gold transition-colors duration-300 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                </button>
                <a href="#" className="font-montserrat text-[9px] text-grey/40 hover:text-gold transition-colors uppercase tracking-widest">
                  Forgot?
                </a>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full group relative flex items-center justify-center gap-3 px-8 py-4 bg-gold text-black font-montserrat text-[10px] tracking-[0.28em] uppercase font-semibold hover:bg-gold-dark transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <span className="absolute inset-0 bg-gold-light transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                ) : (
                  <>
                    <span className="relative z-10">Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-white/[0.06] text-center">
            <p className="font-montserrat text-[9px] uppercase tracking-[0.22em] text-grey/35">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-gold hover:text-gold-light transition-colors ml-1.5">
                Register Now
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
