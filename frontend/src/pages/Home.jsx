import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdobeStudioHero from '../components/AdobeStudioHero';
import ResumeViewer from '../components/ResumeViewer';
import ChatDrawer from '../components/ChatDrawer';
import AIRecommendModal from '../components/AIRecommendModal';
import { useCurrency } from '../context/CurrencyContext';
import { Star, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Heart, MessageSquare, Zap } from 'lucide-react';

export default function Home() {
  const [creators, setCreators] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [chatRecipient, setChatRecipient] = useState(null);
  const [showAIRecommend, setShowAIRecommend] = useState(false);
  
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetch('/api/creators')
      .then(res => res.json())
      .then(data => setCreators(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f172a] font-sans">
      
      {/* 1. BLACK HERO BANNER */}
      <AdobeStudioHero onOpenAIRecommend={() => setShowAIRecommend(true)} />

      {/* 2. TRUST BADGES BANNER */}
      <section className="py-6 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 flex flex-wrap items-center justify-between gap-6 text-xs font-bold text-[#64748b]">
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#000000]" /> Verified Indian Freelancers</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#000000]" /> Protected Escrow Payments</span>
          <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#000000]" /> Fast 24-48h Deliveries</span>
          <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#000000] fill-current" /> 4.9/5 Average Rating</span>
        </div>
      </section>

      {/* 3. POPULAR PROFESSIONAL SERVICES */}
      <section className="py-14 px-4 lg:px-10 max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0f172a]">Popular professional services</h2>
          <p className="text-sm text-[#64748b] mt-1">Get your project done by verified Indian creative experts.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Link to="/search?skill=Video Editing" className="group relative h-72 rounded-xl overflow-hidden shadow-md block border border-[#e2e8f0]">
            <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80" alt="Video Editing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-between text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Reels & Shorts</span>
              <div>
                <h3 className="text-xl font-extrabold">Video Editing</h3>
                <p className="text-xs text-slate-300 mt-1">Kinetic captions & cuts</p>
              </div>
            </div>
          </Link>

          <Link to="/search?skill=Color Grading" className="group relative h-72 rounded-xl overflow-hidden shadow-md block border border-[#e2e8f0]">
            <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80" alt="Color Grading" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-between text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Cinematic Grade</span>
              <div>
                <h3 className="text-xl font-extrabold">DaVinci Colorist</h3>
                <p className="text-xs text-slate-300 mt-1">Film print emulation</p>
              </div>
            </div>
          </Link>

          <Link to="/search?skill=Drone Videography" className="group relative h-72 rounded-xl overflow-hidden shadow-md block border border-[#e2e8f0]">
            <img src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80" alt="Drone FPV" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-between text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Indoor & Outdoor</span>
              <div>
                <h3 className="text-xl font-extrabold">FPV Drone Flying</h3>
                <p className="text-xs text-slate-300 mt-1">4K aerial flythroughs</p>
              </div>
            </div>
          </Link>

          <Link to="/search?skill=Audio Editing" className="group relative h-72 rounded-xl overflow-hidden shadow-md block border border-[#e2e8f0]">
            <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80" alt="Audio Mixing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-between text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Podcast & Vocal</span>
              <div>
                <h3 className="text-xl font-extrabold">Audio Mixing</h3>
                <p className="text-xs text-slate-300 mt-1">Noise removal & master</p>
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* 4. FEATURED CREATOR GIGS GRID (BLACK & WHITE) */}
      <section className="py-14 px-4 lg:px-10 max-w-7xl mx-auto space-y-8 bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0f172a]">Explore Top Indian Creator Gigs</h2>
            <p className="text-sm text-[#64748b]">Handpicked verified professionals in Mumbai, Bengaluru, Delhi & Hyderabad.</p>
          </div>
          <Link to="/search" className="text-sm font-bold text-[#000000] hover:underline flex items-center gap-1">
            See All Gigs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((c) => (
            <div key={c.id} className="bw-card flex flex-col justify-between overflow-hidden">
              
              {/* Gig Media Preview */}
              <div className="h-44 bg-slate-200 relative overflow-hidden group">
                <img
                  src={c.portfolio?.[0]?.thumbnail || "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80"}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Creator Info & Bio */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-[#000000]" />
                    <div>
                      <div className="text-xs font-bold text-[#0f172a] flex items-center gap-1">
                        <span>{c.name}</span>
                        <span className="text-[10px] bg-slate-100 text-[#000000] px-1.5 py-0.2 rounded font-extrabold border border-[#e2e8f0]">Pro</span>
                      </div>
                      <div className="text-[10px] text-[#64748b]">{c.location}</div>
                    </div>
                  </div>

                  <h3 className="text-xs text-[#334155] font-semibold line-clamp-2 hover:text-[#000000] cursor-pointer">
                    I will edit professional video content and color grade your footage as a senior editor.
                  </h3>

                  <div className="flex items-center gap-1 text-xs font-bold text-[#0f172a]">
                    <Star className="w-3.5 h-3.5 fill-[#000000] text-[#000000]" />
                    <span>{c.rating || 5.0}</span>
                    <span className="text-[#64748b] font-normal">({c.reviewsCount || 42})</span>
                  </div>
                </div>

                {/* Footer Price */}
                <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCreator(c)}
                    className="text-xs font-bold text-[#000000] hover:underline"
                  >
                    View Resume
                  </button>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-[#64748b] block font-semibold">Starting at</span>
                    <span className="text-sm font-extrabold text-[#0f172a]">{formatPrice(c.hourlyRate * 3)}</span>
                  </div>
                </div>

              </div>

            </div>
          ))}
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
