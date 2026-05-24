'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CalendarPicker({ selectedDate, onSelect, availableDays = [1,2,3,4,5,6] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
  }

  const today = new Date();
  today.setHours(0,0,0,0);

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
    const dayOfWeek = date.getDay(); // 0 is Sunday
    
    // Simple mock logic: block Sundays (0) if not in availableDays, block past dates
    const isPast = date < today;
    const isAvailable = !isPast && availableDays.includes(dayOfWeek);
    
    const isSelected = selectedDate && 
                       selectedDate.getDate() === d && 
                       selectedDate.getMonth() === currentMonth.getMonth() &&
                       selectedDate.getFullYear() === currentMonth.getFullYear();

    days.push(
      <button
        key={d}
        disabled={!isAvailable}
        onClick={() => onSelect(date)}
        className={cn(
          "w-10 h-10 flex items-center justify-center font-poppins text-sm rounded-full transition-colors",
          !isAvailable && "text-grey/30 cursor-not-allowed",
          isAvailable && !isSelected && "text-ivory hover:bg-white/10",
          isSelected && "bg-gold text-black font-semibold shadow-[0_0_15px_rgba(201,168,76,0.4)]"
        )}
      >
        {d}
      </button>
    );
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="bg-[#111] p-6 border border-white/10 max-w-sm w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePrevMonth} className="text-ivory hover:text-gold p-1">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-cormorant text-xl text-gold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button onClick={handleNextMonth} className="text-ivory hover:text-gold p-1">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-2 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <span key={day} className="font-montserrat text-[10px] text-grey uppercase">{day}</span>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2 place-items-center">
        {days}
      </div>
    </div>
  );
}
