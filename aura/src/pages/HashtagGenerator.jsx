import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Copy, Sparkles, Hash } from 'lucide-react';

export default function HashtagGenerator() {
  const [idea, setIdea] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [copying, setCopying] = useState(false);

  // Mock logic: In a real app, you could send 'idea' to an AI API
  const generateHashtags = () => {
    if (!idea) return;
    
    const baseTags = ['viral', 'foryou', 'trending', 'reels', 'explore'];
    const topicTags = idea.toLowerCase().split(' ').filter(word => word.length > 3);
    
    // Combine base tags with words from the idea + some random growth tags
    const generated = [...new Set([...topicTags, ...baseTags, 'growth', 'aura', 'contentcreator'])]
      .sort(() => 0.5 - Math.random())
      .slice(0, 15)
      .map(tag => `#${tag}`);

    setHashtags(generated);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  return (
    <div className='flex min-h-screen bg-[#050508] text-white'>
      <Sidebar />
      
      <main className='flex-1 p-10 max-w-5xl mx-auto'>
        <header className='mb-10'>
          <h1 className='text-5xl font-black tracking-tight bg-linear-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent'>
            Hashtag Generator
          </h1>
          <p className='text-slate-400 mt-2'>Transform your reel idea into viral reach.</p>
        </header>

        <div className='space-y-8'>
          {/* Input Section */}
          <div className='relative'>
            <input
              type="text"
              placeholder="Describe your reel idea (e.g., 'Morning routine for developers')"
              className='w-full bg-[#0f111a] border border-slate-800 p-6 rounded-2xl text-lg focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-slate-600'
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateHashtags()}
            />
            <button 
              onClick={generateHashtags}
              className='absolute right-4 top-4 bottom-4 bg-violet-600 hover:bg-violet-500 px-6 rounded-xl flex items-center gap-2 font-bold transition-all transform active:scale-95'
            >
              <Sparkles size={18} />
              Generate
            </button>
          </div>

          {/* Results Section */}
          {hashtags.length > 0 && (
            <div className='bg-[#0f111a] border border-slate-800 rounded-[2.5rem] p-10 animate-in fade-in slide-in-from-bottom-4 duration-500'>
              <div className='flex justify-between items-center mb-6'>
                <div className='flex items-center gap-2 text-violet-400 font-bold uppercase tracking-widest text-xs'>
                  <Hash size={14} />
                  Optimized Tags
                </div>
                <button 
                  onClick={copyToClipboard}
                  className='flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-slate-800/50 px-4 py-2 rounded-lg'
                >
                  <Copy size={16} />
                  {copying ? 'Copied!' : 'Copy All'}
                </button>
              </div>

              <div className='flex flex-wrap gap-3'>
                {hashtags.map((tag, i) => (
                  <span 
                    key={i} 
                    className='bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-slate-200 font-medium hover:border-violet-500 transition-colors cursor-default'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Empty State / Hint */}
          {hashtags.length === 0 && (
            <div className='text-center py-20 border-2 border-dashed border-slate-800 rounded-[2.5rem]'>
              <p className='text-slate-500 font-medium'>Type an idea above to see the magic happen.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}