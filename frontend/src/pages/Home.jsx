import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdobeStudioHero from '../components/AdobeStudioHero';
import ResumeViewer from '../components/ResumeViewer';
import ChatDrawer from '../components/ChatDrawer';
import AIRecommendModal from '../components/AIRecommendModal';
import { useCurrency } from '../context/CurrencyContext';
import { Star, MapPin, CheckCircle2, ArrowRight, Calculator, FileCheck, Zap, Users, Globe } from 'lucide-react';

export default function Home() {
  const [creators, setCreators] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [chatRecipient, setChatRecipient] = useState(null);
  const [showAIRecommend, setShowAIRecommend] = useState(false);
  const [regionFilter, setRegionFilter] = useState('All');
  
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetch('/api/creators')
      .then(res => res.json())
      .then(data => setCreators(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  const filteredCreators = regionFilter === 'All'
    ? creators
    : creators.filter(c => c.location.toLowerCase().includes(regionFilter.toLowerCase()));

  const getRegionFlag = (loc) => {
    if (!loc) return '🌐';
    if (loc.includes('USA')) return '🇺🇸';
    if (loc.includes('UK') || loc.includes('London')) return '🇬🇧';
    if (loc.includes('Iceland')) return '🇮🇸';
    if (loc.includes('India') || loc.includes('Mumbai') || loc.includes('Bengaluru')) return '🇮🇳';
    if (loc.includes('Australia') || loc.includes('Sydney')) return '🇦🇺';
    if (loc.includes('Japan') || loc.includes('Tokyo')) return '🇯🇵';
    if (loc.includes('Germany') || loc.includes('Berlin')) return '🇩🇪';
    return '🌐';
  };

  return (
    <div className="relative min-h-screen bg-[#0b0f19] text-slate-100 font-sans">
      
      {/* 1️⃣ HERO BANNER */}
      <AdobeStudioHero onOpenAIRecommend={() => setShowAIRecommend(true)} />

      {/* 2️⃣ METRICS STATS BANNER */}
      <section className="py-8 bg-[#0e121d] border-b border-[#282f40]">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-extrabold text-white">12+ Real</div>
            <div className="text-xs text-slate-400">Authentic Regional Creators</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#1473E6]">6 Currencies</div>
            <div className="text-xs text-slate-400">USD, EUR, GBP, INR, AUD, JPY</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-purple-400">100%</div>
            <div className="text-xs text-slate-400">Verified Equipment & Resumes</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-emerald-400">4K Cinematic</div>
            <div className="text-xs text-slate-400">Portfolio Work Samples</div>
          </div>
        </div>
      </section>

      {/* 3️⃣ PRODUCT STYLE CATEGORY CARDS */}
      <section className="py-16 px-4 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white">What will you create today?</h2>
          <p className="text-xs text-slate-400">Everything you need to hire specialists across video, audio, 3D motion, and aerial photography.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="adobe-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#000055] border border-[#9999FF] flex items-center justify-center text-[#9999FF] font-extrabold text-lg">
              Pr
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Video Editing & Reels</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Cinematic cuts, sound sync, kinetic captions, color grading, and vertical TikTok/Shorts edits.</p>
            </div>
            <Link to="/search?skill=Video Editing" className="inline-flex items-center gap-1 text-xs font-bold text-[#1473E6] hover:underline">
              Explore Editors <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="adobe-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#002B24] border border-[#00E5B3] flex items-center justify-center text-[#00E5B3] font-extrabold text-lg">
              Au
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Audio & Podcast Mixing</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Noise cleanup, vocal EQ, spatial audio soundscapes, podcast mastering, and custom intro jingles.</p>
            </div>
            <Link to="/search?skill=Audio Editing" className="inline-flex items-center gap-1 text-xs font-bold text-[#1473E6] hover:underline">
              Explore Sound Engineers <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="adobe-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#160033] border border-[#D685FF] flex items-center justify-center text-[#D685FF] font-extrabold text-lg">
              Ae
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Motion Graphics & 3D</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Cinema 4D intros, lower thirds, 3D product renders, kinetic typography, and channel animations.</p>
            </div>
            <Link to="/search?skill=Motion Graphics" className="inline-flex items-center gap-1 text-xs font-bold text-[#1473E6] hover:underline">
              Explore Motion Artists <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="adobe-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#001E36] border border-[#31A8FF] flex items-center justify-center text-[#31A8FF] font-extrabold text-lg">
              Ps
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Drone & Photography</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">FPV high-speed indoor flythroughs, real estate aerial tours, product photography, and outdoor shoots.</p>
            </div>
            <Link to="/search?skill=Drone Videography" className="inline-flex items-center gap-1 text-xs font-bold text-[#1473E6] hover:underline">
              Explore FPV Pilots <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4️⃣ FEATURED CREATORS SHOWCASE */}
      <section className="py-14 px-4 max-w-7xl mx-auto space-y-8 border-t border-[#282f40]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white">
              Featured Regional Creators ({filteredCreators.length})
            </h2>
            <p className="text-xs text-slate-400">Inspect digital resumes, camera rigs, and video reels with dynamic currency conversion.</p>
          </div>
          <Link to="/search" className="text-xs font-bold text-[#1473E6] hover:underline flex items-center gap-1">
            View All Creators <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCreators.slice(0, 8).map((c) => (
            <div key={c.id} className="adobe-card rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-xl object-cover ring-2 ring-[#FA0F00]" />
                    <span className="absolute -bottom-1 -right-1 text-sm">{getRegionFlag(c.location)}</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-full">
                    {formatPrice(c.hourlyRate)}/hr
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-white">{c.name}</h3>
                    {c.verified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-[#1473E6] font-medium line-clamp-1">{c.title}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-400" /> {c.location}</span>
                    <span className="flex items-center gap-1 text-amber-400 font-semibold"><Star className="w-3 h-3 fill-amber-400" /> {c.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{c.bio}</p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {c.skills?.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#0d111c] text-slate-300 border border-[#282f40]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#282f40] flex items-center gap-2">
                <button
                  onClick={() => setSelectedCreator(c)}
                  className="flex-1 py-2 rounded-xl bg-[#1473E6]/20 hover:bg-[#1473E6] text-[#1473E6] hover:text-white font-bold text-xs transition-all text-center"
                >
                  Digital Resume
                </button>
                <button
                  onClick={() => setChatRecipient(c)}
                  className="p-2 rounded-xl bg-[#0d111c] hover:bg-[#1c2232] text-slate-300 hover:text-white transition-all border border-[#282f40]"
                  title="Chat with Creator"
                >
                  <Users className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 5️⃣ KNOWLEDGE SUITE */}
      <section className="py-14 px-4 max-w-7xl mx-auto border-t border-[#282f40]">
        <div className="p-8 rounded-2xl bg-[#151924] border border-[#282f40] space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase font-extrabold text-[#1473E6]">Creator Studio Tools</span>
            <h2 className="text-2xl font-extrabold text-white">Everything Content Creators Need to Know</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calculate fair hourly rates, generate freelance contract agreements, and structure video script hooks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <Link to="/tools" className="p-4 rounded-xl bg-[#0d111c] border border-[#282f40] hover:border-[#1473E6] transition-all space-y-2">
              <Calculator className="w-5 h-5 text-[#1473E6]" />
              <h4 className="text-sm font-bold text-white">Rate Calculator</h4>
              <p className="text-[11px] text-slate-400">Calculate rates based on annual goals and studio expenses.</p>
            </Link>

            <Link to="/tools" className="p-4 rounded-xl bg-[#0d111c] border border-[#282f40] hover:border-[#1473E6] transition-all space-y-2">
              <FileCheck className="w-5 h-5 text-purple-400" />
              <h4 className="text-sm font-bold text-white">Contract Generator</h4>
              <p className="text-[11px] text-slate-400">Generate legal agreements and commercial IP transfers.</p>
            </Link>

            <Link to="/tools" className="p-4 rounded-xl bg-[#0d111c] border border-[#282f40] hover:border-[#1473E6] transition-all space-y-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h4 className="text-sm font-bold text-white">AI Script Generator</h4>
              <p className="text-[11px] text-slate-400">Generate high-retention video script hooks and timelines.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Modals */}
      {selectedCreator && (
        <ResumeViewer
          creator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
          onHire={(c) => {
            setSelectedCreator(null);
            setChatRecipient(c);
          }}
        />
      )}

      {chatRecipient && (
        <ChatDrawer
          recipient={chatRecipient}
          onClose={() => setChatRecipient(null)}
        />
      )}

      {showAIRecommend && (
        <AIRecommendModal
          onClose={() => setShowAIRecommend(false)}
          onSelectCreator={(c) => setChatRecipient(c)}
        />
      )}

    </div>
  );
}
