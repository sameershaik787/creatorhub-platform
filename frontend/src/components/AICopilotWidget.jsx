import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, RefreshCw } from 'lucide-react';

export default function AICopilotWidget({ onSelectCreator }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "👋 Hi! I'm **CreatorHub AI Assistant** powered by RAG.\nAsk me anything about creator pricing, contract terms, or matching video editors & sound engineers!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userQuery = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userQuery })
      });
      const data = await res.json();
      
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: data.answer,
          creators: data.recommendedCreators || [],
          docs: data.retrievedDocs || []
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: "Apologies, I encountered an issue retrieving context. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const setPromptSuggestion = (text) => {
    setInput(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 border border-slate-700 text-white font-extrabold text-xs shadow-2xl hover:bg-slate-800 transition-all"
        >
          <Bot className="w-4 h-4 text-indigo-400" />
          <span>CreatorHub AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Floating Chat Box */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-[#0f172a] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                AI
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  CreatorHub AI Assistant
                </div>
                <div className="text-[10px] text-slate-400">RAG Contextual Intelligence</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-slate-950/80 border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto text-[10px] no-scrollbar">
            <span className="text-slate-500 font-bold">Ask AI:</span>
            <button
              onClick={() => setPromptSuggestion("Find me top video editors in LA")}
              className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 hover:border-indigo-500 hover:text-white whitespace-nowrap"
            >
              🎬 LA Editors
            </button>
            <button
              onClick={() => setPromptSuggestion("Standard rates for 10 YouTube Shorts")}
              className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 hover:border-purple-500 hover:text-white whitespace-nowrap"
            >
              💰 Shorts Pricing
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/40 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none font-medium'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.text}

                  {m.creators && m.creators.length > 0 && (
                    <div className="mt-3 space-y-2 border-t border-slate-800 pt-2">
                      <div className="text-[10px] uppercase font-bold text-indigo-400">Top RAG Creator Matches:</div>
                      {m.creators.map(({ creator, matchScore }, i) => (
                        <div key={i} className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <img src={creator.avatar} alt={creator.name} className="w-6 h-6 rounded-full object-cover" />
                            <div>
                              <div className="font-bold text-white text-[11px]">{creator.name}</div>
                              <div className="text-[9px] text-slate-400">{creator.title}</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-400">
                            {matchScore}% Match
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-[11px] text-slate-400 p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>Querying CreatorHub index...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask CreatorHub AI..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
