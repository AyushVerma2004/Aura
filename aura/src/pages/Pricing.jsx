import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Check, Zap, Star, ShieldCheck, Rocket } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '0',
      desc: 'Perfect for new creators finding their voice.',
      features: ['10 AI Captions / mo', 'Basic Trending Feed', '5 Hashtag Generations', 'Community Support'],
      buttonText: 'Get Started',
      highlight: false
    },
    {
      name: 'Pro',
      price: '29',
      desc: 'The complete toolkit for serious growth.',
      features: ['Unlimited AI Captions', 'Real-time Viral Alerts', 'Advanced Analytics', 'Unlimited Hashtags', 'Priority AI Processing'],
      buttonText: 'Go Pro Now',
      highlight: true,
      icon: <Star className="text-yellow-400" size={20} />
    },
    {
      name: 'Agency',
      price: '99',
      desc: 'Scale your content team with ease.',
      features: ['Manage 5+ Accounts', 'Team Collaboration', 'Custom Brand Voices', 'API Access', '24/7 Dedicated Manager'],
      buttonText: 'Contact Sales',
      highlight: false
    }
  ];

  return (
    <div className='flex min-h-screen bg-[#050508] text-white'>
      <Sidebar />

      <main className='flex-1 p-10 max-w-7xl mx-auto'>
        <header className='text-center mb-16'>
          <h1 className='text-5xl font-black tracking-tight bg-linear-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent mb-4'>
            Simple, Transparent Pricing
          </h1>
          <p className='text-slate-400 text-lg'>Invest in your digital aura. No hidden fees.</p>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative flex flex-col p-10 rounded-[3rem] border transition-all duration-300 ${
                plan.highlight 
                ? 'bg-[#0f111a] border-violet-500 shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)] scale-105 z-10' 
                : 'bg-[#0f111a]/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.highlight && (
                <div className='absolute -top-5 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-2'>
                  <Zap size={12} fill="currentColor" /> Most Popular
                </div>
              )}

              <div className='mb-8'>
                <div className='flex items-center gap-2 mb-2'>
                  <h2 className='text-2xl font-bold'>{plan.name}</h2>
                  {plan.icon}
                </div>
                <p className='text-slate-400 text-sm leading-relaxed'>{plan.desc}</p>
              </div>

              <div className='mb-8 flex items-baseline gap-1'>
                <span className='text-5xl font-black'>${plan.price}</span>
                <span className='text-slate-500 text-sm'>/month</span>
              </div>

              <div className='space-y-4 mb-10 flex-1'>
                {plan.features.map((feature, i) => (
                  <div key={i} className='flex items-center gap-3 text-sm text-slate-300'>
                    <div className={`p-1 rounded-full ${plan.highlight ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-800 text-slate-500'}`}>
                      <Check size={12} strokeWidth={4} />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all transform active:scale-95 ${
                plan.highlight 
                ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg' 
                : 'bg-white text-black hover:bg-slate-200'
              }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <footer className='mt-20 text-center'>
          <div className='inline-flex items-center gap-8 px-10 py-6 bg-slate-900/30 border border-slate-800 rounded-full'>
            <div className='flex items-center gap-2 text-xs font-bold text-slate-500'>
              <ShieldCheck size={16} className='text-violet-500' /> Secure Payments
            </div>
            <div className='flex items-center gap-2 text-xs font-bold text-slate-500'>
              <Rocket size={16} className='text-violet-500' /> Instant Activation
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}