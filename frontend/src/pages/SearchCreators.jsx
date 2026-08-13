import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LocationMap from '../components/LocationMap';
import ResumeViewer from '../components/ResumeViewer';
import ChatDrawer from '../components/ChatDrawer';
import { useCurrency } from '../context/CurrencyContext';
import { Search, MapPin, Star, Filter, CheckCircle2, MessageSquare, FileText, Globe, Layers, SlidersHorizontal } from 'lucide-react';

export default function SearchCreators() {
  const [searchParams] = useSearchParams();
  const initialSkill = searchParams.get('skill') || 'All';
  const initialQuery = searchParams.get('query') || '';

  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  const [skill, setSkill] = useState(initialSkill);
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState('');
  const [maxRate, setMaxRate] = useState(150);
  const [availableOnly, setAvailableOnly] = useState(false);

  const [selectedCreator, setSelectedCreator] = useState(null);
  const [chatRecipient, setChatRecipient] = useState(null);

  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetchCreators();
  }, [skill, location, maxRate, availableOnly]);

  const fetchCreators = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (skill !== 'All') params.append('skill', skill);
    if (query) params.append('search', query);
    if (location) params.append('location', location);
    if (maxRate) params.append('maxRate', maxRate);
    if (availableOnly) params.append('availableOnly', 'true');

    fetch(`/api/creators?${params.toString()}`)
      .then(res => res.json())
      .then(data => setCreators(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

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
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans">
      
      {/* 🖼️ STUDIO WORKSTATION BACKGROUND HERO SECTION */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-[#282f40] overflow-hidden">
        
        {/* Full-width Studio Workstation Image Background (Matching User Screenshot Setup) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542744094-3a317272018a?auto=format&fit=crop&w=2000&q=80')`
          }}
        >
          {/* Dark Vignette Overlay for Crisp Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19]/90 via-[#0b0f19]/95 to-[#0b0f19] z-0" />
          <div className="absolute inset-0 bg-black/50 z-0" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151924]/90 border border-[#282f40] text-xs font-bold text-slate-300 mb-2 backdrop-blur-md">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#1473E6]" />
                <span>CreatorHub Studio Directory</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Find & Hire Regional Content Creators</h1>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">Discover verified cinematographers, B-roll editors, FPV drone pilots, and sound engineers by country, city, and rate.</p>
            </div>

            <div className="flex items-center gap-1 bg-[#151924]/90 p-1.5 rounded-xl border border-[#282f40] backdrop-blur-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'grid' ? 'bg-[#1473E6] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" /> Grid View
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'map' ? 'bg-[#1473E6] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4 text-cyan-400" /> Interactive Map View
              </button>
            </div>
          </div>

          {/* 🛠️ FILTER TOOLBAR OVER BACKGROUND */}
          <div className="p-5 rounded-2xl bg-[#151924]/95 border border-[#282f40] shadow-2xl space-y-4 backdrop-blur-xl">
            <form onSubmit={(e) => { e.preventDefault(); fetchCreators(); }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-center">
              
              {/* Keyword Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#1473E6] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search keyword or name..."
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0d111c] border border-[#282f40] text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#1473E6] focus:ring-1 focus:ring-[#1473E6] transition-all"
                />
              </div>

              {/* Skill Discipline Dropdown */}
              <div className="relative">
                <select
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d111c] border border-[#282f40] text-xs font-bold text-white focus:outline-none focus:border-[#1473E6] focus:ring-1 focus:ring-[#1473E6] cursor-pointer appearance-none transition-all"
                >
                  <option value="All" className="bg-[#0d111c] text-white font-semibold">All Disciplines</option>
                  <option value="Video Editing" className="bg-[#0d111c] text-white font-semibold">Video Editing & Cinematography</option>
                  <option value="Audio Editing" className="bg-[#0d111c] text-white font-semibold">Audio & Podcast</option>
                  <option value="Motion Graphics" className="bg-[#0d111c] text-white font-semibold">Motion Graphics & 3D</option>
                  <option value="Drone Videography" className="bg-[#0d111c] text-white font-semibold">Drone & FPV Flying</option>
                  <option value="Color Grading" className="bg-[#0d111c] text-white font-semibold">Color Grading & VFX</option>
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400 text-[10px]">▼</div>
              </div>

              {/* Location Input */}
              <div className="relative">
                <MapPin className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City/Country (London, Tokyo)"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0d111c] border border-[#282f40] text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#1473E6] focus:ring-1 focus:ring-[#1473E6] transition-all"
                />
              </div>

              {/* Max Rate Slider */}
              <div className="flex flex-col justify-center px-2">
                <div className="flex justify-between text-[11px] font-bold mb-1.5">
                  <span className="text-slate-400">Max Rate:</span>
                  <span className="text-emerald-400 font-mono text-xs font-extrabold">{formatPrice(maxRate)}/hr</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={maxRate}
                  onChange={(e) => setMaxRate(Number(e.target.value))}
                  className="w-full accent-[#1473E6] cursor-pointer h-1.5 bg-[#0d111c] rounded-lg"
                />
              </div>

              {/* Available Checkbox */}
              <div className="flex items-center justify-center sm:justify-start lg:justify-center px-2">
                <label className="text-xs text-slate-200 font-bold flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={availableOnly}
                    onChange={(e) => setAvailableOnly(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#1473E6] bg-[#0d111c] border-[#282f40] cursor-pointer"
                  />
                  <span>Available Now Only</span>
                </label>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* Grid or Map Content */}
      <div className="max-w-7xl mx-auto py-10 px-4">
        {viewMode === 'map' ? (
          <div className="space-y-6">
            <LocationMap
              creators={creators}
              selectedCreator={selectedCreator}
              onSelectCreator={(c) => setSelectedCreator(c)}
            />
          </div>
        ) : (
          <div>
            {loading ? (
              <div className="text-center py-20 text-slate-400 text-sm font-semibold">Searching CreatorHub regional index...</div>
            ) : creators.length === 0 ? (
              <div className="text-center py-20 bg-[#151924] rounded-2xl border border-[#282f40] space-y-3">
                <Filter className="w-8 h-8 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No creators match your criteria</h3>
                <p className="text-xs text-slate-400">Try broadening your location or rate range.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creators.map((c) => (
                  <div key={c.id} className="adobe-card rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-xl object-cover ring-2 ring-[#FA0F00]" />
                            <span className="absolute -bottom-1 -right-1 text-sm">{getRegionFlag(c.location)}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="text-base font-bold text-white">{c.name}</h3>
                              {c.verified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                            </div>
                            <p className="text-xs text-[#1473E6] font-medium line-clamp-1">{c.title}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> {c.location}</span>
                        <span className="text-emerald-400 font-extrabold text-sm">{formatPrice(c.hourlyRate)}/hr</span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{c.bio}</p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {c.skills?.map((s, idx) => (
                          <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#0d111c] text-slate-300 border border-[#282f40]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#282f40] flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCreator(c)}
                        className="flex-1 py-2.5 rounded-xl bg-[#1473E6] hover:bg-[#0D66D0] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" /> Digital Resume
                      </button>
                      <button
                        onClick={() => setChatRecipient(c)}
                        className="p-2.5 rounded-xl bg-[#0d111c] hover:bg-[#1c2232] text-slate-300 hover:text-white transition-all border border-[#282f40]"
                        title="Send Message"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

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

    </div>
  );
}
