import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, Star, MapPin, Award, Cpu, Wrench, Play, Music, ExternalLink, MessageSquare, DollarSign } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function ResumeViewer({ creator, onClose, onHire }) {
  const [activeTab, setActiveTab] = useState('resume');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const { formatPrice } = useCurrency();

  if (!creator) return null;

  const resume = creator.resume || {};
  const packages = creator.packages || {};
  const portfolio = creator.portfolio || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-start justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={creator.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
              alt={creator.name}
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-indigo-500/50 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-white">{creator.name}</h2>
                {creator.verified && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> Verified Creator
                  </span>
                )}
              </div>
              <p className="text-indigo-300 font-medium text-sm mt-0.5">{creator.title}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> {creator.location}</span>
                <span className="flex items-center gap-1 text-amber-400 font-semibold"><Star className="w-3.5 h-3.5 fill-amber-400" /> {creator.rating} ({creator.reviewsCount} reviews)</span>
                <span className="text-emerald-400 font-bold">{formatPrice(creator.hourlyRate)}/hr</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onHire && (
              <button
                onClick={() => onHire(creator)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Hire Creator
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-3 bg-slate-950/60 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('resume')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'resume' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Digital Resume
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'portfolio' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5" /> Work Reels ({portfolio.length})
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'packages' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" /> Pricing Packages
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: RESUME */}
          {activeTab === 'resume' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <h3 className="text-xs uppercase tracking-wider text-indigo-400 font-bold mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Professional Summary
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {resume.summary || creator.bio || "Versatile media creator dedicated to delivering high-converting social media content."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                  <h3 className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> Specialized Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {creator.skills?.map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                  <h3 className="text-xs uppercase tracking-wider text-pink-400 font-bold mb-3 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4" /> Software & Camera Rig
                  </h3>
                  <div className="space-y-2">
                    <div className="text-xs text-slate-400 font-semibold">Software Stack:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {resume.software?.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-[11px] rounded bg-slate-900 text-slate-300 border border-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                    {creator.equipment && (
                      <>
                        <div className="text-xs text-slate-400 font-semibold mt-3">Camera & Hardware Rig:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {creator.equipment.map((eq, i) => (
                            <span key={i} className="px-2 py-0.5 text-[11px] rounded bg-purple-950/60 text-purple-300 border border-purple-800/50">
                              {eq}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Experience Timeline */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <h3 className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-4 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Work Experience
                </h3>
                <div className="space-y-4">
                  {resume.experience?.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-indigo-500/40">
                      <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-slate-900" />
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                        <span className="text-xs text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{exp.duration}</span>
                      </div>
                      <div className="text-xs text-indigo-300 font-medium">{exp.company}</div>
                      <p className="text-xs text-slate-400 mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Work Samples & Video Reels</h3>
              
              {selectedVideo && (
                <div className="p-3 bg-black rounded-xl border border-indigo-500/40 space-y-2">
                  <div className="flex justify-between items-center text-xs text-indigo-300">
                    <span>Now Playing: {selectedVideo.title}</span>
                    <button onClick={() => setSelectedVideo(null)} className="text-slate-400 hover:text-white">Close Player</button>
                  </div>
                  <video src={selectedVideo.url} controls autoPlay className="w-full rounded-lg max-h-72 object-cover" />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolio.map((item, idx) => (
                  <div key={idx} className="group relative rounded-xl overflow-hidden bg-slate-800/60 border border-slate-700 hover:border-indigo-500 transition-all">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                            {item.type}
                          </span>
                          <h4 className="text-xs font-bold text-white mt-1">{item.title}</h4>
                        </div>
                        {item.type === 'video' && (
                          <button
                            onClick={() => setSelectedVideo(item)}
                            className="p-2 rounded-full bg-indigo-600 text-white hover:scale-110 transition-transform shadow-lg"
                          >
                            <Play className="w-4 h-4 fill-white" />
                          </button>
                        )}
                      </div>
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
                        ? 'bg-gradient-to-b from-indigo-950 to-slate-900 border-indigo-500 shadow-xl'
                        : 'bg-slate-800/40 border-slate-700/60'
                    }`}
                  >
                    <div>
                      {isFeatured && (
                        <span className="inline-block text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-indigo-500 text-white mb-3">
                          Most Popular
                        </span>
                      )}
                      <h4 className="text-base font-bold text-white capitalize">{pkg.name || `${tier} Tier`}</h4>
                      <div className="text-2xl font-extrabold text-indigo-300 mt-2">{formatPrice(pkg.price)}</div>
                      <div className="text-xs text-slate-400 mt-0.5">Delivery in {pkg.delivery}</div>
                      <p className="text-xs text-slate-300 mt-3 leading-relaxed">{pkg.description}</p>
                    </div>

                    <button
                      onClick={() => onHire && onHire(creator, pkg)}
                      className={`w-full mt-6 py-2 rounded-xl font-bold text-xs transition-all ${
                        isFeatured
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'
                          : 'bg-slate-700 hover:bg-slate-600 text-white'
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

        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-xl"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
}
