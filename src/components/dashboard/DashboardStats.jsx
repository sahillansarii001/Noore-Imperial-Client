'use client';

export default function DashboardStats({ stats }) {
  const colClass = stats.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4';
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${colClass} gap-6 mb-8 select-none`}>
      {stats.map((stat, i) => (
        <div key={i} className="bg-[#0F0F0F] p-6 border border-white/5 relative overflow-hidden group hover:border-gold/20 transition-all duration-500">
          {/* Accent border top */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold/50 to-transparent group-hover:from-gold transition-colors duration-500" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="font-montserrat text-[10px] text-grey uppercase tracking-[0.2em] font-medium">{stat.label}</span>
            {stat.icon && <stat.icon className="w-4 h-4 text-gold/40 group-hover:text-gold transition-colors duration-500" strokeWidth={1.5} />}
          </div>
          
          <div className="flex items-baseline gap-3">
            <h3 className="font-cormorant text-4xl text-ivory/95 tracking-wide">{stat.value}</h3>
            {stat.change && (
              <span className={`font-poppins text-[10px] tracking-wide ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
