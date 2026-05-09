import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Lightbulb, Sparkles, Video, BookOpen, Layers, Plus, Loader2 } from 'lucide-react';

export default function Ideas() {
  const location = useLocation();
  const [niche, setNiche] = useState(location.state?.trendName || '');
  const [selectedType, setSelectedType] = useState('Reels');
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const contentTypes = [
    { name: 'Reels', icon: <Video size={16} /> },
    { name: 'Carousels', icon: <Layers size={16} /> },
    { name: 'Stories', icon: <BookOpen size={16} /> },
  ];

  const generateIdeas = async () => {
    if (!niche) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ideas', {
        niche: niche,
        type: selectedType
      });
      setIdeas(res.data);
    } catch (err) {
      console.error("Failed to fetch ideas", err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate if we came from the Trending page
  useEffect(() => {
    if (location.state?.trendName) {
      generateIdeas();
    }
  }, [location.state]);

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

        <div className='bg-[#0f111a] border border-slate-800 p-8 rounded-[2.5rem] mb-10'>
          <div className='flex flex-col md:flex-row gap-4'>
            <input
              type="text"
              placeholder="What's your niche? (e.g., Morning Routine, Fitness)"
              className='flex-1 bg-slate-900/50 border border-slate-800 p-4 rounded-2xl focus:outline-none focus:border-violet-500 transition-all text-sm'
              value={niche}
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
            <button 
              onClick={generateIdeas}
              disabled={loading}
              className='bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-violet-600 hover:text-white transition-all transform active:scale-95'
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              {loading ? "Analyzing..." : "Generate"}
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {ideas.map((idea, index) => (
            <div key={index} className='group bg-[#0f111a] border border-slate-800 p-8 rounded-[2.5rem] hover:border-violet-500/50 transition-all cursor-pointer relative overflow-hidden animate-in fade-in slide-in-from-bottom-4'>
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

              
            </div>
          ))}

          {/* Placeholder when empty */}
          {!loading && ideas.length === 0 && (
            <div className='col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-[2.5rem]'>
              <p className='text-slate-500 font-medium'>Enter a trend or niche to unlock viral concepts.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}