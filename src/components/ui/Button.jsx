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
  const baseStyles = "inline-flex items-center justify-center font-montserrat uppercase tracking-wider transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-ivory text-black border border-ivory hover:bg-transparent hover:text-ivory",
    secondary: "bg-transparent text-ivory border border-white/20 hover:border-ivory",
    gold: "bg-gold text-black border border-gold hover:bg-transparent hover:text-gold",
    ghost: "bg-transparent text-grey hover:text-ivory",
  };

  const sizes = {
    sm: "px-6 py-2.5 text-[10px]",
    md: "px-8 py-3.5 text-xs",
    lg: "px-10 py-4 text-sm",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
