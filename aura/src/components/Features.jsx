import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  Flame, 
  Lightbulb, 
  PenSquare, 
  Hash, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  Cpu 
} from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      name: 'Trending Feed',
      desc: 'Real-time viral hooks and topics across Instagram, LinkedIn, and YouTube.',
      icon: <Flame size={32} />,
      path: '/trending',
      color: 'from-orange-500 to-red-500',
      size: 'md:col-span-2'
    },
    {
      name: 'Hashtag Generator',
      desc: 'AI-powered niche hashtags to boost reach.',
      icon: <Hash size={32} />,
      path: '/hashtags',
      color: 'from-blue-500 to-cyan-500',
      size: 'md:col-span-1'
    },
    {
      name: 'AI Captions',
      desc: 'Generate high-conversion captions in seconds.',
      icon: <PenSquare size={32} />,
      path: '/captions',
      color: 'from-violet-500 to-purple-500',
      size: 'md:col-span-1'
    },
    {
      name: 'Smart Ideas',
      desc: 'Personalized content concepts based on your niche.',
      icon: <Lightbulb size={32} />,
      path: '/ideas',
      color: 'from-yellow-500 to-orange-400',
      size: 'md:col-span-2'
    },
    {
      name: 'Advanced Analytics',
      desc: 'Track your growth with deep-dive data visualization.',
      icon: <BarChart3 size={32} />,
      path: '/analytics',
      color: 'from-emerald-500 to-teal-500',
      size: 'md:col-span-3'
    }
  ];

  return (
    <div className='flex min-h-screen bg-[#050508] text-white'>
      <Sidebar />

      <main className='flex-1 p-10 max-w-7xl mx-auto'>
        <header className='mb-12'>
          <div className='inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full text-slate-400 text-xs font-bold uppercase tracking-widest mb-4'>
            <Cpu size={14} className='text-violet-500' /> Core Modules
          </div>
          <h1 className='text-5xl font-black tracking-tight bg-linear-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent'>
            Platform Features
          </h1>
          <p className='text-slate-400 mt-2 text-lg'>Everything you need to engineer viral content.</p>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {featureList.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.path}
              className={`${feature.size} group relative bg-[#0f111a] border border-slate-800 p-8 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-violet-500/50 hover:-translate-y-1`}
            >
              {/* Subtle Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className='relative z-10'>
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                
                <h2 className='text-2xl font-bold mb-3 group-hover:text-violet-200 transition-colors'>
                  {feature.name}
                </h2>
                <p className='text-slate-400 leading-relaxed max-w-xs'>
                  {feature.desc}
                </p>

                <div className='mt-8 flex items-center gap-2 text-sm font-bold text-violet-400 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2.5 group-hover:translate-x-0'>
                  Explore Module <Zap size={14} fill="currentColor" />
                </div>
              </div>

              {/* Decorative Shield Icon in corner */}
              <ShieldCheck className='absolute top-8 right-8 text-slate-800 group-hover:text-violet-500/20 transition-colors' size={40} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}