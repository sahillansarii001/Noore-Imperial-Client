'use client';
import Link from 'next/link';
import { Clock, Users, BookOpen } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function CourseCard({ course }) {
  return (
    <div className="bg-[#111] border border-white/5 group hover:border-gold/30 transition-colors duration-300 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.thumbnail || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1974&auto=format&fit=crop"} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-gold/30 px-3 py-1 font-montserrat text-[10px] text-gold uppercase tracking-widest">
          {course.level || 'Beginner'}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-cormorant text-2xl text-ivory mb-2 group-hover:text-gold transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="font-poppins text-sm text-grey mb-6 line-clamp-2">
          {course.description || "Master the art of fashion design with our comprehensive curriculum led by industry experts."}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-6 pt-4 border-t border-white/10 mt-auto">
          <div className="flex flex-col items-center text-center gap-1">
            <Clock className="w-4 h-4 text-gold" />
            <span className="font-montserrat text-[10px] text-grey uppercase tracking-widest">{course.duration_weeks || 12} Wks</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1 border-x border-white/10">
            <BookOpen className="w-4 h-4 text-gold" />
            <span className="font-montserrat text-[10px] text-grey uppercase tracking-widest">{course.modules_count || 8} Mods</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <Users className="w-4 h-4 text-gold" />
            <span className="font-montserrat text-[10px] text-grey uppercase tracking-widest">Online</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-poppins text-lg text-ivory">{formatPrice(course.price)}</span>
          <Link href={`/academy/${course.slug || course.id}`}>
            <span className="font-montserrat text-xs text-gold uppercase tracking-widest hover:underline">View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
