import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import ResumeViewer from '../components/ResumeViewer';
import { ShieldAlert, CheckCircle2, Users, Briefcase, DollarSign, Activity, Lock, AlertCircle, FileText, UserCheck, Check, Globe, Eye, Download, Play } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { formatPrice, selectedCurrency, setCurrency } = useCurrency();

  const [stats, setStats] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [selectedCreator, setSelectedCreator] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    fetchAdminData();
  }, [user]);

  const fetchAdminData = () => {
    setLoading(true);
    const token = localStorage.getItem('token') || localStorage.getItem('samsview_token');
    fetch('/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.stats) {
          setStats(data.stats);
          setUsersList(data.users || []);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleVerifyCreator = (creatorId, creatorName) => {
    const token = localStorage.getItem('token') || localStorage.getItem('samsview_token');
    fetch(`/api/admin/verify-creator/${creatorId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setMsg(`✅ Creator ${creatorName || creatorId} has been successfully APPROVED and VERIFIED!`);
        fetchAdminData();
      })
      .catch(err => alert('Verification failed'));
  };

  const handleInspectUser = (u) => {
    // Construct or select full creator object for ResumeViewer modal
    setSelectedCreator({
      ...u,
      title: u.title || (u.role === 'creator' ? 'Senior Content Creator & Editor' : 'Hiring Client'),
      location: u.location || 'Mumbai, India',
      hourlyRate: u.hourlyRate || 45,
      rating: u.rating || 5.0,
      reviewsCount: u.reviewsCount || 42,
      skills: u.skills || ['Video Editing', 'Motion Graphics', 'Color Grading'],
      portfolio: u.portfolio || [
        { title: '4K Commercial Edit', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { title: 'Cinematic Color Grading Pass', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }
      ]
    });
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="py-12 px-8 text-center text-slate-700 bg-white rounded-3xl border border-[#e2e8f0] shadow-sm max-w-md space-y-4">
          <Lock className="w-12 h-12 text-rose-600 mx-auto" />
          <h2 className="text-xl font-extrabold text-[#0f172a]">Admin Access Restricted</h2>
          <p className="text-xs text-[#64748b]">Log in with admin credentials (<code className="bg-slate-100 px-2 py-1 rounded text-rose-600 font-bold">admin@creatorhub.com / admin123</code>) to access platform management.</p>
        </div>
      </div>
    );
  }

  // Filter pending unverified creators
  const pendingCreators = usersList.filter(u => u.role === 'creator' && !u.verified);
  const verifiedCreators = usersList.filter(u => u.role === 'creator' && u.verified);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans py-8 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header with INR Global Currency Selector */}
        <div className="p-6 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-600" />
              <h1 className="text-2xl font-extrabold text-[#0f172a]">CreatorHub Admin Command Center</h1>
            </div>
            <p className="text-xs text-[#64748b] mt-1">Click any user row to view their profile, digital resume, and download work samples.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Global Currency Selection dropdown defaulting to INR (₹) */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-xs font-bold text-[#0f172a]">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px] text-slate-500 font-semibold">Global Currency:</span>
              <select
                value={selectedCurrency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-xs font-extrabold focus:outline-none cursor-pointer text-[#000000]"
              >
                <option value="INR">INR (₹) India</option>
                <option value="USD">USD ($) Global</option>
                <option value="EUR">EUR (€) Europe</option>
                <option value="GBP">GBP (£) UK</option>
              </select>
            </div>

            <span className="px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-extrabold">
              Admin Session
            </span>
          </div>
        </div>

        {msg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold text-center animate-fadeIn">
            {msg}
          </div>
        )}

        {/* 🎯 1. PENDING CREATOR APPROVAL QUEUE */}
        <div className="p-6 rounded-3xl bg-white border border-[#e2e8f0] space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#000000]" />
              <h2 className="text-lg font-extrabold text-[#0f172a]">
                Pending Creator Approvals ({pendingCreators.length})
              </h2>
            </div>
            <span className="text-xs text-amber-800 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Action Required
            </span>
          </div>

          {pendingCreators.length === 0 ? (
            <div className="text-center py-6 text-xs text-[#64748b] bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
              ✅ All creator profile applications have been reviewed and approved!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingCreators.map((creator) => (
                <div key={creator.id} className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col justify-between space-y-3">
                  <div className="flex items-start gap-3">
                    <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#000000]" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#0f172a]">{creator.name}</h3>
                        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
                          Pending
                        </span>
                      </div>
                      <p className="text-xs text-[#000000] font-semibold">{creator.title}</p>
                      <p className="text-[11px] text-[#64748b]">{creator.location} • Rate: {formatPrice(creator.hourlyRate)}/hr</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {creator.skills?.slice(0, 3).map((s, i) => (
                          <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-white text-[#0f172a] border border-[#e2e8f0]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#e2e8f0]">
                    <button
                      onClick={() => handleInspectUser(creator)}
                      className="flex-1 py-2 rounded-lg bg-white border border-[#e2e8f0] text-xs font-bold text-[#0f172a] hover:bg-slate-50 transition-all flex items-center justify-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-500" /> Inspect Resume & Samples
                    </button>
                    <button
                      onClick={() => handleVerifyCreator(creator.id, creator.name)}
                      className="flex-1 py-2 rounded-lg bg-[#000000] hover:bg-[#1e293b] text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" /> Approve & Verify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 📊 2. ANALYTICS CARDS (INR FORMATTED) */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-1">
              <div className="flex items-center justify-between text-[#64748b] text-xs font-bold uppercase">
                <span>Total Registered Users</span>
                <Users className="w-4 h-4 text-slate-700" />
              </div>
              <div className="text-2xl font-extrabold text-[#0f172a]">{stats.totalUsers}</div>
              <div className="text-[11px] text-[#64748b]">{stats.creatorsCount} Creators • {stats.clientsCount} Clients</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-1">
              <div className="flex items-center justify-between text-[#64748b] text-xs font-bold uppercase">
                <span>Total Escrow Volume (INR ₹)</span>
                <DollarSign className="w-4 h-4 text-[#000000]" />
              </div>
              <div className="text-2xl font-extrabold text-[#000000]">{formatPrice(stats.totalVolume || 450000)}</div>
              <div className="text-[11px] text-[#64748b]">Indian project escrow volume</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-1">
              <div className="flex items-center justify-between text-[#64748b] text-xs font-bold uppercase">
                <span>Active Job Briefs</span>
                <Briefcase className="w-4 h-4 text-slate-700" />
              </div>
              <div className="text-2xl font-extrabold text-[#0f172a]">{stats.totalJobs}</div>
              <div className="text-[11px] text-[#64748b]">{stats.totalProposals} Proposals submitted</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-1">
              <div className="flex items-center justify-between text-[#64748b] text-xs font-bold uppercase">
                <span>Creator Approval Rate</span>
                <Activity className="w-4 h-4 text-slate-700" />
              </div>
              <div className="text-2xl font-extrabold text-[#0f172a]">
                {Math.round((verifiedCreators.length / (usersList.filter(u => u.role === 'creator').length || 1)) * 100)}%
              </div>
              <div className="text-[11px] text-[#64748b]">{verifiedCreators.length} Verified Creators</div>
            </div>
          </div>
        )}

        {/* 📋 3. COMPLETE USER & CREATOR REGISTRY (INTERACTIVE CLICKABLE ROWS) */}
        <div className="p-6 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
            <h2 className="text-base font-extrabold text-[#0f172a]">Complete User & Creator Registry</h2>
            <span className="text-xs font-bold text-[#000000]">💡 Click any user row to view profile & download work samples</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8fafc] text-[#64748b] uppercase font-bold border-b border-[#e2e8f0]">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Location Scope</th>
                  <th className="p-3">Verification Status</th>
                  <th className="p-3">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {usersList.map((u) => (
                  <tr
                    key={u.id}
                    onClick={() => handleInspectUser(u)}
                    className="hover:bg-slate-100 transition-colors cursor-pointer group"
                  >
                    <td className="p-3 flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-[#e2e8f0] group-hover:ring-[#000000] transition-all" />
                      <div>
                        <div className="font-extrabold text-[#0f172a] group-hover:text-[#000000] flex items-center gap-1.5">
                          <span>{u.name}</span>
                          <Eye className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[10px] text-[#64748b]">{u.email}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        u.role === 'creator' ? 'bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0]' :
                        u.role === 'admin' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-slate-100 text-[#0f172a] border border-[#e2e8f0]'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-[#334155] font-semibold">{u.location || 'Mumbai, India'}</td>
                    <td className="p-3">
                      {u.verified ? (
                        <span className="text-[#000000] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#000000]" /> Verified
                        </span>
                      ) : (
                        <span className="text-amber-700 font-bold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Pending Approval
                        </span>
                      )}
                    </td>
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleInspectUser(u)}
                          className="px-3 py-1 bg-white border border-[#e2e8f0] hover:bg-slate-100 text-[#0f172a] font-bold rounded-lg transition-all flex items-center gap-1 text-[11px]"
                        >
                          <FileText className="w-3 h-3 text-[#000000]" /> Inspect Profile
                        </button>

                        {u.role === 'creator' && !u.verified && (
                          <button
                            onClick={() => handleVerifyCreator(u.id, u.name)}
                            className="px-3 py-1 bg-[#000000] hover:bg-[#1e293b] text-white font-bold rounded-lg transition-all text-[11px]"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resume Viewer Modal with Work Samples Download */}
        {selectedCreator && (
          <ResumeViewer
            creator={selectedCreator}
            onClose={() => setSelectedCreator(null)}
          />
        )}

      </div>
    </div>
  );
}
