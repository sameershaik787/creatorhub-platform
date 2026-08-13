import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Briefcase, PlusCircle, DollarSign, Calendar, MapPin, Send, CheckCircle2, Clock, X } from 'lucide-react';

export default function JobBoard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  // Proposal modal state
  const [bidAmount, setBidAmount] = useState(500);
  const [estimatedDays, setEstimatedDays] = useState(3);
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [proposalSuccess, setProposalSuccess] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    setLoading(true);
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    if (!selectedJob || !user) return;

    setSubmitting(true);
    setProposalSuccess('');

    try {
      const res = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('samsview_token')}`
        },
        body: JSON.stringify({
          jobId: selectedJob.id,
          bidAmount: Number(bidAmount),
          estimatedDays: Number(estimatedDays),
          coverLetter
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit proposal');

      setProposalSuccess('Proposal submitted successfully!');
      fetchJobs();
      setTimeout(() => {
        setSelectedJob(null);
        setProposalSuccess('');
      }, 1500);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Briefcase className="w-7 h-7 text-amber-400" /> Freelance Project Marketplace
          </h1>
          <p className="text-xs text-slate-400 mt-1">Browse active video editing, podcast sound design, and 3D graphics projects posted by global clients.</p>
        </div>
      </div>

      {/* Job Board Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading open project briefs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-400">
          No open freelance jobs found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/50">
                      {job.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{job.title}</h3>
                  </div>
                  <span className="text-lg font-extrabold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-xl">
                    ${job.budget}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{job.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {job.skills?.map((s, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-purple-400" /> Deadline: {job.deadline}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-500" /> {job.proposalsCount || 0} Proposals</span>
                </div>
              </div>

              <div className="pt-2">
                {user?.role === 'creator' ? (
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setBidAmount(job.budget);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Submit Proposal
                  </button>
                ) : (
                  <div className="text-center text-[11px] text-slate-500 italic">
                    Sign in as a Creator to submit proposals for this job.
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Proposal Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Submit Proposal for:</h3>
                <p className="text-xs text-indigo-300 font-semibold line-clamp-1">{selectedJob.title}</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {proposalSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold text-center">
                {proposalSuccess}
              </div>
            )}

            <form onSubmit={handleSubmitProposal} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Your Bid Amount ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Estimated Days</label>
                  <input
                    type="number"
                    required
                    value={estimatedDays}
                    onChange={(e) => setEstimatedDays(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Cover Letter & Portfolio Pitch</label>
                <textarea
                  rows={4}
                  required
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Explain why you are the best fit for this project, past work samples, software used, and estimated workflow..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all"
                >
                  {submitting ? 'Sending...' : 'Send Proposal'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
