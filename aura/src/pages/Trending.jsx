import Sidebar from '../components/Sidebar';

const trends = [
  { name: 'AI Productivity Reels', score: '97%', platform: 'Instagram', color: 'text-pink-500' },
  { name: 'Storytelling Hooks', score: '94%', platform: 'LinkedIn', color: 'text-blue-400' },
  { name: 'Faceless Motivation', score: '91%', platform: 'YouTube', color: 'text-red-500' }
];

export default function Trending() {
  return (
    <div className='flex min-h-screen bg-[#050508] text-white'>
      <Sidebar />

      <main className='flex-1 p-10 max-w-7xl mx-auto'>
        <header className='mb-12'>
          <h1 className='text-5xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent'>
            Trending Feed
          </h1>
          <p className='text-slate-400 mt-2 text-lg'>Top performing content hooks for today.</p>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {trends.map((trend, index) => (
            <div
              key={index}
              className='group relative bg-[#0f111a] border border-slate-800 p-8 rounded-4xl hover:border-violet-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)]'
            >
              <div className='flex justify-between items-start mb-6'>
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-800/50 ${trend.color}`}>
                  {trend.platform}
                </span>
                <div className='text-right'>
                  <span className='block text-3xl font-black text-violet-400'>{trend.score}</span>
                  <span className='text-[10px] uppercase text-slate-500 font-bold'>Trend Score</span>
                </div>
              </div>

              <h2 className='text-2xl font-bold leading-tight mb-8 group-hover:text-violet-200 transition-colors'>
                {trend.name}
              </h2>

              <button className='w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-violet-600 hover:text-white transition-all transform active:scale-95 flex items-center justify-center gap-2'>
                Use Trend
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}