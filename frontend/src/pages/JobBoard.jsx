import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { Briefcase, DollarSign, Clock, MapPin, Send, CheckCircle2, User, PlusCircle, AlertCircle, ArrowRight, ShieldCheck, Lock, Upload, Star, MessageSquare } from 'lucide-react';

export default function JobBoard() {
  const { user } = useAuth();
  const { formatPrice } = useCurrency();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [proposals, setProposals] = useState([]);

  // Form States
  const [bidAmount, setBidAmount] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  // Deliverable Submission State (Freelancer)
  const [deliverableUrl, setDeliverableUrl] = useState('https://www.w3schools.com/html/mov_bbb.mp4');
  const [deliverableNotes, setDeliverableNotes] = useState('Completed 4K video reel edit ready for client review.');

  // Review Submission State (Client)
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('Excellent work quality and fast delivery!');

  // Feedback State
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    setLoading(true);
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(Array.isArray(data) ? data : []);
        if (data.length > 0 && !selectedJob) {
          setSelectedJob(data[0]);
          fetchProposals(data[0].id);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const fetchProposals = (jobId) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch(`/api/jobs/${jobId}/proposals`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setProposals(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  };

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setActionSuccess('');
    setActionError('');
    fetchProposals(job.id);
  };

  // 1. Submit Proposal (Freelancer)
  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    setActionError('');
    setActionSuccess('');
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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

      setActionSuccess('Proposal submitted successfully!');
      setBidAmount('');
      setEstimatedDays('');
      setCoverLetter('');
      fetchProposals(selectedJob.id);
      fetchJobs();
    } catch (err) {
      setActionError(err.message);
    }
  };

  // 2. Hire Freelancer & Fund Escrow (Client)
  const handleHireCreator = async (proposalId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/proposals/${proposalId}/hire`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to hire creator');

      setActionSuccess(data.message);
      setSelectedJob(data.job);
      fetchProposals(selectedJob.id);
      fetchJobs();
    } catch (err) {
      setActionError(err.message);
    }
  };

  // 3. Submit Deliverable (Freelancer)
  const handleSubmitDeliverable = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/jobs/${selectedJob.id}/deliver`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ deliverableUrl, notes: deliverableNotes })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit deliverable');

      setActionSuccess(data.message);
      setSelectedJob(data.job);
      fetchJobs();
    } catch (err) {
      setActionError(err.message);
    }
  };

  // 4. Approve Deliverable & Release Escrow Payment (Client)
  const handleApproveDeliverable = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/jobs/${selectedJob.id}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to approve deliverable');

      setActionSuccess(data.message);
      setSelectedJob(data.job);
      fetchJobs();
    } catch (err) {
      setActionError(err.message);
    }
  };

  // 5. Submit Rating & Review (Client)
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/jobs/${selectedJob.id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating: reviewRating, comment: reviewComment })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit review');

      setActionSuccess(data.message);
      fetchJobs();
    } catch (err) {
      setActionError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Workflow Steps Indicator Bar */}
      <div className="max-w-7xl mx-auto mb-8 p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-extrabold text-[#000000]">
          <span>⚡ End-to-End Freelance Milestone Workflow</span>
          <span className="text-[#64748b] font-normal">India Scope • INR (₹) Escrow</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-[10px] text-center font-bold">
          <div className="p-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a]">1. Post Project</div>
          <div className="p-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a]">2. Send Proposal</div>
          <div className="p-2 rounded-lg bg-[#000000] text-white">3. Hire & Fund Escrow</div>
          <div className="p-2 rounded-lg bg-[#f8fafc] border border-[#000000] text-[#000000]">4. Submit Work</div>
          <div className="p-2 rounded-lg bg-[#000000] text-white">5. Client Approve</div>
          <div className="p-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a]">6. Release Earnings</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Job List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#0f172a] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#000000]" /> Open Projects ({jobs.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12 text-[#64748b] text-xs font-semibold">Loading project listings...</div>
          ) : (
            <div className="space-y-3">
              {jobs.map((j) => (
                <div
                  key={j.id}
                  onClick={() => handleSelectJob(j)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    selectedJob?.id === j.id
                      ? 'bg-white border-[#000000] shadow-md ring-1 ring-[#000000]'
                      : 'bg-white border-[#e2e8f0] hover:border-slate-400 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-[#000000] border border-[#e2e8f0]">
                        {j.category}
                      </span>
                      <h3 className="text-base font-bold text-[#0f172a] mt-1">{j.title}</h3>
                    </div>
                    <span className="text-sm font-extrabold text-[#000000] bg-slate-100 px-2.5 py-1 rounded-lg border border-[#e2e8f0]">
                      {formatPrice(j.budget)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#64748b]">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {j.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-500" /> {j.deadline}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#e2e8f0]">
                    <span className="text-[#64748b] font-medium">Proposals: <strong className="text-[#0f172a]">{j.proposalsCount || 0}</strong></span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      j.status === 'completed' ? 'bg-[#000000] text-white' :
                      j.status === 'hired' ? 'bg-slate-800 text-white' : 'bg-slate-200 text-[#0f172a]'
                    }`}>
                      {j.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Active Job Workspace & Lifecycle Details */}
        <div className="lg:col-span-7 space-y-6">
          {selectedJob ? (
            <div className="bg-white rounded-3xl border border-[#e2e8f0] p-6 shadow-sm space-y-6">
              
              {/* Job Header */}
              <div className="space-y-3 border-b border-[#e2e8f0] pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#64748b]">Posted by {selectedJob.clientName} ({selectedJob.clientCompany})</span>
                  <span className="text-lg font-extrabold text-[#000000]">{formatPrice(selectedJob.budget)}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#0f172a]">{selectedJob.title}</h2>
                <p className="text-xs text-[#334155] leading-relaxed">{selectedJob.description}</p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedJob.skills?.map((s, idx) => (
                    <span key={idx} className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Feedback Banners */}
              {actionSuccess && (
                <div className="p-3 rounded-xl bg-slate-100 border border-[#000000] text-[#000000] text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#000000]" />
                  <span>{actionSuccess}</span>
                </div>
              )}

              {actionError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>{actionError}</span>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* WORKFLOW PHASE 1: FREELANCER SUBMIT PROPOSAL */}
              {/* ---------------------------------------------------- */}
              {user?.role === 'creator' && selectedJob.status === 'open' && (
                <form onSubmit={handleSubmitProposal} className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-4">
                  <h3 className="text-sm font-bold text-[#0f172a] flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#000000]" /> Submit Proposal to Client
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-[#404145]">Bid Amount (₹)</label>
                      <input
                        type="number"
                        required
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder="e.g. 300"
                        className="bw-input w-full px-3 py-2 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#404145]">Est. Days</label>
                      <input
                        type="number"
                        required
                        value={estimatedDays}
                        onChange={(e) => setEstimatedDays(e.target.value)}
                        placeholder="e.g. 3"
                        className="bw-input w-full px-3 py-2 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#404145]">Cover Letter</label>
                    <textarea
                      required
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Why are you the best fit for this project?"
                      className="bw-input w-full p-3 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bw-btn-black w-full py-2.5 text-xs shadow-sm transition-all"
                  >
                    Send Proposal Now
                  </button>
                </form>
              )}

              {/* ---------------------------------------------------- */}
              {/* WORKFLOW PHASE 2: CLIENT REVIEWS PROPOSALS & HIRES */}
              {/* ---------------------------------------------------- */}
              {user?.role === 'client' && selectedJob.status === 'open' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#0f172a]">Received Proposals ({proposals.length})</h3>
                  {proposals.length === 0 ? (
                    <div className="text-xs text-[#64748b] py-4 text-center">No proposals received yet.</div>
                  ) : (
                    proposals.map((p) => (
                      <div key={p.id} className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-[#0f172a]">{p.creatorName}</div>
                          <div className="text-[11px] text-[#64748b]">{p.coverLetter}</div>
                          <div className="text-[10px] text-[#000000] font-extrabold mt-1">Bid: {formatPrice(p.bidAmount)} • Delivery: {p.estimatedDays} Days</div>
                        </div>

                        <button
                          onClick={() => handleHireCreator(p.id)}
                          className="bw-btn-black px-4 py-2 text-xs shadow-sm transition-all"
                        >
                          Hire & Fund Escrow
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* WORKFLOW PHASE 3: FREELANCER SUBMITS DELIVERABLE */}
              {/* ---------------------------------------------------- */}
              {selectedJob.status === 'hired' && (
                <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#000000] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#000000] flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-[#000000]" /> Escrow Status: {selectedJob.escrowStatus?.toUpperCase()} (₹{selectedJob.agreedAmount || selectedJob.budget})
                    </span>
                    <span className="text-xs font-bold text-[#0f172a]">Hired: {selectedJob.hiredCreatorName}</span>
                  </div>

                  {user?.role === 'creator' && selectedJob.deliverableStatus !== 'submitted' && (
                    <form onSubmit={handleSubmitDeliverable} className="space-y-3">
                      <h4 className="text-xs font-bold text-[#0f172a]">Submit Completed Deliverable for Client Review</h4>
                      <input
                        type="text"
                        required
                        value={deliverableUrl}
                        onChange={(e) => setDeliverableUrl(e.target.value)}
                        placeholder="Video / Asset File URL"
                        className="bw-input w-full px-3 py-2 text-xs font-semibold"
                      />
                      <textarea
                        rows={2}
                        value={deliverableNotes}
                        onChange={(e) => setDeliverableNotes(e.target.value)}
                        placeholder="Notes for client..."
                        className="bw-input w-full p-2.5 text-xs"
                      />
                      <button
                        type="submit"
                        className="bw-btn-black w-full py-2.5 text-xs shadow-sm transition-all"
                      >
                        Submit Deliverable to Client
                      </button>
                    </form>
                  )}

                  {/* ---------------------------------------------------- */}
                  {/* WORKFLOW PHASE 4: CLIENT APPROVES WORK & RELEASES PAYMENT */}
                  {/* ---------------------------------------------------- */}
                  {user?.role === 'client' && selectedJob.deliverableStatus === 'submitted' && (
                    <div className="space-y-3 p-4 rounded-xl bg-white border border-[#e2e8f0]">
                      <h4 className="text-xs font-bold text-[#0f172a]">Freelancer Submitted Deliverable:</h4>
                      <p className="text-xs text-[#334155] font-mono italic">{selectedJob.deliverableNotes}</p>
                      <a href={selectedJob.deliverableUrl} target="_blank" rel="noreferrer" className="text-xs text-[#000000] underline font-bold block">
                        Preview Deliverable Video
                      </a>

                      <button
                        onClick={handleApproveDeliverable}
                        className="bw-btn-black w-full py-3 text-xs shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4" /> Approve Deliverable & Release Escrow Payment (₹{selectedJob.agreedAmount || selectedJob.budget})
                      </button>
                    </div>
                  )}

                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* WORKFLOW PHASE 5: COMPLETED JOB & RATING REVIEW */}
              {/* ---------------------------------------------------- */}
              {selectedJob.status === 'completed' && (
                <div className="p-5 rounded-2xl bg-slate-100 border border-[#000000] space-y-4">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#000000]">
                    <CheckCircle2 className="w-4 h-4 text-[#000000]" /> Project Completed & Escrow Released to Freelancer!
                  </div>

                  {user?.role === 'client' && (
                    <form onSubmit={handleSubmitReview} className="space-y-3 p-4 rounded-xl bg-white border border-[#e2e8f0]">
                      <h4 className="text-xs font-bold text-[#0f172a]">Leave 1-5 Star Review for {selectedJob.hiredCreatorName}:</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#404145]">Rating:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className={`p-1 rounded ${star <= reviewRating ? 'text-[#000000]' : 'text-slate-300'}`}
                          >
                            <Star className="w-5 h-5 fill-current" />
                          </button>
                        ))}
                      </div>
                      <textarea
                        rows={2}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Write client testimonial..."
                        className="bw-input w-full p-2.5 text-xs"
                      />
                      <button
                        type="submit"
                        className="bw-btn-black w-full py-2 text-xs shadow-sm transition-all"
                      >
                        Submit Testimonial & Review
                      </button>
                    </form>
                  )}
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#e2e8f0] text-[#64748b] text-xs font-semibold">
              Select a project from the left to view workspace details and lifecycle steps.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
