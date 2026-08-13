import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Upload, FileText, CheckCircle2, MapPin, DollarSign, Save, Plus, Trash2, Cpu, Wrench, Shield, AlertCircle } from 'lucide-react';

export default function CreatorDashboard() {
  const { user, updateUserProfile } = useAuth();
  
  if (!user) {
    return (
      <div className="py-20 text-center text-slate-400">
        Please sign in to access your Creator Dashboard.
      </div>
    );
  }

  const [available, setAvailable] = useState(user.available ?? true);
  const [hourlyRate, setHourlyRate] = useState(user.hourlyRate || 50);
  const [location, setLocation] = useState(user.location || 'Los Angeles, USA');
  const [title, setTitle] = useState(user.title || 'Cinematic Video Editor');
  const [bio, setBio] = useState(user.bio || '');
  const [skillsStr, setSkillsStr] = useState(user.skills?.join(', ') || 'Video Editing, Motion Graphics, Color Grading');
  const [equipmentStr, setEquipmentStr] = useState(user.equipment?.join(', ') || 'Mac Studio M2, Sony FX3');

  // Resume state
  const [resumeSummary, setResumeSummary] = useState(user.resume?.summary || '');
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeMsg, setResumeMsg] = useState('');

  // Packages state
  const [packages, setPackages] = useState(user.packages || {
    basic: { name: 'Basic Edit', price: 150, delivery: '2 Days', description: 'Short-form social media video edit.' },
    standard: { name: 'Standard YouTube Edit', price: 450, delivery: '4 Days', description: 'Full 10-15m YouTube video with sound design.' },
    premium: { name: 'Commercial Campaign', price: 1200, delivery: '7 Days', description: 'High-end commercial with 3D animation and revisions.' }
  });

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    try {
      const skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);
      const equipment = equipmentStr.split(',').map(e => e.trim()).filter(Boolean);

      const updated = {
        title,
        location,
        hourlyRate: Number(hourlyRate),
        available,
        bio,
        skills,
        equipment,
        packages,
        resume: {
          ...user.resume,
          summary: resumeSummary
        }
      };

      await updateUserProfile(updated);
      setSuccessMsg('Profile and Resume showcase updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleResumeFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingResume(true);
    setResumeMsg('');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await fetch('/api/creators/upload-resume', {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('samsview_token')}` },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setResumeMsg(`Uploaded: ${data.resume.title}`);
      await updateUserProfile({ resume: data.resume });
    } catch (err) {
      console.error(err);
      setResumeMsg('Failed to upload PDF file.');
    } finally {
      setUploadingResume(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/50 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">{user.name}</h1>
              {user.verified ? (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Creator
                </span>
              ) : (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Verification Pending
                </span>
              )}
            </div>
            <p className="text-xs text-indigo-300 font-medium">{user.email}</p>
          </div>
        </div>

        {/* Live Availability Toggle */}
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800">
          <span className="text-xs font-bold text-slate-300">Live Hiring Status:</span>
          <button
            type="button"
            onClick={() => setAvailable(!available)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              available
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-rose-950 text-rose-300 border border-rose-800'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${available ? 'bg-white animate-pulse' : 'bg-rose-400'}`} />
            {available ? 'Available Now' : 'Busy / Unavailable'}
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold text-center">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSaveProfile} className="space-y-8">
        
        {/* 1. RESUME & PORTFOLIO UPLOADER SECTION */}
        <div className="glass-card p-6 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" /> Resume & Skill Showcase
              </h2>
              <p className="text-xs text-slate-400">Upload your PDF resume or refine your digital career summary for clients.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PDF Uploader Box */}
            <div className="p-5 rounded-2xl bg-slate-950 border-2 border-dashed border-indigo-500/40 text-center space-y-3">
              <Upload className="w-8 h-8 text-indigo-400 mx-auto animate-bounce" />
              <div>
                <h4 className="text-xs font-bold text-white">Upload Resume PDF</h4>
                <p className="text-[11px] text-slate-400">PDF formats up to 10MB accepted</p>
              </div>

              {user.resume?.fileUrl ? (
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/40 p-2 rounded border border-emerald-800">
                  📄 Current File: {user.resume.title || 'Uploaded_Resume.pdf'}
                </div>
              ) : null}

              <label className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md">
                {uploadingResume ? 'Uploading...' : 'Choose PDF File'}
                <input type="file" accept=".pdf" onChange={handleResumeFileUpload} className="hidden" />
              </label>

              {resumeMsg && <div className="text-xs text-cyan-400">{resumeMsg}</div>}
            </div>

            {/* Resume Summary Editor */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Resume Executive Summary</label>
              <textarea
                rows={4}
                value={resumeSummary}
                onChange={(e) => setResumeSummary(e.target.value)}
                placeholder="Highlight your key achievements, top creators you worked with, view counts, and specialization..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

          </div>
        </div>

        {/* 2. PROFILE & GEAR DETAILS */}
        <div className="glass-card p-6 rounded-3xl space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-purple-400" /> Basic Details & Hardware Gear
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Professional Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Location (City, Country)</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Hourly Rate ($ USD)</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Skills (Comma separated)</label>
              <input
                type="text"
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
                placeholder="Video Editing, Color Grading, FPV Drone, Sound Design"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Equipment Rig (Comma separated)</label>
              <input
                type="text"
                value={equipmentStr}
                onChange={(e) => setEquipmentStr(e.target.value)}
                placeholder="Sony FX3, Mac Studio M2, Neumann U87 Microphone"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* 3. PRICING PACKAGES MANAGER */}
        <div className="glass-card p-6 rounded-3xl space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-400" /> Tiered Pricing Packages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['basic', 'standard', 'premium'].map((tier) => (
              <div key={tier} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-extrabold uppercase text-indigo-400">{tier} Package</h4>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold">Package Name</label>
                  <input
                    type="text"
                    value={packages[tier]?.name || ''}
                    onChange={(e) => setPackages({
                      ...packages,
                      [tier]: { ...packages[tier], name: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold">Price ($)</label>
                    <input
                      type="number"
                      value={packages[tier]?.price || 0}
                      onChange={(e) => setPackages({
                        ...packages,
                        [tier]: { ...packages[tier], price: Number(e.target.value) }
                      })}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold">Delivery Time</label>
                    <input
                      type="text"
                      value={packages[tier]?.delivery || ''}
                      onChange={(e) => setPackages({
                        ...packages,
                        [tier]: { ...packages[tier], delivery: e.target.value }
                      })}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold">Description</label>
                  <textarea
                    rows={2}
                    value={packages[tier]?.description || ''}
                    onChange={(e) => setPackages({
                      ...packages,
                      [tier]: { ...packages[tier], description: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Save */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-xs rounded-2xl shadow-xl shadow-indigo-500/25 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving Changes...' : 'Save Profile & Portfolio'}
          </button>
        </div>

      </form>

    </div>
  );
}
