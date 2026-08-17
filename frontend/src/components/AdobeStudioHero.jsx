import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, Bot, MapPin } from 'lucide-react';

export default function AdobeStudioHero({ onOpenAIRecommend }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('CreatorHub RAG v2.4');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      
      {/* Full-width Studio Background Photo & Video Vibe Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        {/* Dark Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40 z-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left-Aligned Solid Typography (NO GRADIENTS) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-slate-200 shadow-lg backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-[#1473E6]" />
              <span>India Regional Directory • Mumbai, Bengaluru, Delhi & Hyderabad</span>
            </div>

            {/* Main Solid Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              All the best creators, <br />
              <span className="text-[#1473E6]">all in one place.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              Hire and collaborate with top Indian cinematographers, B-roll editors, DaVinci colorists, FPV drone pilots, and podcast sound engineers.
            </p>

            {/* Key Features Bullet */}
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-lg leading-relaxed border-l-2 border-[#1473E6] pl-3 py-1 bg-white/5 rounded-r-lg border border-white/10 backdrop-blur-md">
              End-to-end workflow: Job Posting ➔ RAG AI Matching ➔ Milestones ➔ Deliverable Approval ➔ Automatic Escrow Release.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/search"
                className="px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm rounded-full shadow-xl transition-transform hover:scale-105 inline-flex items-center gap-2"
              >
                <span>Explore Creators (India)</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>

              <button
                onClick={onOpenAIRecommend}
                className="px-6 py-3.5 bg-[#1473E6] hover:bg-[#0D66D0] text-white font-extrabold text-xs rounded-full shadow-lg transition-all inline-flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-white" />
                <span>RAG AI Matcher</span>
              </button>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-md pt-2">
              <div className="p-1.5 bg-slate-900/90 border border-slate-700 rounded-2xl shadow-2xl flex items-center gap-2 backdrop-blur-md">
                <Search className="w-4 h-4 text-[#1473E6] ml-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Mumbai, Premiere Pro, FPV, Colorist..."
                  className="flex-1 bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1473E6] hover:bg-[#0D66D0] text-white font-bold text-xs rounded-xl transition-all"
                >
                  Search
                </button>
              </div>
            </form>

          </div>

          {/* Right Side: Laptop Showcase Frame */}
          <div className="lg:col-span-6 relative">
            
            <div className="relative rounded-2xl bg-slate-900 border-4 border-slate-700 shadow-2xl p-2 sm:p-3 overflow-hidden transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              
              <div className="bg-slate-800 rounded-t-xl p-3 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <span>CreatorHub Studio Platform</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-300 font-mono">Model:</span>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-xs font-bold text-white rounded px-2 py-1 focus:outline-none"
                  >
                    <option value="CreatorHub RAG v2.4">CreatorHub RAG v2.4</option>
                    <option value="GPT-4o Creator Vision">GPT-4o Creator Vision</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-950 p-4 space-y-4 rounded-b-xl">
                
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
                    <span>Active Query Prompt</span>
                    <span className="text-[#1473E6] font-bold">RAG Match: 99.4%</span>
                  </div>
                  <p className="text-xs text-slate-200 font-mono italic">
                    "Find a DaVinci colorist in Mumbai for a music video commercial edit..."
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" alt="Ronak" className="w-8 h-8 rounded-lg object-cover ring-2 ring-[#1473E6]" />
                      <div>
                        <div className="text-xs font-bold text-white">Ronak Sharma</div>
                        <div className="text-[9px] text-[#1473E6]">Colorist • Mumbai</div>
                      </div>
                    </div>
                    <div className="h-16 rounded-lg bg-black overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-bold text-emerald-400">₹3,500/hr</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Ananya" className="w-8 h-8 rounded-lg object-cover ring-2 ring-[#1473E6]" />
                      <div>
                        <div className="text-xs font-bold text-white">Ananya Roy</div>
                        <div className="text-[9px] text-[#1473E6]">Shorts Editor • Bengaluru</div>
                      </div>
                    </div>
                    <div className="h-16 rounded-lg bg-black overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-bold text-emerald-400">₹2,800/hr</span>
                    </div>
                  </div>

                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400 font-bold">Verified Indian Creators Index</span>
                  <button
                    onClick={onOpenAIRecommend}
                    className="px-4 py-2 bg-[#1473E6] hover:bg-[#0D66D0] text-white font-extrabold text-xs rounded-lg shadow-md flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-white" /> Match with RAG AI
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
