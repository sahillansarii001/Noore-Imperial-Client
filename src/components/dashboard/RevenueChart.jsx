'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RevenueChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-[#111] border border-white/5">
        <p className="font-poppins text-grey">No revenue data available.</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black border border-gold p-3 shadow-xl">
          <p className="font-montserrat text-xs text-grey uppercase tracking-widest mb-1">{label}</p>
          <p className="font-poppins text-ivory text-sm">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(payload[0].value / 100)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#111] p-6 border border-white/5 h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-cormorant text-2xl text-ivory">Revenue Overview</h3>
        <select className="bg-transparent border border-white/10 text-xs font-montserrat tracking-widest text-gold uppercase p-2 outline-none">
          <option value="7d" className="bg-black">Last 7 Days</option>
          <option value="30d" className="bg-black">Last 30 Days</option>
          <option value="12m" className="bg-black">Last 12 Months</option>
        </select>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#666" 
              tick={{ fill: '#666', fontSize: 12, fontFamily: 'var(--font-poppins)' }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#666" 
              tick={{ fill: '#666', fontSize: 12, fontFamily: 'var(--font-poppins)' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value / 100000}k`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#C9A84C" 
              strokeWidth={2}
              dot={{ fill: '#C9A84C', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: '#FAF6F0' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
