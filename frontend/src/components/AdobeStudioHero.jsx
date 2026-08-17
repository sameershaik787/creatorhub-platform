import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, Bot, ChevronDown, Check, Globe } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

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
    <section className="relative min-h-[80vh] flex items-center bg-slate-50 overflow-hidden border-b border-slate-200">
      
      {/* 1. Cinematic Creator Studio Desk Background Image (Light Overlay) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        {/* Soft Light Overlay for High Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 z-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 2. Left-Aligned Light Typography */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Category Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#1473E6] animate-ping" />
              <span>CreatorHub Studio • Adobe Light Theme</span>
            </div>

            {/* Massive Light Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              All the best creators, <br />
              <span className="gradient-text-adobe-light">all in one place.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-xl">
              Hire and collaborate with top video editors, audio engineers, motion graphic artists, and FPV drone pilots worldwide.
            </p>

            {/* Secondary Copy */}
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg leading-relaxed border-l-2 border-[#1473E6] pl-3 py-1 bg-white/80 rounded-r-lg border border-slate-200">
              Get instant multi-currency conversion ($, €, £, ₹, A$, ¥), automated legal contracts, and RAG AI creator recommendations.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/search"
                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-full shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-2"
              >
                <span>Explore Creators</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <button
                onClick={onOpenAIRecommend}
                className="px-6 py-3.5 bg-[#1473E6] hover:bg-[#0D66D0] text-white font-extrabold text-xs rounded-full shadow-md transition-all inline-flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-pink-200" />
                <span>RAG AI Matcher</span>
              </button>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-md pt-2">
              <div className="p-1.5 bg-white border border-slate-300 rounded-2xl shadow-md flex items-center gap-2">
                <Search className="w-4 h-4 text-[#1473E6] ml-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Premiere Pro, London, FPV..."
                  className="flex-1 bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
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

          {/* 3. Right Side: Laptop Showcase Frame */}
          <div className="lg:col-span-6 relative">
            
            {/* Laptop Frame Shell */}
            <div className="relative rounded-2xl bg-slate-900 border-4 border-slate-700 shadow-2xl p-2 sm:p-3 overflow-hidden transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              
              {/* Laptop Screen Header */}
              <div className="bg-slate-800 rounded-t-xl p-3 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <span>CreatorHub Studio App</span>
                </div>
                
                {/* AI Model Selector Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-300 font-mono">Model:</span>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-xs font-bold text-white rounded px-2 py-1 focus:outline-none"
                  >
                    <option value="CreatorHub RAG v2.4">CreatorHub RAG v2.4</option>
                    <option value="Adobe Firefly Video">Adobe Firefly Video</option>
                    <option value="GPT-4o Creator Vision">GPT-4o Creator Vision</option>
                  </select>
                </div>
              </div>

              {/* Laptop Screen App Content */}
              <div className="bg-slate-950 p-4 space-y-4 rounded-b-xl">
                
                {/* Top Prompt Display Bar */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
                    <span>Active Query Prompt</span>
                    <span className="text-[#1473E6] font-bold">RAG Vector Index: 99.4% Match</span>
                  </div>
                  <p className="text-xs text-slate-200 font-mono italic">
                    "Find a senior video editor in Los Angeles who can cut 10 fast-paced tech Shorts with kinetic captions..."
                  </p>
                </div>

                {/* Creator Gallery Grid Inside Laptop */}
                <div className="grid grid-cols-2 gap-3">
                  
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Alex" className="w-8 h-8 rounded-lg object-cover ring-2 ring-[#1473E6]" />
                      <div>
                        <div className="text-xs font-bold text-white">Brandon Li</div>
                        <div className="text-[9px] text-[#1473E6]">Cinematographer • LA</div>
                      </div>
                    </div>
                    <div className="h-16 rounded-lg bg-black overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-bold text-emerald-400">$95/hr</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" alt="Daniel" className="w-8 h-8 rounded-lg object-cover ring-2 ring-[#1473E6]" />
                      <div>
                        <div className="text-xs font-bold text-white">Daniel Schiffer</div>
                        <div className="text-[9px] text-[#1473E6]">B-Roll Specialist • London</div>
                      </div>
                    </div>
                    <div className="h-16 rounded-lg bg-black overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-bold text-emerald-400">£65/hr</span>
                    </div>
                  </div>

                </div>

                {/* Laptop Action Bar */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400 font-bold">12 Regional Creators Verified</span>
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
