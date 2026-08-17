import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { User, FileText, Upload, CheckCircle2, DollarSign, Award, Sliders, AlertCircle, ShieldCheck, Lock } from 'lucide-react';

export default function CreatorDashboard() {
  const { user, login } = useAuth();
  const { formatPrice } = useCurrency();

  const [creator, setCreator] = useState(user);
  const [resumeFile, setResumeFile] = useState(null);
  const [bio, setBio] = useState(user?.bio || '');
  const [hourlyRate, setHourlyRate] = useState(user?.hourlyRate || 45);
  const [available, setAvailable] = useState(user?.available ?? true);
  const [equipmentInput, setEquipmentInput] = useState(user?.equipment?.join(', ') || '');

  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/creators/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) setCreator(data);
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/creators/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bio,
          hourlyRate: Number(hourlyRate),
          available,
          equipment: equipmentInput.split(',').map(s => s.trim()).filter(Boolean)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');

      setCreator(data);
      setMsg('Profile and rate settings updated successfully!');
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) return;
    setLoading(true);
    setMsg('');

    const formData = new FormData();
    formData.append('resume', resumeFile);

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/creators/upload-resume', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload resume');

      setMsg('Digital Resume uploaded successfully!');
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md p-8 bg-white rounded-3xl border border-[#e2e8f0] shadow-sm">
          <User className="w-12 h-12 text-[#000000] mx-auto" />
          <h2 className="text-xl font-bold text-[#0f172a]">Sign in to Access Creator Dashboard</h2>
          <p className="text-xs text-[#64748b]">Manage your earnings balance, equipment rig, rate packages, and digital resume.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={creator?.avatar || user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-[#000000]" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[#0f172a]">{user.name}</h1>
                {creator?.verified && <CheckCircle2 className="w-5 h-5 text-[#000000]" />}
              </div>
              <p className="text-xs text-[#000000] font-semibold">{creator?.title || user.title}</p>
              <p className="text-xs text-[#64748b] mt-0.5">Location: {creator?.location || 'Mumbai, India'}</p>
            </div>
          </div>

          {/* Earnings & Escrow Metrics Cards */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1 text-center min-w-[130px]">
              <div className="text-[10px] font-bold uppercase text-slate-300">Total Earnings</div>
              <div className="text-xl font-extrabold text-white">{formatPrice(creator?.earnings || 12500)}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 border border-[#e2e8f0] space-y-1 text-center min-w-[130px]">
              <div className="text-[10px] font-bold uppercase text-[#64748b]">In Escrow</div>
              <div className="text-xl font-extrabold text-[#0f172a]">{formatPrice(creator?.escrowBalance || 0)}</div>
            </div>
          </div>
        </div>

        {/* Feedback Alert */}
        {msg && (
          <div className="p-4 rounded-2xl bg-slate-100 border border-[#000000] text-[#000000] text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#000000]" />
            <span>{msg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile & Equipment Settings */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#e2e8f0] p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-extrabold text-[#0f172a] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#000000]" /> Profile & Rate Settings
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              
              <div>
                <label className="text-xs font-bold text-[#404145]">Bio Summary</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bw-input w-full mt-1 p-3 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#404145]">Hourly Rate (₹)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="bw-input w-full mt-1 px-3 py-2 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#404145]">Availability Status</label>
                  <select
                    value={available ? 'true' : 'false'}
                    onChange={(e) => setAvailable(e.target.value === 'true')}
                    className="bw-input w-full mt-1 px-3 py-2 text-xs font-bold bg-white"
                  >
                    <option value="true">🟢 Available for Work</option>
                    <option value="false">🔴 Busy / Fully Booked</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#404145]">Equipment Rig & Software (Comma separated)</label>
                <input
                  type="text"
                  value={equipmentInput}
                  onChange={(e) => setEquipmentInput(e.target.value)}
                  placeholder="Sony FX3, DJI Ronin, DaVinci Resolve Studio"
                  className="bw-input w-full mt-1 px-3 py-2 text-xs font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bw-btn-black w-full py-3 text-xs shadow-sm transition-all"
              >
                {loading ? 'Saving...' : 'Update Settings'}
              </button>

            </form>
          </div>

          {/* Right Column: Digital Resume File Upload */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#e2e8f0] p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-extrabold text-[#0f172a] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#000000]" /> Digital Resume Upload
            </h2>

            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
              <div className="text-xs font-bold text-[#0f172a]">Current Uploaded Resume:</div>
              <p className="text-xs text-[#000000] font-mono font-bold">{creator?.resume?.title || 'Ronak_Sharma_Colorist_Resume.pdf'}</p>
              <p className="text-[11px] text-[#64748b]">Uploaded: {creator?.resume?.uploadedAt || '2026-08-05'}</p>
            </div>

            <form onSubmit={handleResumeUpload} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#404145]">Upload Updated PDF Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  className="bw-input w-full mt-1 p-2 text-xs cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !resumeFile}
                className="bw-btn-black w-full py-3 text-xs shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Upload className="w-4 h-4" /> Upload New Resume File
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
