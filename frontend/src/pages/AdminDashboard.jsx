import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ResumeViewer from '../components/ResumeViewer';
import { ShieldAlert, CheckCircle2, Users, Briefcase, DollarSign, Activity, Lock, AlertCircle, FileText, UserCheck, Check } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
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
    fetch('/api/admin/stats', {
      headers: { Authorization: `Bearer ${localStorage.getItem('samsview_token')}` }
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
    fetch(`/api/admin/verify-creator/${creatorId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${localStorage.getItem('samsview_token')}` }
    })
      .then(res => res.json())
      .then(data => {
        setMsg(`✅ Creator ${creatorName || creatorId} has been successfully APPROVED and VERIFIED!`);
        fetchAdminData();
      })
      .catch(err => alert('Verification failed'));
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="py-20 text-center text-slate-400 space-y-3">
        <Lock className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-white">Admin Access Restricted</h2>
        <p className="text-xs text-slate-500">Log in with admin credentials (<code className="text-rose-400">admin@creatorhub.com / admin123</code>) to access platform management.</p>
      </div>
    );
  }

  // Filter pending unverified creators
  const pendingCreators = usersList.filter(u => u.role === 'creator' && !u.verified);
  const verifiedCreators = usersList.filter(u => u.role === 'creator' && u.verified);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      
      {/* Admin Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
            <h1 className="text-2xl font-extrabold text-white">CreatorHub Admin Command Center</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Review pending creator applications, approve verification badges, and monitor platform stats.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-xs font-bold">
            Admin Verified Session
          </span>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold text-center animate-fadeIn">
          {msg}
        </div>
      )}

      {/* 🎯 1. PENDING CREATOR APPROVAL QUEUE (PROMINENT SECTION) */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-amber-900/60 pb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-extrabold text-white">
              Pending Creator Approvals ({pendingCreators.length})
            </h2>
          </div>
          <span className="text-xs text-amber-300 font-semibold bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
            Action Required
          </span>
        </div>

        {pendingCreators.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400 bg-slate-950/50 rounded-xl border border-slate-800/60">
            ✅ All creator profile applications have been reviewed and approved!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingCreators.map((creator) => (
              <div key={creator.id} className="p-4 rounded-xl bg-slate-950 border border-amber-800/50 flex flex-col justify-between space-y-3">
                <div className="flex items-start gap-3">
                  <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-500/40" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{creator.name}</h3>
                      <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                        Pending
                      </span>
                    </div>
                    <p className="text-xs text-indigo-300 font-medium">{creator.title}</p>
                    <p className="text-[11px] text-slate-400">{creator.location} • ${creator.hourlyRate}/hr</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {creator.skills?.slice(0, 3).map((s, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedCreator(creator)}
                    className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all flex items-center justify-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" /> Inspect Resume
                  </button>
                  <button
                    onClick={() => handleVerifyCreator(creator.id, creator.name)}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1"
                  >
                    <Check className="w-4 h-4" /> Approve & Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Analytics Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Total Users</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">{stats.totalUsers}</div>
            <div className="text-[11px] text-slate-400">{stats.creatorsCount} Creators • {stats.clientsCount} Clients</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Total GMV Volume</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-400">${stats.totalVolume?.toLocaleString()}</div>
            <div className="text-[11px] text-slate-400">Escrow project volume</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Active Job Briefs</span>
              <Briefcase className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">{stats.totalJobs}</div>
            <div className="text-[11px] text-slate-400">{stats.totalProposals} Proposals submitted</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Approval Rate</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-extrabold text-purple-400">
              {Math.round((verifiedCreators.length / (usersList.filter(u => u.role === 'creator').length || 1)) * 100)}%
            </div>
            <div className="text-[11px] text-slate-400">{verifiedCreators.length} Verified Creators</div>
          </div>
        </div>
      )}

      {/* Complete User Directory */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">Complete User & Creator Registry</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">Location</th>
                <th className="p-3">Verification Status</th>
                <th className="p-3">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {usersList.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40">
                  <td className="p-3 flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-white">{u.name}</div>
                      <div className="text-[10px] text-slate-400">{u.email}</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      u.role === 'creator' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' :
                      u.role === 'admin' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      'bg-purple-950 text-purple-300 border border-purple-800'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">{u.location || 'Remote'}</td>
                  <td className="p-3">
                    {u.verified ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Pending Approval
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {u.role === 'creator' && !u.verified ? (
                      <button
                        onClick={() => handleVerifyCreator(u.id, u.name)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-slate-500 italic">No action needed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resume Viewer Modal */}
      {selectedCreator && (
        <ResumeViewer
          creator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
        />
      )}

    </div>
  );
}
