import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Copy, Sparkles, Hash, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function HashtagGenerator() {
  const [idea, setIdea] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [copying, setCopying] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateHashtags = async () => {
    if (!idea || loading) return;

    setLoading(true);
    setHashtags([]); // Clear previous results while loading

    try {
      const res = await axios.post(
        'http://localhost:5000/api/hashtags',
        {
          prompt: idea
        }
      );

      console.log(res.data);

      // Convert AI response string into array and clean up trailing punctuation
      const tagsArray = res.data.hashtags
        .split(/\s+/)
        .map(tag => tag.replace(/[.,!]/g, '')) // Cleans commas/periods from AI response
        .filter(tag => tag.startsWith('#'));

      setHashtags(tagsArray);
    } catch (err) {
      console.error("Hashtag generation failed", err);
      alert("Failed to generate hashtags. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (hashtags.length === 0) return;
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
              placeholder="Describe your reel idea (e.g., 'Morning routine for self-growth')"
              className='w-full bg-[#0f111a] border border-slate-800 p-6 rounded-2xl text-lg focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-slate-600'
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateHashtags()}
              disabled={loading}
            />
            <button 
              onClick={generateHashtags}
              disabled={loading || !idea}
              className={`absolute right-4 top-4 bottom-4 px-6 rounded-xl flex items-center gap-2 font-bold transition-all transform active:scale-95 ${
                loading 
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                  : 'bg-violet-600 hover:bg-violet-500 text-white'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate
                </>
              )}
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

          {/* Empty State / Loading State Hint */}
          {!loading && hashtags.length === 0 && (
            <div className='text-center py-20 border-2 border-dashed border-slate-800 rounded-[2.5rem]'>
              <p className='text-slate-500 font-medium'>Type an idea above to see the magic happen.</p>
            </div>
          )}

          {loading && hashtags.length === 0 && (
            <div className='text-center py-20 border-2 border-dashed border-violet-900/30 bg-violet-950/5 rounded-[2.5rem] animate-pulse'>
              <p className='text-violet-400 font-medium'>AURA is analyzing your idea...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}