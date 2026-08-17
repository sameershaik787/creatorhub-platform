import React, { useState } from 'react';
import { Calculator, FileCheck, Zap, Sparkles, Copy, Check, Download, ShieldCheck, Play } from 'lucide-react';

export default function CreatorTools() {
  // 1. Rate Calculator State
  const [targetIncome, setTargetIncome] = useState(75000);
  const [workingDays, setWorkingDays] = useState(220);
  const [expenses, setExpenses] = useState(12000);
  const [profitMargin, setProfitMargin] = useState(20);

  // 2. Contract Generator State
  const [clientName, setClientName] = useState('Nexus Digital India');
  const [creatorName, setCreatorName] = useState('Ronak Sharma');
  const [projectTitle, setProjectTitle] = useState('Bollywood Film Trailer Color Pass');
  const [agreedFee, setAgreedFee] = useState('150000');
  const [copiedContract, setCopiedContract] = useState(false);

  // 3. AI Script Hook Generator State
  const [topic, setTopic] = useState('5 DaVinci Resolve Color Grading Hacks for Beginners');
  const [format, setFormat] = useState('YouTube Shorts / Reels (30-60s)');
  const [generatingScript, setGeneratingScript] = useState(false);
  const [scriptData, setScriptData] = useState(null);

  // Rate Math Calculations
  const totalCost = Number(targetIncome) + Number(expenses);
  const marginMultiplier = 1 + (Number(profitMargin) / 100);
  const totalRevenueNeeded = totalCost * marginMultiplier;
  const calculatedDayRate = Math.round(totalRevenueNeeded / Math.max(1, Number(workingDays)));
  const calculatedHourlyRate = Math.round(calculatedDayRate / 8);

  // Generate Script Handler
  const handleGenerateScript = async (e) => {
    e.preventDefault();
    setGeneratingScript(true);
    setScriptData(null);

    try {
      const res = await fetch('/api/ai/script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, format })
      });
      const data = await res.json();
      setScriptData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingScript(false);
    }
  };

  const generatedContractText = `COMMERCIAL CONTENT CREATION & IP TRANSFER AGREEMENT

This Agreement is entered into between ${creatorName} ("Creator") and ${clientName} ("Client") regarding the project titled "${projectTitle}".

1. SCOPE OF DELIVERABLES
Creator agrees to deliver completed high-resolution media deliverables for "${projectTitle}" adhering to agreed studio standards.

2. COMMERCIAL IP & LICENSE TRANSFER
Upon full release of the agreed fee of ₹${agreedFee} from Escrow to Creator, Creator assigns and transfers all commercial intellectual property rights, broadcast usage rights, and digital distribution rights to Client worldwide in perpetuity.

3. PAYMENT & ESCROW TERMS
Client agrees to fund ₹${agreedFee} into CreatorHub Escrow. Payment shall be released to Creator immediately upon Client deliverable approval.

4. GOVERNING LAW
This agreement is executed under the Digital Media & Intellectual Property Laws of India.

Date: ${new Date().toLocaleDateString()}
Status: VERIFIED & READY FOR SIGNATURE`;

  const copyContract = () => {
    navigator.clipboard.writeText(generatedContractText);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#222325] font-sans py-10 px-4 sm:px-6 lg:px-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1DBF73]/10 border border-[#1DBF73]/20 text-xs font-bold text-[#1DBF73]">
          <Sparkles className="w-3.5 h-3.5 text-[#1DBF73]" />
          <span>CreatorHub Studio Toolkit</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#222325]">Essential Tools for Creative Freelancers</h1>
        <p className="text-xs text-[#74767E] max-w-2xl mx-auto">
          Calculate fair studio rates, generate legal commercial agreements, and create high-retention video script hooks.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* 1️⃣ TOOL 1: FREELANCE RATE CALCULATOR (CLEAN LIGHT CARD) */}
        <section className="fiverr-card p-6 sm:p-8 space-y-6 animate-slideUp">
          <div className="flex items-center gap-3 border-b border-[#E4E5E7] pb-4">
            <div className="p-3 rounded-xl bg-emerald-50 text-[#1DBF73]">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#222325]">Freelance Studio Rate Calculator</h2>
              <p className="text-xs text-[#74767E]">Calculate exact hourly and day rates based on annual goals, working days, and gear expenses.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Inputs Column */}
            <div className="lg:col-span-7 space-y-4">
              
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#404145]">Target Annual Take-Home Income (₹)</span>
                  <span className="text-[#1DBF73] font-mono">₹{Number(targetIncome).toLocaleString()}</span>
                </div>
                <input
                  type="number"
                  value={targetIncome}
                  onChange={(e) => setTargetIncome(e.target.value)}
                  className="fiverr-input w-full px-3.5 py-2.5 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#404145]">Annual Equipment & Studio Expenses (₹)</span>
                  </div>
                  <input
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(e.target.value)}
                    className="fiverr-input w-full px-3.5 py-2.5 text-xs font-bold"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#404145]">Billable Days / Year</span>
                  </div>
                  <input
                    type="number"
                    value={workingDays}
                    onChange={(e) => setWorkingDays(e.target.value)}
                    className="fiverr-input w-full px-3.5 py-2.5 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#404145]">Target Profit Margin (%)</span>
                  <span className="text-[#1DBF73] font-mono">{profitMargin}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(e.target.value)}
                  className="w-full accent-[#1DBF73] cursor-pointer h-2 bg-[#E4E5E7] rounded"
                />
              </div>

            </div>

            {/* Calculated Output Box (Clean Light Green Theme) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#E8F8F0] border border-emerald-200 text-[#0a4226] space-y-4 shadow-sm text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1DBF73]">Calculated Minimum Rates</div>

              <div className="py-2 border-y border-emerald-200/80 space-y-1">
                <div className="text-3xl font-extrabold text-[#0a4226]">₹{calculatedHourlyRate.toLocaleString()}<span className="text-sm font-semibold text-[#74767E]">/hr</span></div>
                <div className="text-xs text-slate-600">Minimum Required Hourly Rate</div>
              </div>

              <div className="py-2 space-y-1">
                <div className="text-2xl font-extrabold text-[#1DBF73]">₹{calculatedDayRate.toLocaleString()}<span className="text-sm font-semibold text-[#74767E]">/day</span></div>
                <div className="text-xs text-slate-600">Full 8-Hour Studio Day Rate</div>
              </div>

              <div className="text-[11px] text-emerald-800 font-semibold bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                ⚡ Based on ₹{Math.round(totalRevenueNeeded).toLocaleString()} required annual gross revenue.
              </div>
            </div>

          </div>
        </section>

        {/* 2️⃣ TOOL 2: AI SCRIPT HOOK GENERATOR (CLEAN LIGHT CARD) */}
        <section className="fiverr-card p-6 sm:p-8 space-y-6 animate-slideUp">
          <div className="flex items-center gap-3 border-b border-[#E4E5E7] pb-4">
            <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#222325]">RAG AI Video Script & Hook Generator</h2>
              <p className="text-xs text-[#74767E]">Generate high-retention video script hooks, timelines, and editing instructions for client reels.</p>
            </div>
          </div>

          <form onSubmit={handleGenerateScript} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8">
                <label className="text-xs font-bold text-[#404145]">Video Topic or Niche</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. 5 DaVinci Resolve Color Grading Hacks..."
                  className="fiverr-input w-full px-3.5 py-2.5 text-xs font-semibold mt-1"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="text-xs font-bold text-[#404145]">Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="fiverr-input w-full px-3.5 py-2.5 text-xs font-bold mt-1 bg-white"
                >
                  <option value="YouTube Shorts / TikTok (30-60s)">YouTube Shorts / Reels (30-60s)</option>
                  <option value="Commercial Ad (15-30s)">Commercial Ad (15-30s)</option>
                  <option value="YouTube Longform (5-10m)">YouTube Longform (5-10m)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={generatingScript}
              className="fiverr-btn-green w-full sm:w-auto px-8 py-3 text-xs shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-white" />
              <span>{generatingScript ? 'Generating Script...' : 'Generate Script Outline'}</span>
            </button>
          </form>

          {/* Script Output Display */}
          {scriptData && (
            <div className="p-6 rounded-2xl bg-[#F7F7F7] border border-[#E4E5E7] space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#E4E5E7] pb-3">
                <h3 className="text-sm font-extrabold text-[#222325]">Generated Script: {scriptData.topic}</h3>
                <span className="text-xs font-mono font-bold text-[#1DBF73]">{scriptData.estimatedPacing}</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E4E5E7] space-y-2">
                <span className="text-[10px] font-bold uppercase text-purple-600">⚡ 0-3s High-Retention Hook</span>
                <p className="text-xs font-bold text-[#222325] italic">"{scriptData.hook}"</p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#74767E]">Script Outline Timeline</span>
                <div className="space-y-2">
                  {scriptData.sections?.map((sec, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white border border-[#E4E5E7] text-xs space-y-1">
                      <div className="flex justify-between font-bold text-[#222325]">
                        <span>{sec.timestamp} - {sec.title}</span>
                        <span className="text-slate-400 font-normal">{sec.visuals}</span>
                      </div>
                      <p className="text-slate-600">{sec.scriptLine}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 3️⃣ TOOL 3: LEGAL COMMERCIAL CONTRACT GENERATOR (CLEAN LIGHT CARD) */}
        <section className="fiverr-card p-6 sm:p-8 space-y-6 animate-slideUp">
          <div className="flex items-center gap-3 border-b border-[#E4E5E7] pb-4">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#222325]">Commercial IP & NDA Contract Generator</h2>
              <p className="text-xs text-[#74767E]">Generate legal agreements and commercial intellectual property transfer contracts for clients.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-[#404145]">Creator Name</label>
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  className="fiverr-input w-full px-3.5 py-2.5 text-xs font-bold mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#404145]">Client / Brand Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="fiverr-input w-full px-3.5 py-2.5 text-xs font-bold mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#404145]">Project Deliverable Title</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="fiverr-input w-full px-3.5 py-2.5 text-xs font-bold mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#404145]">Agreed Fee (₹)</label>
                <input
                  type="number"
                  value={agreedFee}
                  onChange={(e) => setAgreedFee(e.target.value)}
                  className="fiverr-input w-full px-3.5 py-2.5 text-xs font-bold mt-1"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#404145]">Generated Contract Document</span>
                <button
                  onClick={copyContract}
                  className="px-3.5 py-1.5 rounded bg-[#F7F7F7] border border-[#E4E5E7] text-[#1DBF73] hover:bg-[#E8F8F0] text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  {copiedContract ? <Check className="w-4 h-4 text-[#1DBF73]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedContract ? 'Copied to Clipboard!' : 'Copy Agreement'}</span>
                </button>
              </div>

              <textarea
                readOnly
                rows={12}
                value={generatedContractText}
                className="w-full p-4 rounded-xl bg-[#F7F7F7] border border-[#E4E5E7] font-mono text-xs text-[#222325] leading-relaxed focus:outline-none"
              />
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
