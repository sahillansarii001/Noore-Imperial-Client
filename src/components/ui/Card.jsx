import { cn } from "@/lib/utils";

export default function Card({ children, className, hoverLift = false }) {
  return (
    <div 
      className={cn(
        "bg-[#111] border border-[#222] overflow-hidden transition-all duration-300",
        hoverLift && "hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(201,168,76,0.1)] hover:border-gold/30",
        className
      )}
    >
      {children}
    </div>
  );
}
