import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Lightbulb, Sparkles, Video, BookOpen, Layers, Plus } from 'lucide-react';

export default function Ideas() {
  const [niche, setNiche] = useState('');
  const [selectedType, setSelectedType] = useState('Reels');

  const contentTypes = [
    { name: 'Reels', icon: <Video size={16} /> },
    { name: 'Carousels', icon: <Layers size={16} /> },
    { name: 'Stories', icon: <BookOpen size={16} /> },
  ];

  const mockIdeas = [
    { title: "Day in the Life of a Dev", description: "Showcase your setup, morning routine, and the 'Aura' of your coding environment.", tag: "Viral" },
    { title: "3 Tools You Need in 2026", description: "Highlight your app along with 2 other productivity tools for a professional aesthetic.", tag: "Educational" },
    { title: "The Reality of Full-Stack", description: "A comedic take on CSS vs Backend logic struggles.", tag: "Relatable" },
  ];

  return (
    <div className='flex min-h-screen bg-[#050508] text-white'>
      <Sidebar />

      <main className='flex-1 p-10 max-w-6xl mx-auto'>
        <header className='mb-12'>
          <h1 className='text-5xl font-black tracking-tight bg-linear-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent'>
            Content Ideas
          </h1>
          <p className='text-slate-400 mt-2 text-lg'>AI-driven concepts tailored to your niche.</p>
        </header>

        {/* Search & Filter Section */}
        <div className='bg-[#0f111a] border border-slate-800 p-8 rounded-[2.5rem] mb-10'>
          <div className='flex flex-col md:flex-row gap-4'>
            <input
              type="text"
              placeholder="What's your niche? (e.g., Software Engineering, Fitness)"
              className='flex-1 bg-slate-900/50 border border-slate-800 p-4 rounded-2xl focus:outline-none focus:border-violet-500 transition-all text-sm'
              onChange={(e) => setNiche(e.target.value)}
            />
            <div className='flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800'>
              {contentTypes.map((type) => (
                <button
                  key={type.name}
                  onClick={() => setSelectedType(type.name)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedType === type.name 
                    ? 'bg-violet-600 text-white' 
                    : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {type.icon} {type.name}
                </button>
              ))}
            </div>
            <button className='bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-violet-600 hover:text-white transition-all transform active:scale-95'>
              <Sparkles size={18} /> Generate
            </button>
          </div>
        </div>

        {/* Ideas Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {mockIdeas.map((idea, index) => (
            <div key={index} className='group bg-[#0f111a] border border-slate-800 p-8 rounded-[2.5rem] hover:border-violet-500/50 transition-all cursor-pointer relative overflow-hidden'>
              <div className='absolute top-0 right-0 p-4'>
                <span className='text-[10px] font-black uppercase tracking-widest bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full'>
                  {idea.tag}
                </span>
              </div>
              
              <div className='mb-6 text-violet-400'>
                <Lightbulb size={28} />
              </div>
              
              <h2 className='text-xl font-bold mb-3 group-hover:text-violet-200 transition-colors'>{idea.title}</h2>
              <p className='text-slate-400 text-sm leading-relaxed mb-8'>
                {idea.description}
              </p>

              <button className='w-full flex items-center justify-center gap-2 py-3 bg-slate-900 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all'>
                <Plus size={14} /> Add to Planner
              </button>
            </div>
          ))}

          {/* Create New Concept Placeholder */}
          <div className='border-2 border-dashed border-slate-800 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center group hover:border-violet-500/30 transition-all cursor-pointer'>
            <div className='w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mb-4 text-slate-500 group-hover:text-violet-400 transition-colors'>
              <Plus size={24} />
            </div>
            <p className='text-sm font-bold text-slate-500'>Custom Concept</p>
          </div>
        </div>
      </main>
    </div>
  );
}