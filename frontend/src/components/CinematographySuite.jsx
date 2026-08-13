import React, { useState, useEffect } from 'react';
import { Play, Pause, Film, Video, Music, Camera, Layers, Sliders, Volume2, Sparkles, Move, Eye, CheckCircle2, RotateCw } from 'lucide-react';

export default function CinematographySuite() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playheadPos, setPlayheadPos] = useState(35); // percentage 0-100
  const [activeMotion, setActiveMotion] = useState('fpv'); // 'fpv', 'whip', 'dolly', 'anamorphic'
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline', 'camera', 'audio'

  // Scrub playhead animation loop
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayheadPos((prev) => (prev >= 98 ? 0 : prev + 0.4));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Motion Data
  const motions = {
    fpv: {
      title: "FPV Glacier Dive Shot",
      rig: "Custom 7-inch FPV Rig + RED V-Raptor 8K",
      specs: "120 FPS • 18mm Ultra-Wide • ISO 400",
      description: "Pro-level high-speed mountain dive with zero gimbal jitter and 8K ProRes RAW capture.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
    },
    whip: {
      title: "Seamless Whip-Pan Transition",
      rig: "Sony FX3 + Laowa 24mm Probe Lens",
      specs: "60 FPS • 24mm Macro • T14 Aperture",
      description: "Match-cut motion blur transition into product detail with kinetic sound sync.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
    },
    dolly: {
      title: "Cinematic Dolly Tracking Shot",
      rig: "ARRI Alexa Mini LF + Atlas Anamorphic",
      specs: "24 FPS • 50mm Anamorphic 2x • T2.0",
      description: "Smooth motorized slider tracking with shallow depth of field and oval bokeh.",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80"
    },
    anamorphic: {
      title: "Tokyo Cyberpunk Night Shot",
      rig: "Sony A7S III + Kowa Anamorphic Lens",
      specs: "24 FPS • ISO 12,800 • Blue Streak Flare",
      description: "Dual-native ISO low-light urban night shoot with anamorphic horizontal blue flares.",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80"
    }
  };

  const currentMotion = motions[activeMotion];

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 mb-1">
            <Film className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Post-Production & Cinematography Suite</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Live Editing Timeline & Camera Motion Preview</h2>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'timeline' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> NLE Editing Timeline
          </button>
          <button
            onClick={() => setActiveTab('camera')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'camera' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" /> FPV & Camera Motion
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'audio' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" /> Audio Visualizer
          </button>
        </div>
      </div>

      {/* ✂️ TAB 1: INTERACTIVE NLE EDITING TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          
          {/* Top Video Preview Monitor + Color Grading Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Monitor */}
            <div className="md:col-span-2 relative rounded-xl overflow-hidden bg-black border border-slate-800 h-64 group">
              <img src={currentMotion.image} alt={currentMotion.title} className="w-full h-full object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2.5 py-1 rounded bg-slate-900/90 text-emerald-400 font-mono font-bold border border-slate-700">
                    REC • 00:01:24:{Math.floor(playheadPos * 0.3).toString().padStart(2, '0')}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-indigo-950/90 text-indigo-300 font-bold border border-indigo-800">
                    ProRes 422 HQ 4K
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{currentMotion.title}</h3>
                    <p className="text-[11px] text-slate-300">{currentMotion.rig}</p>
                  </div>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-transform hover:scale-110"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Color Grading & FX Nodes */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-purple-400" /> Color Grading Nodes
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">DaVinci Node Tree</span>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="font-semibold text-slate-300">Node 01: Exposure & Contrast</span>
                  <span className="text-[10px] text-indigo-400 font-mono">+1.2 EV</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="font-semibold text-slate-300">Node 02: Teal & Orange LUT</span>
                  <span className="text-[10px] text-pink-400 font-mono">100% Opacity</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="font-semibold text-slate-300">Node 03: Anamorphic Flare FX</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Active</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="font-semibold text-slate-300">Node 04: Film Grain 35mm</span>
                  <span className="text-[10px] text-amber-400 font-mono">Fine ISO 200</span>
                </div>
              </div>
            </div>

          </div>

          {/* Timeline Track Controls & Playhead Scrub Bar */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            
            {/* Timeline Scrub Header */}
            <div className="relative h-6 bg-slate-900 rounded border border-slate-800 flex items-center px-2">
              <span className="text-[10px] font-mono text-slate-400">00:00:00</span>
              <span className="text-[10px] font-mono text-slate-400 mx-auto">00:01:30</span>
              <span className="text-[10px] font-mono text-slate-400">00:03:00</span>

              {/* Red Playhead Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-rose-500 shadow-md z-20 transition-all duration-75"
                style={{ left: `${playheadPos}%` }}
              >
                <div className="w-2.5 h-2.5 bg-rose-500 rounded-full -translate-x-[4px] -translate-y-1" />
              </div>
            </div>

            {/* Track 1: V2 (Motion Graphics & 3D Intros) */}
            <div className="flex items-center gap-2 text-xs">
              <span className="w-16 font-bold text-purple-400 font-mono text-[11px]">V2 (Overlay)</span>
              <div className="flex-1 h-8 rounded bg-purple-950/60 border border-purple-800/60 p-1 flex items-center gap-2 overflow-hidden">
                <div className="h-full w-1/3 bg-purple-600/40 rounded px-2 text-[10px] font-bold text-purple-200 flex items-center">
                  3D Logo Reveal (.mov)
                </div>
              </div>
            </div>

            {/* Track 2: V1 (A-Roll & B-Roll Video Footage) */}
            <div className="flex items-center gap-2 text-xs">
              <span className="w-16 font-bold text-indigo-400 font-mono text-[11px]">V1 (Video)</span>
              <div className="flex-1 h-8 rounded bg-indigo-950/60 border border-indigo-800/60 p-1 flex items-center gap-1.5 overflow-hidden">
                <div className="h-full w-1/4 bg-indigo-600/60 rounded px-2 text-[10px] font-bold text-white flex items-center">
                  Shot_01_A-Roll
                </div>
                <div className="h-full w-2/5 bg-cyan-600/60 rounded px-2 text-[10px] font-bold text-white flex items-center">
                  Shot_02_FPV_Dive (B-Roll)
                </div>
                <div className="h-full flex-1 bg-indigo-600/60 rounded px-2 text-[10px] font-bold text-white flex items-center">
                  Shot_03_Outro
                </div>
              </div>
            </div>

            {/* Track 3: A1 (Dialogue & Voiceover EQ) */}
            <div className="flex items-center gap-2 text-xs">
              <span className="w-16 font-bold text-emerald-400 font-mono text-[11px]">A1 (Dialogue)</span>
              <div className="flex-1 h-8 rounded bg-emerald-950/60 border border-emerald-800/60 p-1 flex items-center gap-2 overflow-hidden">
                <div className="h-full w-full bg-emerald-600/40 rounded px-2 text-[10px] font-bold text-emerald-200 flex items-center justify-between">
                  <span>Voiceover_Neumann_Mic.wav (Clean Dialogue EQ)</span>
                  <div className="flex items-center gap-0.5">
                    {[40, 70, 30, 90, 60, 40, 80, 50, 90, 40].map((h, i) => (
                      <div key={i} className="w-1 bg-emerald-400 rounded-full" style={{ height: `${h * 0.2}px` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Track 4: A2 (Sound FX & Music Score) */}
            <div className="flex items-center gap-2 text-xs">
              <span className="w-16 font-bold text-amber-400 font-mono text-[11px]">A2 (SFX/Music)</span>
              <div className="flex-1 h-8 rounded bg-amber-950/60 border border-amber-800/60 p-1 flex items-center gap-2 overflow-hidden">
                <div className="h-full w-full bg-amber-600/40 rounded px-2 text-[10px] font-bold text-amber-200 flex items-center justify-between">
                  <span>Cinematic_Bass_Swell_Foley.wav</span>
                  <span className="text-[9px] font-mono text-amber-300">-6 dB Normalized</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 🎥 TAB 2: FPV DRONE & CAMERA MOTION SIMULATOR */}
      {activeTab === 'camera' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'fpv', label: '🛸 FPV Mountain Dive' },
              { id: 'whip', label: '⚡ Whip-Pan B-Roll' },
              { id: 'dolly', label: '🎬 Dolly Slider Track' },
              { id: 'anamorphic', label: '🌃 Anamorphic Night' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMotion(m.id)}
                className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all ${
                  activeMotion === m.id
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="rounded-xl overflow-hidden bg-black border border-slate-800 h-72 relative">
              <img src={currentMotion.image} alt={currentMotion.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-400">Selected Camera Motion</span>
                <h3 className="text-base font-bold text-white">{currentMotion.title}</h3>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">{currentMotion.title}</h4>
                <p className="text-slate-300 leading-relaxed">{currentMotion.description}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between"><span className="text-slate-400">Camera Rig:</span> <strong className="text-white">{currentMotion.rig}</strong></div>
                <div className="flex justify-between"><span className="text-slate-400">Technical Specs:</span> <strong className="text-emerald-400 font-mono">{currentMotion.specs}</strong></div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 🎵 TAB 3: AUDIO SPECTRUM VISUALIZER */}
      {activeTab === 'audio' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-4">
            <h3 className="text-base font-bold text-white">Live Equalizer & Spatial Audio Spectrum</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Real-time dialogue cleaning, acoustic noise suppression, and spatial audio mastering visualizer.</p>

            {/* Equalizer Bars */}
            <div className="h-32 flex items-end justify-center gap-1.5 pt-4">
              {[45, 60, 85, 30, 95, 40, 70, 90, 50, 80, 100, 65, 40, 85, 95, 70, 50, 90, 30, 75, 60, 45, 80, 100, 65, 40].map((h, i) => (
                <div
                  key={i}
                  className="w-2.5 rounded-t bg-gradient-to-t from-indigo-600 via-purple-500 to-pink-500 transition-all duration-300"
                  style={{ height: isPlaying ? `${(h * (0.5 + Math.random() * 0.5))}%` : `${h * 0.3}%` }}
                />
              ))}
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              {isPlaying ? 'Pause Visualizer' : 'Start Audio Spectrum'}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
