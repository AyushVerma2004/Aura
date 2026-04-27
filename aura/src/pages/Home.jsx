import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Code2, Terminal, Zap, Fingerprint } from "lucide-react";

export default function Home() {
  return (
    <div className='bg-[#050508] text-white min-h-screen selection:bg-violet-500/30 overflow-x-hidden'>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-violet-600/10 blur-[120px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className='flex justify-between items-center p-8 max-w-7xl mx-auto relative z-50'>
        <div className="flex items-center gap-2">
           
           <h1 className='text-3xl font-black tracking-tighter'>AURA</h1>
        </div>
        
        <div className='hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400'>
          <Link to='/features' className="hover:text-white transition-colors">Features</Link>
          <Link to='/pricing' className="hover:text-white transition-colors">Pricing</Link>
          <div className="h-4 w-px bg-slate-800"></div>
          <Link to='/login' className="hover:text-white transition-colors">Login</Link>
          <Link to='/signup'>
            <button className='bg-white text-black px-6 py-2.5 rounded-xl font-bold hover:bg-violet-600 hover:text-white transition-all transform active:scale-95'>
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='max-w-7xl mx-auto px-10 pt-20 pb-32 relative z-10 text-center lg:text-left grid lg:grid-cols-2 gap-20 items-center'>
        <div>
          
          <h1 className='text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-8'>
            Your Growth <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-purple-400 to-indigo-500">
              Our Support.
            </span>
          </h1>

          <p className='text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-12'>
            Aura is a creator-focused platform that powers content creation, supports growth, and turns inspiration into high-impact social content.
          </p>

          <div className='flex flex-col sm:flex-row gap-5 justify-center lg:justify-start'>
            <Link to='/signup'>
              <button className='w-full sm:w-auto bg-violet-600 hover:bg-violet-700 px-10 py-5 rounded-2xl font-bold text-lg shadow-lg shadow-violet-900/20 transition-all flex items-center justify-center gap-2 group'>
                Start Building <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to='/trending'>
              <button className='w-full sm:w-auto bg-slate-900/50 border border-slate-800 hover:bg-slate-800 px-10 py-5 rounded-2xl font-bold text-lg transition-all'>
                What's Trending?
              </button>
            </Link>
          </div>
        </div>

        {/* Feature Preview - Terminal Style */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-violet-600 to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-[#0a0a0f] border border-slate-800 rounded-[2.5rem] p-2 shadow-2xl overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-900">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              </div>
              <div className="mx-auto text-[10px] font-mono text-slate-600 tracking-widest uppercase">Aura:Creator's One-Stop Shop</div>
            </div>

            {/* Terminal Body */}
            <div className="p-8 font-mono text-sm space-y-4">
              <div className="flex gap-3">
                <span className="text-violet-500">➜</span>
                <span className="text-slate-300">aura generate Trending Ideas</span>
              </div>
              <div className="text-slate-500 pl-6 animate-pulse italic">Searching trending topics...</div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-2">
                
                <p className="text-slate-300">"New Vision for Modern day Content Creation"</p>
                <p className="text-violet-400 text-[11px] mt-2">#viral #trending #onenationonelection </p>
              </div>
              <div className="flex gap-3">
                <span className="text-violet-500">➜</span>
                <span className="text-slate-300 underline underline-offset-4 decoration-violet-500">Ready for Help</span>
              </div>
            </div>
          </div>

          
          
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="max-w-7xl mx-auto px-10 py-20 border-t border-slate-900/50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 opacity-40 hover:opacity-100 transition-opacity">
          <div className="text-xs font-bold tracking-[0.3em] uppercase">Built for the next generation of creators.</div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <span>Next.js 14</span>
            <span>Firebase</span>
            <span>Gemini Pro</span>
            <span>Tailwind 4.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}