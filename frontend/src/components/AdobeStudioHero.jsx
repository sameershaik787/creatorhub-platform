import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bot, MapPin, Sparkles } from 'lucide-react';

export default function AdobeStudioHero({ onOpenAIRecommend }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative min-h-[75vh] flex items-center bg-[#000000] text-white overflow-hidden">
      
      {/* Background Photography Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=80')`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content: Black & White Search Banner */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>India Marketplace • Mumbai, Bengaluru, Delhi & Hyderabad</span>
            </div>

            {/* Black & White Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Find the perfect <br />
              <span className="italic font-serif font-normal text-slate-300">creator</span> services for your business.
            </h1>

            {/* Black & White Search Bar */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-2xl">
              <div className="bg-white p-2 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-300">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Try "Mumbai colorist", "Reels editor", "FPV drone"...'
                  className="flex-1 bg-transparent text-sm font-semibold text-[#0f172a] placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-7 py-3 bg-[#000000] hover:bg-[#1e293b] text-white font-extrabold text-sm rounded-lg transition-all flex items-center gap-2 shrink-0 shadow-md"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Popular Search Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-200">
              <span className="font-bold text-white">Popular:</span>
              {['Video Editing', 'DaVinci Colorist', 'FPV Drone', 'Podcast Audio'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => navigate(`/search?query=${encodeURIComponent(tag)}`)}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* RAG AI Matcher CTA */}
            <div className="pt-3">
              <button
                onClick={onOpenAIRecommend}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white text-white font-bold text-xs rounded-lg transition-all inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Need AI assistance? Launch RAG Matcher</span>
              </button>
            </div>

          </div>

          {/* Right Content: Seller Hero Spotlight Card */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white bg-slate-900 px-3 py-1 rounded border border-white/30">
                  Featured Top Rated Seller
                </span>
                <span className="text-xs text-slate-300 font-mono">India Verified</span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
                  alt="Ronak Sharma"
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-white"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">Ronak Sharma</h3>
                  <p className="text-xs text-slate-300 font-semibold">Senior Colorist • Mumbai</p>
                  <div className="text-[11px] text-slate-400 mt-1">Starting at ₹3,500/hr</div>
                </div>
              </div>

              <div className="h-44 rounded-xl overflow-hidden relative border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
                  alt="Color Grading Showcase"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 flex items-end">
                  <span className="text-xs font-bold text-white">Bollywood Feature Film Color Pass</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
