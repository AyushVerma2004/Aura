import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // Assuming you have a Sidebar
import { Users, UserPlus, Image, Heart, MessageCircle, TrendingUp, Activity } from "lucide-react";

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/instagram/analytics");
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030305] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Syncing Engine...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#030305] flex items-center justify-center text-white font-black italic">
        FAILED TO INITIALIZE DATA STREAM.
      </div>
    );
  }

  return (
    <div className='flex min-h-screen bg-[#030305] text-white font-sans selection:bg-violet-500/30'>
      <Sidebar />

      <main className='flex-1 p-8 max-w-7xl mx-auto'>
        {/* HEADER */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              <Activity size={12} /> Live Pulse Dashboard
            </div>
            <h1 className='text-5xl font-black tracking-tighter uppercase italic'>Analytics</h1>
          </div>
          
          {/* PROFILE SUMMARY CARD */}
          <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-md">
            <img
              src={data.profile.profile_picture_url}
              alt="profile"
              className="w-16 h-16 rounded-2xl border-2 border-violet-500 object-cover shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            />
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">@{data.profile.username}</h2>
              <div className="flex gap-4 mt-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase"><span className="text-white">{data.profile.followers_count}</span> Followers</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase"><span className="text-white">{data.profile.media_count}</span> Posts</div>
              </div>
            </div>
          </div>
        </header>

        {/* CORE STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* ENGAGEMENT CARD */}
          <div className="bg-[#0a0a0f] border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={64} className="text-violet-500" />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Engagement Rate</p>
            <h3 className="text-5xl font-black text-violet-500">{data.engagement.engagementRate}%</h3>
            <div className="flex gap-6 mt-6">
                <div className="flex items-center gap-2 text-sm font-bold"><Heart size={16} className="text-red-500"/> {data.engagement.totalLikes}</div>
                <div className="flex items-center gap-2 text-sm font-bold"><MessageCircle size={16} className="text-blue-500"/> {data.engagement.totalComments}</div>
            </div>
          </div>

          {/* INSIGHTS MAP */}
          {data.insights.slice(0, 2).map((item, index) => (
            <div key={index} className="bg-[#0a0a0f] border border-white/5 p-8 rounded-[2rem]">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{item.name.replace(/_/g, ' ')}</p>
              <h3 className="text-5xl font-black">{item.values?.[0]?.value || 0}</h3>
              <div className="mt-4 h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 w-3/4"></div>
              </div>
            </div>
          ))}
        </div>

        {/* POSTS GRID */}
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-600 mb-6 flex items-center gap-2">
            <Image size={16} /> Recent Media Feed
        </h2>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {data.posts.map(post => (
            <div
              key={post.id}
              className="bg-[#0a0a0f] border border-white/5 rounded-3xl overflow-hidden group hover:border-violet-500/50 transition-all duration-500"
            >
              <div className="relative aspect-square overflow-hidden">
                {post.media_type !== "VIDEO" ? (
                  <img
                    src={post.media_url}
                    alt="post"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-700 font-bold uppercase italic text-xs">Video Content</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex gap-4 text-xs font-bold">
                        <span className="flex items-center gap-1"><Heart size={14} /> {post.like_count}</span>
                        <span className="flex items-center gap-1"><MessageCircle size={14} /> {post.comments_count}</span>
                    </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 italic">
                  {post.caption || "No caption provided."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Analytics;