import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { PlusCircle, Briefcase, CheckCircle2, AlertCircle, ShieldCheck, DollarSign, Clock, MapPin, ArrowRight } from 'lucide-react';

export default function ClientDashboard() {
  const { user } = useAuth();
  const { formatPrice } = useCurrency();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Video Editing');
  const [skillsInput, setSkillsInput] = useState('Video Editing, Shorts Editing, Kinetic Captions');
  const [budget, setBudget] = useState('350');
  const [deadline, setDeadline] = useState('2026-09-15');
  const [location, setLocation] = useState('Mumbai, India');
  const [description, setDescription] = useState('Looking for an expert editor to cut 10 fast-paced tech Reels with Alex Hormozi style captions & SFX.');

  const [myJobs, setMyJobs] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = () => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMyJobs(data.filter(j => j.clientId === user?.id || user?.role === 'client'));
        }
      })
      .catch(err => console.error(err));
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          category,
          skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean),
          budget: Number(budget),
          deadline,
          location,
          description
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to post job');

      setMsg('Project posted successfully! AI Vector Matcher is indexing candidates.');
      setTitle('');
      fetchMyJobs();
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveWork = async (jobId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/jobs/${jobId}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to approve deliverable');

      setMsg(data.message);
      fetchMyJobs();
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Title Banner */}
        <div className="p-6 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0f172a]">Hiring Client Studio Dashboard</h1>
            <p className="text-xs text-[#64748b]">Post projects, review candidate proposals, approve deliverables, and release escrow payments.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#f8fafc] text-[#000000] border border-[#e2e8f0] text-xs font-bold">
            Client Account: {user?.name}
          </span>
        </div>

        {/* Feedback Alert */}
        {msg && (
          <div className="p-4 rounded-2xl bg-slate-100 border border-[#000000] text-[#000000] text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#000000]" />
            <span>{msg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Post New Project Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-[#e2e8f0] p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-extrabold text-[#0f172a] flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#000000]" /> Post a New Freelance Project
            </h2>

            <form onSubmit={handlePostJob} className="space-y-4">
              
              <div>
                <label className="text-xs font-bold text-[#404145]">Project Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Need Senior Video Editor for 10 Tech Reels"
                  className="bw-input w-full mt-1 px-3 py-2 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#404145]">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bw-input w-full mt-1 px-3 py-2 text-xs font-bold bg-white"
                  >
                    <option value="Video Editing">Video Editing</option>
                    <option value="Audio Editing">Audio & Podcast</option>
                    <option value="Motion Graphics">Motion Graphics & 3D</option>
                    <option value="Drone Videography">Drone & FPV Flying</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#404145]">Budget (₹)</label>
                  <input
                    type="number"
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="350"
                    className="bw-input w-full mt-1 px-3 py-2 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#404145]">Location Scope</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Mumbai / Remote"
                    className="bw-input w-full mt-1 px-3 py-2 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#404145]">Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="bw-input w-full mt-1 px-3 py-2 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#404145]">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="bw-input w-full mt-1 px-3 py-2 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#404145]">Detailed Description & Milestones</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bw-input w-full mt-1 p-3 text-xs font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bw-btn-black w-full py-3 text-xs shadow-sm transition-all"
              >
                {loading ? 'Posting...' : 'Publish Freelance Project'}
              </button>

            </form>
          </div>

          {/* Right Column: Manage Posted Projects & Escrow Approvals */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-[#e2e8f0] p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-extrabold text-[#0f172a] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#000000]" /> Active Projects & Escrow Approvals ({myJobs.length})
            </h2>

            <div className="space-y-4">
              {myJobs.map((j) => (
                <div key={j.id} className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#0f172a]">{j.title}</h3>
                      <p className="text-xs text-[#64748b] mt-0.5">Budget: {formatPrice(j.budget)} • Proposals: {j.proposalsCount || 0}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      j.status === 'completed' ? 'bg-[#000000] text-white' :
                      j.status === 'hired' ? 'bg-slate-800 text-white' : 'bg-slate-200 text-[#0f172a]'
                    }`}>
                      {j.status}
                    </span>
                  </div>

                  {j.status === 'hired' && (
                    <div className="p-3 rounded-xl bg-white border border-[#e2e8f0] text-xs space-y-2">
                      <div className="font-bold text-[#0f172a]">Hired Creator: {j.hiredCreatorName}</div>
                      <div className="text-[#64748b]">Escrow Status: <strong className="text-[#000000]">{j.escrowStatus?.toUpperCase()}</strong></div>
                      
                      {j.deliverableStatus === 'submitted' && (
                        <div className="space-y-2 pt-2 border-t border-[#e2e8f0]">
                          <span className="text-xs font-bold text-[#000000]">📦 Freelancer Submitted Work!</span>
                          <button
                            onClick={() => handleApproveWork(j.id)}
                            className="bw-btn-black w-full py-2 text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                          >
                            <ShieldCheck className="w-4 h-4" /> Approve & Release Payment (₹{j.agreedAmount || j.budget})
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
