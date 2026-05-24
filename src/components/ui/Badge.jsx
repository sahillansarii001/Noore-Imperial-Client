import { cn } from "@/lib/utils";

export default function Badge({ children, variant = 'gold', className }) {
  const variants = {
    gold: "bg-gold/10 text-gold border border-gold/20 backdrop-blur-sm",
    black: "bg-black/40 text-ivory border border-white/10 backdrop-blur-sm",
    red: "bg-red-900/20 text-red-400 border border-red-900/30 backdrop-blur-sm",
    green: "bg-green-900/20 text-green-400 border border-green-900/30 backdrop-blur-sm",
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-sm text-[9px] font-montserrat uppercase tracking-[0.2em] font-medium",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
