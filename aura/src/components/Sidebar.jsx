import { Link, useLocation } from 'react-router-dom'; // Import these
import {
  LayoutDashboard,
  Flame,
  Lightbulb,
  PenSquare,
  Hash,
  BarChart3
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation(); // This helps us see which page we are on

  const links = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Trending', icon: <Flame size={20} />, path: '/trending' },
    { name: 'Ideas', icon: <Lightbulb size={20} />, path: '/ideas' },
    { name: 'Captions', icon: <PenSquare size={20} />, path: '/captions' },
    { name: 'Hashtags', icon: <Hash size={20} />, path: '/hashtags' },
    { name: 'Analytics', icon: <BarChart3 size={20} />, path: '/analytics' }
  ];

  return (
    <div className='w-72 min-h-screen bg-[#050508] p-8 border-r border-slate-900'>
        <Link to='/'>
      <button>
        <h1 className='text-3xl font-black mb-10 tracking-tighter text-white'>AURA</h1>
      </button>
      </Link>
      
      <nav className='space-y-2'>
        {links.map((item, index) => {
          // Check if this link is the "active" one
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group ${
                isActive 
                ? 'bg-violet-600 text-white shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)]' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-violet-400'}`}>
                {item.icon}
              </span>
              <span className='font-medium'>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}