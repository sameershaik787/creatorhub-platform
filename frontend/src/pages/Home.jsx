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
    <div className="relative min-h-screen bg-white text-slate-900 font-sans">
      
      {/* 1️⃣ LIGHT HERO BANNER */}
      <AdobeStudioHero onOpenAIRecommend={() => setShowAIRecommend(true)} />

      {/* 2️⃣ METRICS STATS BANNER */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-extrabold text-slate-900">12+ Real</div>
            <div className="text-xs text-slate-500 font-medium">Authentic Regional Creators</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#1473E6]">6 Currencies</div>
            <div className="text-xs text-slate-500 font-medium">USD, EUR, GBP, INR, AUD, JPY</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-purple-600">100%</div>
            <div className="text-xs text-slate-500 font-medium">Verified Equipment & Resumes</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-emerald-600">4K Cinematic</div>
            <div className="text-xs text-slate-500 font-medium">Portfolio Work Samples</div>
          </div>
        </div>
      </section>

      {/* 3️⃣ ADOBE LIGHT PRODUCT CATEGORY CARDS */}
      <section className="py-16 px-4 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">What will you create today?</h2>
          <p className="text-xs text-slate-600">Everything you need to hire specialists across video, audio, 3D motion, and aerial photography.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="adobe-light-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-extrabold text-lg">
              Pr
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Video Editing & Reels</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">Cinematic cuts, sound sync, kinetic captions, color grading, and vertical TikTok/Shorts edits.</p>
            </div>
            <Link to="/search?skill=Video Editing" className="inline-flex items-center gap-1 text-xs font-bold text-[#1473E6] hover:underline">
              Explore Editors <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="adobe-light-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-extrabold text-lg">
              Au
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Audio & Podcast Mixing</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">Noise cleanup, vocal EQ, spatial audio soundscapes, podcast mastering, and custom intro jingles.</p>
            </div>
            <Link to="/search?skill=Audio Editing" className="inline-flex items-center gap-1 text-xs font-bold text-[#1473E6] hover:underline">
              Explore Sound Engineers <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="adobe-light-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-extrabold text-lg">
              Ae
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Motion Graphics & 3D</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">Cinema 4D intros, lower thirds, 3D product renders, kinetic typography, and channel animations.</p>
            </div>
            <Link to="/search?skill=Motion Graphics" className="inline-flex items-center gap-1 text-xs font-bold text-[#1473E6] hover:underline">
              Explore Motion Artists <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="adobe-light-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 font-extrabold text-lg">
              Ps
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Drone & Photography</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">FPV high-speed indoor flythroughs, real estate aerial tours, product photography, and outdoor shoots.</p>
            </div>
            <Link to="/search?skill=Drone Videography" className="inline-flex items-center gap-1 text-xs font-bold text-[#1473E6] hover:underline">
              Explore FPV Pilots <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4️⃣ FEATURED CREATORS SHOWCASE */}
      <section className="py-14 px-4 max-w-7xl mx-auto space-y-8 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Featured Regional Creators ({filteredCreators.length})
            </h2>
            <p className="text-xs text-slate-600">Inspect digital resumes, camera rigs, and video reels with dynamic currency conversion.</p>
          </div>
          <Link to="/search" className="text-xs font-bold text-[#1473E6] hover:underline flex items-center gap-1">
            View All Creators <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCreators.slice(0, 8).map((c) => (
            <div key={c.id} className="adobe-light-card rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-xl object-cover ring-2 ring-[#1473E6]" />
                    <span className="absolute -bottom-1 -right-1 text-sm">{getRegionFlag(c.location)}</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    {formatPrice(c.hourlyRate)}/hr
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
                    {c.verified && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-[#1473E6] font-medium line-clamp-1">{c.title}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-600" /> {c.location}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-semibold"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {c.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{c.bio}</p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {c.skills?.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setSelectedCreator(c)}
                  className="flex-1 py-2 rounded-xl bg-[#1473E6] hover:bg-[#0D66D0] text-white font-extrabold text-xs shadow-sm transition-all text-center"
                >
                  Digital Resume
                </button>
                <button
                  onClick={() => setChatRecipient(c)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200"
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
      <section className="py-14 px-4 max-w-7xl mx-auto border-t border-slate-200">
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase font-extrabold text-[#1473E6]">Creator Studio Tools</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Everything Content Creators Need to Know</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculate fair hourly rates, generate freelance contract agreements, and structure video script hooks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <Link to="/tools" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#1473E6] transition-all space-y-2 shadow-sm">
              <Calculator className="w-5 h-5 text-[#1473E6]" />
              <h4 className="text-sm font-bold text-slate-900">Rate Calculator</h4>
              <p className="text-[11px] text-slate-500">Calculate rates based on annual goals and studio expenses.</p>
            </Link>

            <Link to="/tools" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#1473E6] transition-all space-y-2 shadow-sm">
              <FileCheck className="w-5 h-5 text-purple-600" />
              <h4 className="text-sm font-bold text-slate-900">Contract Generator</h4>
              <p className="text-[11px] text-slate-500">Generate legal agreements and commercial IP transfers.</p>
            </Link>

            <Link to="/tools" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#1473E6] transition-all space-y-2 shadow-sm">
              <Zap className="w-5 h-5 text-amber-500" />
              <h4 className="text-sm font-bold text-slate-900">AI Script Generator</h4>
              <p className="text-[11px] text-slate-500">Generate high-retention video script hooks and timelines.</p>
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
