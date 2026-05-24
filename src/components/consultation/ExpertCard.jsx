'use client';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function ExpertCard({ expert, selected, onSelect }) {
  return (
    <div 
      className={cn(
        "bg-[#111] border p-6 flex flex-col items-center text-center transition-colors duration-300",
        selected ? "border-gold bg-[#1a1814]" : "border-white/10 hover:border-gold/50"
      )}
    >
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gold/30">
        <img 
          src={expert.user?.profile_image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop"} 
          alt={expert.user?.name || "Expert"} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-cormorant text-2xl text-ivory mb-1">{expert.user?.name || "Master Stylist"}</h3>
      <span className="font-montserrat text-[10px] text-gold uppercase tracking-widest mb-3">{expert.speciality || "Bridal & Couture"}</span>
      
      <div className="flex gap-1 text-gold text-xs mb-4">
        ★★★★★
      </div>
      
      <Button 
        variant={selected ? 'primary' : 'secondary'} 
        size="sm" 
        onClick={() => onSelect(expert)}
        className="w-full"
      >
        {selected ? 'Selected' : 'Select Stylist'}
      </Button>
    </div>
  );
}
