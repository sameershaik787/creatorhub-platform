import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LocationMap from '../components/LocationMap';
import ResumeViewer from '../components/ResumeViewer';
import ChatDrawer from '../components/ChatDrawer';
import { useCurrency } from '../context/CurrencyContext';
import { Search, MapPin, Star, Filter, CheckCircle2, MessageSquare, FileText, Globe, Layers, SlidersHorizontal, Heart } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f172a] font-sans">
      
      {/* 🖼️ SERVICES HEADER */}
      <section className="bg-[#f8fafc] border-b border-[#e2e8f0] py-8 px-4 lg:px-10">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#000000] uppercase tracking-wider">India Marketplace Directory</div>
              <h1 className="text-3xl font-extrabold text-[#0f172a] mt-1">Hire Top Indian Creative Services</h1>
              <p className="text-xs text-[#64748b] mt-1 max-w-2xl">Verified cinematographers, DaVinci colorists, FPV drone pilots, and audio engineers across Mumbai, Bengaluru, Delhi & Hyderabad.</p>
            </div>

            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#e2e8f0] shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'grid' ? 'bg-[#000000] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                <Layers className="w-4 h-4" /> Gig Directory
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'map' ? 'bg-[#000000] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                <Globe className="w-4 h-4" /> Interactive Map View
              </button>
            </div>
          </div>

          {/* 🛠️ FILTER TOOLBAR */}
          <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-sm">
            <form onSubmit={(e) => { e.preventDefault(); fetchCreators(); }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
              
              {/* Keyword Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search keyword or name..."
                  className="bw-input w-full pl-10 pr-3 py-2 text-xs font-semibold placeholder-slate-400"
                />
              </div>

              {/* Skill Category */}
              <div className="relative">
                <select
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="bw-input w-full px-3 py-2 text-xs font-bold cursor-pointer appearance-none bg-white"
                >
                  <option value="All">All Categories</option>
                  <option value="Video Editing">Video Editing & Reels</option>
                  <option value="Audio Editing">Audio & Podcast</option>
                  <option value="Motion Graphics">Motion Graphics & 3D</option>
                  <option value="Drone Videography">Drone & FPV Flying</option>
                  <option value="Color Grading">DaVinci Colorist</option>
                </select>
                <div className="absolute right-3 top-3 pointer-events-none text-slate-400 text-[10px]">▼</div>
              </div>

              {/* Location Scope */}
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City (Mumbai, Bengaluru)"
                  className="bw-input w-full pl-10 pr-3 py-2 text-xs font-semibold"
                />
              </div>

              {/* Max Rate Slider */}
              <div className="flex flex-col justify-center px-2">
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span className="text-[#64748b]">Max Budget:</span>
                  <span className="text-[#000000] font-extrabold">{formatPrice(maxRate)}/hr</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={maxRate}
                  onChange={(e) => setMaxRate(Number(e.target.value))}
                  className="w-full accent-[#000000] cursor-pointer h-1.5 bg-[#e2e8f0] rounded"
                />
              </div>

              {/* Available Checkbox */}
              <div className="flex items-center justify-center">
                <label className="text-xs text-[#0f172a] font-bold flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={availableOnly}
                    onChange={(e) => setAvailableOnly(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#000000] cursor-pointer"
                  />
                  <span>Online & Available</span>
                </label>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* Grid or Map Content */}
      <div className="max-w-7xl mx-auto py-10 px-4 lg:px-10">
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
              <div className="text-center py-20 text-[#64748b] text-sm font-semibold">Searching Indian creative services index...</div>
            ) : creators.length === 0 ? (
              <div className="text-center py-20 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] space-y-3">
                <Filter className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-[#0f172a]">No services match your criteria</h3>
                <p className="text-xs text-[#64748b]">Try broadening your location or budget search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {creators.map((c) => (
                  <div key={c.id} className="bw-card flex flex-col justify-between overflow-hidden">
                    
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

                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-[#000000]" />
                          <div>
                            <div className="text-xs font-bold text-[#0f172a] flex items-center gap-1">
                              <span>{c.name}</span>
                              <span className="text-[10px] bg-slate-100 text-[#000000] px-1.5 py-0.2 rounded font-extrabold border border-[#e2e8f0]">Level 2</span>
                            </div>
                            <div className="text-[10px] text-[#64748b]">{c.location}</div>
                          </div>
                        </div>

                        <h3 className="text-xs text-[#334155] font-semibold line-clamp-2 hover:text-[#000000] cursor-pointer">
                          I will deliver top quality {c.title.toLowerCase()} tailored for your brand or video.
                        </h3>

                        <div className="flex items-center gap-1 text-xs font-bold text-[#0f172a]">
                          <Star className="w-3.5 h-3.5 fill-[#000000] text-[#000000]" />
                          <span>{c.rating || 5.0}</span>
                          <span className="text-[#64748b] font-normal">({c.reviewsCount || 42})</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-between">
                        <button
                          onClick={() => setSelectedCreator(c)}
                          className="text-xs font-bold text-[#000000] hover:underline"
                        >
                          Digital Resume
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
