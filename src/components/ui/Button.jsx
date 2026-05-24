import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  className, 
  disabled, 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-montserrat uppercase tracking-[0.14em] transition-all duration-350 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden group";
  
  const variants = {
    primary: "bg-ivory text-black border border-ivory hover:bg-transparent hover:text-ivory hover:border-ivory/60",
    secondary: "bg-transparent text-ivory border border-white/20 hover:border-gold/50 hover:text-gold",
    gold: "bg-gold text-black border border-gold hover:bg-gold-dark hover:border-gold-dark",
    ghost: "bg-transparent text-grey hover:text-ivory border border-transparent hover:border-white/10",
    outline: "bg-transparent text-gold border border-gold/40 hover:bg-gold hover:text-black hover:border-gold",
    dark: "bg-white/[0.04] text-ivory border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/15",
  };

  const sizes = {
    xs: "px-4 py-2 text-[9px]",
    sm: "px-6 py-2.5 text-[10px]",
    md: "px-8 py-3.5 text-[10px]",
    lg: "px-10 py-4 text-[11px]",
    xl: "px-12 py-5 text-xs",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 bg-white/4 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none" />
      
      {isLoading && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin relative z-10" />}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
}
