import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Loader2, Zap, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Trending() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/trending');
        
        const dataWithColors = res.data.map(trend => ({
          ...trend,
          color: trend.platform.toLowerCase() === 'instagram' ? 'text-pink-500' :
                 trend.platform.toLowerCase() === 'linkedin' ? 'text-blue-400' :
                 trend.platform.toLowerCase() === 'youtube' ? 'text-red-500' : 'text-violet-400'
        }));
        
        setTrends(dataWithColors);
      } catch (err) {
        console.error("Failed to fetch trends", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className='flex min-h-screen bg-[#050508] text-white'>
      <Sidebar />

      <main className='flex-1 p-10 max-w-7xl mx-auto'>
        <header className='mb-12'>
          <h1 className='text-5xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent'>
            Trending Feed
          </h1>
          <p className='text-slate-400 mt-2 text-lg'>AI-analyzed content hooks for today.</p>
        </header>

        {loading ? (
          /* --- ANALYZING STATE --- */
          <div className='flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-800 rounded-[3rem] bg-[#0f111a]/30'>
            <div className='relative mb-6'>
              <div className='absolute inset-0 bg-violet-500/20 blur-xl rounded-full animate-pulse'></div>
              <Loader2 className='animate-spin text-violet-500 relative z-10' size={64} />
            </div>
            <h2 className='text-2xl font-bold tracking-tight text-white mb-2'>AURA is Analyzing</h2>
            <p className='text-slate-500 text-center max-w-xs'>
              Scanning global social platforms for high-velocity content trends...
            </p>
            <div className='mt-8 flex gap-2'>
               <span className='h-2 w-2 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.3s]'></span>
               <span className='h-2 w-2 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.15s]'></span>
               <span className='h-2 w-2 bg-violet-500 rounded-full animate-bounce'></span>
            </div>
          </div>
        ) : (
          /* --- LOADED STATE --- */
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700'>
            {trends.map((trend, index) => (
              <div
                key={index}
                className='group relative bg-[#0f111a] border border-slate-800 p-8 rounded-[2.5rem] hover:border-violet-500/50 transition-all duration-300 hover:shadow-[0_0_40px_-15px_rgba(139,92,246,0.4)]'
              >
                <div className='flex justify-between items-start mb-6'>
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 ${trend.color}`}>
                    {trend.platform}
                  </span>
                  <div className='text-right'>
                    <span className='block text-3xl font-black text-violet-400'>{trend.score}</span>
                    <span className='text-[10px] uppercase text-slate-500 font-bold tracking-tighter'>Trend Score</span>
                  </div>
                </div>

                <h2 className='text-2xl font-bold leading-tight mb-8 group-hover:text-violet-200 transition-colors'>
                  {trend.name}
                </h2>

                <button 
  onClick={() => navigate('/ideas', { state: { trendName: trend.name } })}
  className='w-full bg-white text-black ...'
>
  Use Trend
</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
