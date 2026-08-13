import React, { useState } from 'react';
import { Calculator, FileCheck, Shield, Sparkles, CheckCircle2, Copy, Download, Zap, Wrench, Bot, Video } from 'lucide-react';

export default function CreatorTools() {
  // Rate calculator states
  const [desiredSalary, setDesiredSalary] = useState(75000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState(25);
  const [vacationWeeks, setVacationWeeks] = useState(4);
  const [monthlyExpenses, setMonthlyExpenses] = useState(500);

  // Calculated rate
  const workingWeeks = 52 - Number(vacationWeeks);
  const totalAnnualHours = workingWeeks * Number(billableHoursPerWeek);
  const annualExpenses = Number(monthlyExpenses) * 12;
  const targetRevenue = Number(desiredSalary) + annualExpenses;
  const calculatedHourlyRate = Math.round(targetRevenue / (totalAnnualHours || 1));
  const suggestedDayRate = calculatedHourlyRate * 8;

  // Contract generator states
  const [clientName, setClientName] = useState('Acme Brand Co.');
  const [creatorName, setCreatorName] = useState('Alex Rivera');
  const [projectScope, setProjectScope] = useState('10 YouTube Shorts Video Edits & Sound Design');
  const [agreedFee, setAgreedFee] = useState('750');
  const [deliveryDate, setDeliveryDate] = useState('2026-09-01');
  const [copiedContract, setCopiedContract] = useState(false);

  // AI Script Generator states
  const [scriptTopic, setScriptTopic] = useState('');
  const [scriptFormat, setScriptFormat] = useState('Shorts');
  const [generatedScript, setGeneratedScript] = useState(null);
  const [generatingScript, setGeneratingScript] = useState(false);

  const contractText = `FREELANCE CONTENT CREATION AGREEMENT

This Agreement is made on ${new Date().toLocaleDateString()} between:
CLIENT: ${clientName}
CREATOR: ${creatorName}

1. SCOPE OF WORK
Creator agrees to deliver: ${projectScope}.

2. COMPENSATION & PAYMENTS
Total agreed fee: $${agreedFee} USD. 
Payment Terms: 50% deposit upfront via SamsView Escrow, remaining 50% upon final video delivery by ${deliveryDate}.

3. REVISIONS & EDITS
Includes up to two (2) rounds of minor revisions. Additional edits requested beyond scope shall be billed at $${calculatedHourlyRate}/hr.

4. COPYRIGHT & LICENSING
Upon full settlement of payment, Client is granted full digital commercial license to distribute work on YouTube, TikTok, and Instagram. Creator retains rights to include work in professional portfolio reels.

Signed,
${creatorName} (Creator) & ${clientName} (Client)`;

  const handleCopyContract = () => {
    navigator.clipboard.writeText(contractText);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const handleGenerateScript = async (e) => {
    e.preventDefault();
    if (!scriptTopic.trim()) return;

    setGeneratingScript(true);
    try {
      const res = await fetch('/api/ai/script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: scriptTopic, format: scriptFormat })
      });
      const data = await res.json();
      setGeneratedScript(data);
    } catch (err) {
      alert('Failed to generate script');
    } finally {
      setGeneratingScript(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
          <Sparkles className="w-4 h-4 text-pink-400" /> SamsView Studio & AI Creator Toolkit
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Everything Content Creators Need to Know
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          Essential rate calculators, contract generators, legal agreements, and RAG AI video script outline tools for creators.
        </p>
      </div>

      {/* TOOL 1: AI VIDEO SCRIPT & PITCH GENERATOR */}
      <div className="glass-card p-8 rounded-3xl space-y-6 border border-slate-800">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              AI Video Script & Pitch Generator
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-800 font-semibold">RAG AI</span>
            </h2>
            <p className="text-xs text-slate-400">Generate high-retention video hooks, timelines, and editing instructions for clients.</p>
          </div>
        </div>

        <form onSubmit={handleGenerateScript} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-300">Video Topic or Niche</label>
            <input
              type="text"
              required
              value={scriptTopic}
              onChange={(e) => setScriptTopic(e.target.value)}
              placeholder="e.g. 5 AI Productivity Tools That Save 20 Hours a Week"
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Format</label>
            <select
              value={scriptFormat}
              onChange={(e) => setScriptFormat(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            >
              <option value="Shorts">YouTube Shorts / TikTok (30-60s)</option>
              <option value="Longform">YouTube Longform (8-12m)</option>
              <option value="Podcast">Podcast Intro & Sting</option>
            </select>
          </div>

          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={generatingScript}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-extrabold text-xs rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {generatingScript ? 'Generating Script...' : 'Generate Script Outline'}
            </button>
          </div>
        </form>

        {generatedScript && (
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-white">{generatedScript.title}</h3>
            
            <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-800 text-xs text-indigo-300 font-semibold">
              🎣 High-Retention Hook: "{generatedScript.hook}"
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase">Timeline & Visual Breakdown:</h4>
              <div className="space-y-2">
                {generatedScript.scriptOutline?.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between text-xs">
                    <span className="font-mono text-purple-400 font-bold">{step.time}</span>
                    <span className="text-slate-300">{step.visual}</span>
                    <span className="text-indigo-300">{step.audio}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-amber-400 bg-amber-950/40 p-3 rounded-xl border border-amber-800">
              💡 Editing Tip: {generatedScript.editingTips}
            </div>
          </div>
        )}

      </div>

      {/* TOOL 2: FREELANCE RATE CALCULATOR */}
      <div className="glass-card p-8 rounded-3xl space-y-6 border border-slate-800">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Freelance Rate & Target Revenue Calculator</h2>
            <p className="text-xs text-slate-400">Know exactly what to charge clients based on your target annual income and expenses.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300">Target Annual Take-Home Income ($ USD)</label>
              <input
                type="number"
                value={desiredSalary}
                onChange={(e) => setDesiredSalary(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300">Billable Hours / Week</label>
                <input
                  type="number"
                  value={billableHoursPerWeek}
                  onChange={(e) => setBillableHoursPerWeek(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Vacation Weeks / Year</label>
                <input
                  type="number"
                  value={vacationWeeks}
                  onChange={(e) => setVacationWeeks(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300">Monthly Software & Studio Expenses ($)</label>
              <input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white mt-1"
              />
            </div>
          </div>

          {/* Results Output */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/40 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-400">Calculated Minimum Rates</span>
              <div className="mt-3 space-y-1">
                <div className="text-3xl font-extrabold text-white">${calculatedHourlyRate} <span className="text-sm font-normal text-slate-400">/ hour</span></div>
                <div className="text-xl font-bold text-emerald-400">${suggestedDayRate} <span className="text-xs font-normal text-slate-400">/ day rate (8 hrs)</span></div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 border-t border-indigo-900/60 pt-4">
              <div className="flex justify-between"><span>Annual Gross Target:</span> <strong className="text-white">${targetRevenue.toLocaleString()}</strong></div>
              <div className="flex justify-between"><span>Total Billable Hours:</span> <strong className="text-white">{totalAnnualHours} hrs</strong></div>
              <p className="text-[11px] text-slate-400 pt-1">Pro Tip: Always factor in 20-30% buffer for self-employment tax and equipment depreciation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* TOOL 3: CONTRACT & NDA GENERATOR */}
      <div className="glass-card p-8 rounded-3xl space-y-6 border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Instant Freelance Contract Generator</h2>
              <p className="text-xs text-slate-400">Protect your intellectual property with a clean legal agreement.</p>
            </div>
          </div>
          <button
            onClick={handleCopyContract}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            {copiedContract ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            {copiedContract ? 'Copied to Clipboard!' : 'Copy Contract Text'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-slate-300">Client Name / Company</label>
              <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300">Creator Name</label>
              <input type="text" value={creatorName} onChange={(e) => setCreatorName(e.target.value)} className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300">Agreed Project Fee ($)</label>
              <input type="text" value={agreedFee} onChange={(e) => setAgreedFee(e.target.value)} className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300">Scope of Work</label>
              <input type="text" value={projectScope} onChange={(e) => setProjectScope(e.target.value)} className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1" />
            </div>
          </div>

          <div className="md:col-span-2 p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
            {contractText}
          </div>
        </div>
      </div>

    </div>
  );
}
