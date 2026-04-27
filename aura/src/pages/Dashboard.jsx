import Sidebar from '../components/Sidebar';
import { 
  LineChart, Line, CartesianGrid, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Sparkles, TrendingUp, Users, Target, Layout } from 'lucide-react';

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
    <div className='flex min-h-screen bg-[#050508] text-white'>
      <Sidebar />

      <main className='flex-1 p-10 max-w-7xl mx-auto'>
        <header className='mb-10'>
          <h1 className='text-5xl font-black tracking-tight bg-linear-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent'>
            Creator Dashboard
          </h1>
          <p className='text-slate-400 mt-2'>Welcome back, Ayush. Here’s your performance overview.</p>
        </header>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
          <StatCard title='Engagement' value='92%' icon={<TrendingUp size={20}/>} color="text-emerald-400" />
          <StatCard title='Followers' value='18.2K' icon={<Users size={20}/>} color="text-violet-400" />
          <StatCard title='Reach' value='144K' icon={<Target size={20}/>} color="text-blue-400" />
          <StatCard title='Posts' value='245' icon={<Layout size={20}/>} color="text-pink-400" />
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
          
          {/* Chart Section - Takes up 2 columns */}
          <div className='lg:col-span-2 bg-[#0f111a] border border-slate-800 rounded-4xl p-8'>
            <h2 className='text-2xl font-bold mb-8 flex items-center gap-2'>
              Growth Analytics <span className='text-xs font-normal text-slate-500 uppercase tracking-widest'>(Views)</span>
            </h2>
            <div className='h-75 w-full'>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f111a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#8b5cf6' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Ideas Section */}
          <div className='bg-[#0f111a] border border-slate-800 rounded-[2.5rem] p-8'>
            <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
              <Sparkles className='text-violet-400' size={24} /> AI Content Ideas
            </h2>
            <div className='space-y-4'>
              <div className='relative'>
                <input
                  placeholder='Enter niche...'
                  className='w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 focus:outline-none focus:border-violet-500 transition-all text-sm'
                />
              </div>
              <button className='w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95'>
                Generate Ideas
              </button>

              <div className='mt-8 space-y-3'>
                {['10 Viral Reel Ideas', 'Story Hook Templates', 'Carousel Concepts'].map((idea, i) => (
                  <div key={i} className='group flex items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer'>
                    <span className='text-sm text-slate-300 group-hover:text-white transition-colors'>{idea}</span>
                    <Sparkles size={14} className='text-slate-600 group-hover:text-violet-400' />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// Reusable Internal StatCard Component if not already defined
function StatCard({ title, value, icon, color }) {
  return (
    <div className='bg-[#0f111a] border border-slate-800 p-6 rounded-4xl hover:border-slate-700 transition-all'>
      <div className={`mb-4 ${color}`}>{icon}</div>
      <p className='text-slate-500 text-sm font-medium uppercase tracking-wider'>{title}</p>
      <h3 className='text-3xl font-bold mt-1'>{value}</h3>
    </div>
  );
}