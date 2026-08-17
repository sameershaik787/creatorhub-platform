import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, Star, MapPin, Award, Cpu, Wrench, Play, Music, ExternalLink, MessageSquare, DollarSign, Eye } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function ResumeViewer({ creator, onClose, onHire }) {
  const [activeTab, setActiveTab] = useState('resume');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const { formatPrice } = useCurrency();

  if (!creator) return null;

  const resume = creator.resume || {};
  const packages = creator.packages || {};
  const portfolio = creator.portfolio || [];

  const handleDownloadSample = (sampleUrl, title) => {
    // Trigger direct file download or open media link in new tab
    const link = document.createElement('a');
    link.href = sampleUrl;
    link.target = '_blank';
    link.download = `${title.replace(/\s+/g, '_')}_Sample.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-[#e2e8f0] rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#0f172a]">
        
        {/* Header Banner */}
        <div className="p-6 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-start justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={creator.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
              alt={creator.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#000000] shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-[#0f172a]">{creator.name}</h2>
                {creator.verified ? (
                  <span className="flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Creator
                  </span>
                ) : (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    Pending Approval
                  </span>
                )}
              </div>
              <p className="text-[#000000] font-bold text-xs mt-0.5">{creator.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748b] mt-2">
                <span className="flex items-center gap-1 font-medium"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {creator.location}</span>
                <span className="flex items-center gap-1 text-[#0f172a] font-bold"><Star className="w-3.5 h-3.5 fill-[#000000] text-[#000000]" /> {creator.rating || 5.0} ({creator.reviewsCount || 42} reviews)</span>
                <span className="text-[#000000] font-extrabold">{formatPrice(creator.hourlyRate)}/hr</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onHire && (
              <button
                onClick={() => onHire(creator)}
                className="bw-btn-black px-4 py-2 text-xs shadow-sm transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Hire Creator
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-[#0f172a] hover:bg-slate-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-3 bg-[#f8fafc] border-b border-[#e2e8f0]">
          <button
            onClick={() => setActiveTab('resume')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'resume' ? 'bg-[#000000] text-white shadow-sm font-extrabold' : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Digital Resume
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'portfolio' ? 'bg-[#000000] text-white shadow-sm font-extrabold' : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <Play className="w-3.5 h-3.5" /> Work Samples & Video Reels ({portfolio.length})
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'packages' ? 'bg-[#000000] text-white shadow-sm font-extrabold' : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" /> Service Packages
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: RESUME */}
          {activeTab === 'resume' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-xs uppercase tracking-wider text-[#000000] font-extrabold flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#000000]" /> Verified Digital Resume File
                  </h3>
                  <p className="text-xs font-bold text-[#0f172a]">{resume.title || `${creator.name.replace(/\s+/g, '_')}_Resume.pdf`}</p>
                  <p className="text-[11px] text-[#64748b]">Uploaded: {resume.uploadedAt || '2026-08-10'} • Verified Studio Spec</p>
                </div>

                <button
                  onClick={() => handleDownloadSample("https://www.w3schools.com/html/mov_bbb.mp4", `${creator.name}_Resume`)}
                  className="bw-btn-black px-4 py-2 text-xs shadow-sm transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-4 h-4" /> Download PDF Resume
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                <h3 className="text-xs uppercase tracking-wider text-[#000000] font-extrabold">Professional Bio Summary</h3>
                <p className="text-xs text-[#334155] leading-relaxed font-medium">
                  {resume.summary || creator.bio || "Versatile media creator dedicated to delivering high-converting video content."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-3">
                  <h3 className="text-xs uppercase tracking-wider text-[#000000] font-extrabold flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> Specialized Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {creator.skills?.map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 text-xs rounded-lg bg-white text-[#0f172a] border border-[#e2e8f0] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-3">
                  <h3 className="text-xs uppercase tracking-wider text-[#000000] font-extrabold flex items-center gap-1.5">
                    <Wrench className="w-4 h-4" /> Software & Camera Hardware Rig
                  </h3>
                  <div className="space-y-2">
                    <div className="text-xs text-[#64748b] font-bold">Software Stack:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {resume.software?.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-[11px] rounded bg-white text-[#0f172a] border border-[#e2e8f0] font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                    {creator.equipment && (
                      <>
                        <div className="text-xs text-[#64748b] font-bold mt-3">Hardware & Camera Rig:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {creator.equipment.map((eq, i) => (
                            <span key={i} className="px-2 py-0.5 text-[11px] rounded bg-slate-900 text-white font-semibold">
                              {eq}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-4">
                <h3 className="text-xs uppercase tracking-wider text-[#000000] font-extrabold flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Commercial Work Experience
                </h3>
                <div className="space-y-4">
                  {resume.experience?.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-[#000000]">
                      <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-[#000000] ring-4 ring-white" />
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-extrabold text-[#0f172a]">{exp.role}</h4>
                        <span className="text-[10px] font-bold text-[#64748b] bg-white px-2 py-0.5 rounded border border-[#e2e8f0]">{exp.duration}</span>
                      </div>
                      <div className="text-xs text-[#000000] font-bold mt-0.5">{exp.company}</div>
                      <p className="text-xs text-[#64748b] mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PORTFOLIO & WORK SAMPLES */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#0f172a]">Verified Work Samples & Portfolio Video Reels</h3>
                <span className="text-xs font-bold text-[#64748b]">1-Click Preview & Download Enabled</span>
              </div>
              
              {selectedVideo && (
                <div className="p-4 bg-slate-900 rounded-2xl text-white space-y-3 shadow-lg">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-emerald-400">Now Previewing: {selectedVideo.title}</span>
                    <button onClick={() => setSelectedVideo(null)} className="text-slate-400 hover:text-white font-bold">Close Video Player</button>
                  </div>
                  <video src={selectedVideo.url} controls autoPlay className="w-full rounded-xl max-h-80 object-cover" />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {portfolio.map((item, idx) => (
                  <div key={idx} className="fiverr-card flex flex-col justify-between overflow-hidden">
                    
                    <div className="h-44 bg-slate-200 relative overflow-hidden group">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                        <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-[#000000] text-white w-fit">
                          {item.type}
                        </span>
                        <h4 className="text-xs font-extrabold text-white mt-1">{item.title}</h4>
                      </div>
                    </div>

                    <div className="p-3 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedVideo(item)}
                        className="flex-1 py-1.5 rounded-lg bg-[#000000] text-white hover:bg-[#1e293b] font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" /> Preview Reel
                      </button>

                      <button
                        onClick={() => handleDownloadSample(item.url || "https://www.w3schools.com/html/mov_bbb.mp4", item.title)}
                        className="flex-1 py-1.5 rounded-lg bg-white border border-[#e2e8f0] text-[#0f172a] hover:bg-slate-100 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-[#000000]" /> Download Sample
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PACKAGES */}
          {activeTab === 'packages' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['basic', 'standard', 'premium'].map((tier) => {
                const pkg = packages[tier];
                if (!pkg) return null;
                const isFeatured = tier === 'standard';
                return (
                  <div
                    key={tier}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isFeatured
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl'
                        : 'bg-[#f8fafc] border-[#e2e8f0]'
                    }`}
                  >
                    <div>
                      {isFeatured && (
                        <span className="inline-block text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 mb-3">
                          Most Popular Package
                        </span>
                      )}
                      <h4 className="text-base font-extrabold capitalize">{pkg.name || `${tier} Tier`}</h4>
                      <div className={`text-2xl font-extrabold mt-2 ${isFeatured ? 'text-white' : 'text-[#000000]'}`}>{formatPrice(pkg.price)}</div>
                      <div className={`text-xs mt-0.5 ${isFeatured ? 'text-slate-300' : 'text-[#64748b]'}`}>Delivery in {pkg.delivery}</div>
                      <p className={`text-xs mt-3 leading-relaxed ${isFeatured ? 'text-slate-300' : 'text-[#334155]'}`}>{pkg.description}</p>
                    </div>

                    <button
                      onClick={() => onHire && onHire(creator, pkg)}
                      className={`w-full mt-6 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
                        isFeatured
                          ? 'bg-white text-slate-950 hover:bg-slate-200 shadow-md'
                          : 'bg-[#000000] text-white hover:bg-[#1e293b]'
                      }`}
                    >
                      Select {tier.toUpperCase()} Package
                    </button>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        <div className="p-4 bg-[#f8fafc] border-t border-[#e2e8f0] flex justify-end">
          <button
            onClick={onClose}
            className="bw-btn-black px-6 py-2 text-xs font-bold"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
}
