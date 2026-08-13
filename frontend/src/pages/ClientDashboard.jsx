import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Briefcase, DollarSign, Calendar, MapPin, CheckCircle, FileText } from 'lucide-react';

export default function ClientDashboard() {
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Video Editing');
  const [budget, setBudget] = useState(500);
  const [deadline, setDeadline] = useState('2026-09-01');
  const [location, setLocation] = useState('Remote');
  const [description, setDescription] = useState('');
  const [skillsStr, setSkillsStr] = useState('Video Editing, Premiere Pro');

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  if (!user || (user.role !== 'client' && user.role !== 'admin')) {
    return (
      <div className="py-20 text-center text-slate-400">
        Please sign in as a Client to access the Job Posting Dashboard.
      </div>
    );
  }

  const handlePostJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('samsview_token')}`
        },
        body: JSON.stringify({
          title,
          category,
          budget,
          deadline,
          location,
          description,
          skills
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to post job');

      setMsg('Project posted successfully to SamsView Job Board!');
      setTitle('');
      setDescription('');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 glass-card flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-purple-400" /> Post New Creator Project
          </h1>
          <p className="text-xs text-slate-400 mt-1">Submit a project brief to receive bids from top video editors, audio engineers, and animators.</p>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold text-center">
          {msg}
        </div>
      )}

      <form onSubmit={handlePostJob} className="glass-card p-6 rounded-3xl space-y-6">
        
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Project Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Need Motion Graphics Intro & 10 YouTube Shorts Cut"
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            >
              <option value="Video Editing">Video Editing</option>
              <option value="Audio Editing">Audio & Podcast</option>
              <option value="Motion Graphics">Motion Graphics & 3D</option>
              <option value="Drone Videography">Drone Videography</option>
              <option value="Photography">Photography</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Total Budget ($ USD)</label>
            <input
              type="number"
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Deadline Date</label>
            <input
              type="date"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Target Location / Remote</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Remote / New York"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Required Skills (Comma separated)</label>
            <input
              type="text"
              value={skillsStr}
              onChange={(e) => setSkillsStr(e.target.value)}
              placeholder="Premiere Pro, Captions, Sound Design"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Project Brief & Deliverable Requirements</label>
          <textarea
            rows={5}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the footage length, desired outcome, reference links, and timeline expectations..."
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-xl hover:opacity-95 transition-all"
        >
          {loading ? 'Publishing Job...' : 'Publish Job Brief to Marketplace'}
        </button>

      </form>

    </div>
  );
}
