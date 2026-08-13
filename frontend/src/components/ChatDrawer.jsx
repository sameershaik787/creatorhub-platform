import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Paperclip, MessageSquare, Check, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ChatDrawer({ recipient, onClose }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!recipient || !user) return;
    
    fetch(`/api/messages/${recipient.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('samsview_token')}` }
    })
      .then(res => res.json())
      .then(data => {
        setMessages(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [recipient, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !user || !recipient) return;

    const newMsg = {
      receiverId: recipient.id,
      content: input.trim()
    };

    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('samsview_token')}`
      },
      body: JSON.stringify(newMsg)
    })
      .then(res => res.json())
      .then(saved => {
        setMessages(prev => [...prev, saved]);
        setInput('');
      })
      .catch(err => console.error('Failed to send message:', err));
  };

  if (!recipient) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-slideLeft">
      
      {/* Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={recipient.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
            alt={recipient.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/50"
          />
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              {recipient.name}
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-xs text-indigo-300">{recipient.title || 'Creator Workspace'}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/40">
        {loading ? (
          <div className="text-center text-xs text-slate-500 py-8">Loading conversation...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <MessageSquare className="w-8 h-8 text-indigo-500/50 mx-auto" />
            <p className="text-xs text-slate-400">Start the conversation with {recipient.name}!</p>
            <p className="text-[11px] text-slate-500">Discuss project scope, deliverables, and rates.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === user?.id;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Footer */}
      <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${recipient.name}...`}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
