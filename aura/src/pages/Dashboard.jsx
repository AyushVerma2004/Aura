import Sidebar from '../components/Sidebar';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { TrendingUp, Users, Target, Layout, ArrowUpRight } from 'lucide-react';

const data = [
  { name: 'Mon', views: 4000 },
  { name: 'Tue', views: 6000 },
  { name: 'Wed', views: 8500 },
  { name: 'Thu', views: 7200 },
  { name: 'Fri', views: 12000 },
  { name: 'Sat', views: 15000 },
  { name: 'Sun', views: 14000 },
];

export default function Dashboard() {
  return (
    <div className='flex min-h-screen bg-[#030305] text-white font-sans'>
      <Sidebar />

      <main className='flex-1 p-8 md:p-12 max-w-7xl mx-auto w-full'>
        {/* Minimal Header */}
        <header className='mb-12 flex justify-between items-end'>
          <div>
            <h1 className='text-4xl font-black tracking-tighter uppercase italic bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent'>
              Performance
            </h1>
            
          </div>
          <div className='text-right hidden sm:block'>
            <p className='text-[10px] font-bold text-slate-600 uppercase tracking-widest'>System Status</p>
            <p className='text-emerald-500 text-xs font-bold flex items-center gap-2 justify-end'>
              <span className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></span> Operational
            </p>
          </div>
        </header>

        {/* High-Density Stats Grid */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <StatCard title='Avg Engagement' value='92.4%' change='+2.1%' icon={<TrendingUp size={16}/>} />
          <StatCard title='Net Followers' value='18,240' change='+142' icon={<Users size={16}/>} />
          <StatCard title='Total Reach' value='144.2K' change='+12%' icon={<Target size={16}/>} />
          <StatCard title='Media Count' value='245' change='0' icon={<Layout size={16}/>} />
        </div>

        {/* Large Analytics View */}
        <div className='bg-[#0a0a0f] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden'>
          <div className='flex items-center justify-between mb-10'>
             <div>
                <h2 className='text-xl font-bold tracking-tight'>Growth Vector</h2>
                <p className='text-slate-500 text-xs uppercase tracking-widest mt-1'>Weekly Impressions Stream</p>
             </div>
             <button className='text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-white/10 px-4 py-2 rounded-xl'>
                Export Data <ArrowUpRight size={14} />
             </button>
          </div>

          <div className='h-96 w-full'>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#475569" 
                  fontSize={10} 
                  fontWeight="bold"
                  tickLine={false} 
                  axisLine={false} 
                  dy={15}
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  fontWeight="bold"
                  tickLine={false} 
                  axisLine={false} 
                  dx={-10}
                />
                <Tooltip 
                  cursor={{ stroke: '#8b5cf6', strokeWidth: 1 }}
                  contentStyle={{ 
                    backgroundColor: '#0a0a0f', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#8b5cf6" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, change, icon }) {
  return (
    <div className='bg-[#0a0a0f] border border-white/5 p-6 rounded-[1.5rem] hover:border-violet-500/30 transition-all group'>
      <div className='flex justify-between items-start mb-4'>
        <div className='p-2 bg-white/5 rounded-lg text-slate-400 group-hover:text-violet-400 transition-colors'>
          {icon}
        </div>
        <span className={`text-[10px] font-black ${change.includes('+') ? 'text-emerald-500' : 'text-slate-600'}`}>
          {change}
        </span>
      </div>
      <p className='text-slate-500 text-[10px] font-bold uppercase tracking-widest'>{title}</p>
      <h3 className='text-2xl font-black mt-1 tracking-tighter'>{value}</h3>
    </div>
  );
}