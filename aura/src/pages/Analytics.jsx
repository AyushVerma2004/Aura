import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { BarChart3, Users, Play, Heart, Share2, Calendar } from 'lucide-react';

// Mock Data - In a real app, this comes from your backend/Firebase
const barData = [
  { name: 'Week 1', reach: 45000, engagement: 2400 },
  { name: 'Week 2', reach: 52000, engagement: 3100 },
  { name: 'Week 3', reach: 48000, engagement: 2800 },
  { name: 'Week 4', reach: 61000, engagement: 4200 },
];

const pieData = [
  { name: 'Instagram', value: 45 },
  { name: 'TikTok', value: 35 },
  { name: 'YouTube', value: 20 },
];

const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6'];

export default function Analytics() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a fetch call
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex min-h-screen bg-[#050508] text-white'>
      <Sidebar />

      <main className='flex-1 p-10 max-w-7xl mx-auto'>
        <header className='mb-10 flex justify-between items-end'>
          <div>
            <h1 className='text-5xl font-black tracking-tight bg-linear-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent'>
              Advanced Analytics
            </h1>
            <p className='text-slate-400 mt-2 text-lg'>Deep dive into your content performance.</p>
          </div>
          <button className='flex items-center gap-2 bg-slate-900 border border-slate-800 px-6 py-3 rounded-xl hover:bg-slate-800 transition-all text-sm font-bold'>
            <Calendar size={18} /> Last 30 Days
          </button>
        </header>

        {/* Top Metric Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
          <AnalyticsCard title="Avg. Watch Time" value="14.2s" change="+12%" icon={<Play size={20} />} />
          <AnalyticsCard title="Saves" value="1,402" change="+5.4%" icon={<Heart size={20} />} />
          <AnalyticsCard title="Shares" value="892" change="+22%" icon={<Share2 size={20} />} />
        </div>

        <div className='grid lg:grid-cols-2 gap-8'>
          {/* Bar Chart Section */}
          <div className='bg-[#0f111a] border border-slate-800 rounded-[2.5rem] p-8'>
            <h2 className='text-2xl font-bold mb-8 flex items-center gap-2'>
              <BarChart3 className='text-violet-500' size={24} /> Reach vs Engagement
            </h2>
            <div className='h-87.5'>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#1e293b', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: '#0f111a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  />
                  <Bar dataKey="reach" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={40} />
                  <Bar dataKey="engagement" fill="#ec4899" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className='bg-[#0f111a] border border-slate-800 rounded-[2.5rem] p-8 flex flex-col'>
            <h2 className='text-2xl font-bold mb-8'>Traffic Distribution</h2>
            <div className='h-75 flex-1'>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f111a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className='mt-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-800 text-center'>
              <p className='text-sm text-slate-400'>Instagram is your leading source of growth this month.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AnalyticsCard({ title, value, change, icon }) {
  return (
    <div className='bg-[#0f111a] border border-slate-800 p-8 rounded-4xl relative overflow-hidden group'>
      <div className='flex justify-between items-start relative z-10'>
        <div>
          <p className='text-slate-500 text-xs font-bold uppercase tracking-widest mb-1'>{title}</p>
          <h3 className='text-4xl font-black mb-2'>{value}</h3>
          <span className='text-emerald-400 text-sm font-bold bg-emerald-500/10 px-2 py-1 rounded-lg'>
            {change}
          </span>
        </div>
        <div className='p-4 bg-slate-800/50 rounded-2xl text-violet-400 group-hover:scale-110 transition-transform'>
          {icon}
        </div>
      </div>
      {/* Decorative gradient blob */}
      <div className='absolute -right-4 -bottom-4 w-24 h-24 bg-violet-600/5 blur-3xl rounded-full'></div>
    </div>
  );
}