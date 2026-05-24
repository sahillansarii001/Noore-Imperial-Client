'use client';
import { motion } from 'framer-motion';

export default function DashboardStats({ stats }) {
  const colClass = stats.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4';
  
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${colClass} gap-4 mb-8 select-none`}>
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="card-premium p-6 group cursor-default"
        >
          {/* Top row */}
          <div className="flex items-start justify-between mb-5">
            <span className="font-montserrat text-[9px] text-grey/50 uppercase tracking-[0.22em] font-medium leading-tight max-w-[70%]">
              {stat.label}
            </span>
            {stat.icon && (
              <div className="w-8 h-8 border border-white/[0.07] flex items-center justify-center group-hover:border-gold/30 group-hover:bg-gold/5 transition-all duration-400">
                <stat.icon className="w-3.5 h-3.5 text-grey/30 group-hover:text-gold transition-colors duration-400" strokeWidth={1.5} />
              </div>
            )}
          </div>

          {/* Value */}
          <div className="flex items-baseline gap-3 mb-3">
            <h3 className="font-cormorant text-[2.4rem] text-ivory/95 tracking-wide leading-none">
              {stat.value}
            </h3>
            {stat.change && (
              <span className={`font-montserrat text-[9px] tracking-wide font-semibold px-1.5 py-0.5 ${
                stat.positive
                  ? 'text-emerald-400 bg-emerald-400/10'
                  : 'text-red-400 bg-red-400/10'
              }`}>
                {stat.change}
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(Math.random() * 40 + 50, 95)}%` }}
              transition={{ duration: 1.2, delay: i * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
