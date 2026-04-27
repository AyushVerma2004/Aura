import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Sparkles, Copy, Type, Wand2, Check } from 'lucide-react';

export default function CaptionGenerator() {
  const [prompt, setPrompt] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTone, setSelectedTone] = useState('Professional');

  const tones = ['Professional', 'Funny', 'Aesthetic', 'Savage', 'Minimalist'];

  const generateCaption = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      // Added selectedTone to the request so your backend can adjust the AI output
      const res = await axios.post('http://localhost:5000/api/caption', { 
        prompt, 
        tone: selectedTone 
      });
      setCaption(res.data.caption);
    } catch (err) {
      console.error("Generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='flex min-h-screen bg-[#050508] text-white'>
      <Sidebar />
      
      <main className='flex-1 p-10 max-w-5xl mx-auto'>
        <header className='mb-10'>
          <h1 className='text-5xl font-black tracking-tight bg-linear-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent'>
            AI Caption Generator
          </h1>
          <p className='text-slate-400 mt-2'>Craft the perfect hook for your next viral post.</p>
        </header>

        <div className='grid gap-8'>
          {/* Input Area */}
          <div className='bg-[#0f111a] border border-slate-800 p-8 rounded-[2.5rem]'>
            <label className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-4'>
              <Type size={14} /> Describe your post
            </label>
            <textarea
              className='w-full bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-lg focus:outline-none focus:border-violet-500 transition-all placeholder:text-slate-700 min-h-37.5 resize-none'
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. A cinematic shot of a Porsche in the rain at night..."
            />
            
            <div className='mt-6 flex flex-wrap items-center justify-between gap-4'>
              <div className='flex gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800'>
                {tones.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      selectedTone === tone 
                      ? 'bg-violet-600 text-white shadow-lg' 
                      : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>

              <button
                onClick={generateCaption}
                disabled={loading}
                className='bg-white text-black hover:bg-violet-600 hover:text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50'
              >
                {loading ? 'Generating...' : <><Wand2 size={18} /> Generate Caption</>}
              </button>
            </div>
          </div>

          {/* Output Area */}
          {caption && (
            <div className='bg-[#0f111a] border border-violet-500/30 p-8 rounded-[2.5rem] relative group animate-in fade-in slide-in-from-bottom-4 duration-500'>
              <div className='flex justify-between items-center mb-6'>
                <span className='flex items-center gap-2 text-violet-400 font-bold uppercase tracking-widest text-xs'>
                  <Sparkles size={14} /> Your AI Result
                </span>
                <button 
                  onClick={copyToClipboard}
                  className='p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors text-slate-300'
                >
                  {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
                </button>
              </div>
              
              <p className='text-xl leading-relaxed text-slate-200 whitespace-pre-wrap'>
                {caption}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}