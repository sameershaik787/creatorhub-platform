import React, { useState } from 'react';
import { Sparkles, X, CheckCircle2, ArrowRight, Star, MapPin, DollarSign, Bot } from 'lucide-react';
import ResumeViewer from './ResumeViewer';

export default function AIRecommendModal({ onClose, onSelectCreator }) {
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inspectingCreator, setInspectingCreator] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setRecommendations(data.recommendations || []);
    } catch (err) {
      alert('AI Recommendation query failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                RAG AI Creator Matcher
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-800 font-semibold">AI Powered</span>
              </h2>
              <p className="text-xs text-slate-400">Describe your project requirements in plain language to find the perfect creator.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Project Brief & Requirements</label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. I need an experienced video editor in Los Angeles or Remote with Premiere Pro skills to cut 10 fast-paced tech Shorts with captions under $800..."
              className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold text-xs rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-pink-300" />
            {loading ? 'Querying RAG Vector Index...' : 'Find AI Recommended Creators'}
          </button>
        </form>

        {/* Recommendations Output */}
        {recommendations.length > 0 && (
          <div className="space-y-4 pt-2">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-indigo-400">Top RAG AI Matches:</h3>
            <div className="space-y-3">
              {recommendations.map(({ creator, matchScore, rationale }, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/40" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{creator.name}</h4>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {matchScore}% Match
                        </span>
                      </div>
                      <p className="text-xs text-indigo-300">{creator.title}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{rationale}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => setInspectingCreator(creator)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                    >
                      Resume
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectCreator(creator);
                      }}
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md"
                    >
                      Chat / Hire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {inspectingCreator && (
        <ResumeViewer
          creator={inspectingCreator}
          onClose={() => setInspectingCreator(null)}
          onHire={(c) => {
            setInspectingCreator(null);
            onClose();
            onSelectCreator(c);
          }}
        />
      )}
    </div>
  );
}
