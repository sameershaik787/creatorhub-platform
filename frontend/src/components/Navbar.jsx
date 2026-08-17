import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { MapPin, Briefcase, Sparkles, FileText, PlusCircle, ShieldAlert, LogOut, Globe, Grid, ChevronDown, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { selectedCurrency, setCurrency } = useCurrency();
  const [showToolsGrid, setShowToolsGrid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 text-white px-4 lg:px-8 py-3 transition-all shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Clean Brand Logo & Navigation Links */}
        <div className="flex items-center gap-8">
          
          {/* Typographic CreatorHub Logo (ADOBE BADGE REMOVED) */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-[#1473E6] transition-colors">
              Creator<span className="text-[#1473E6]">Hub</span>
            </span>
          </Link>

          {/* Nav Items Matching Reference Image 2 */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <Link
              to="/search"
              className={`hover:text-white transition-colors flex items-center gap-1.5 ${
                isActive('/search') ? 'text-[#1473E6] font-bold' : ''
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Find Creators
            </Link>

            <Link
              to="/jobs"
              className={`hover:text-white transition-colors flex items-center gap-1.5 ${
                isActive('/jobs') ? 'text-[#1473E6] font-bold' : ''
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400" /> Job Board
            </Link>

            <Link
              to="/client-dashboard"
              className={`hover:text-white transition-colors flex items-center gap-1.5 ${
                isActive('/client-dashboard') ? 'text-[#1473E6] font-bold' : ''
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5 text-purple-400" /> Post a Project
            </Link>

            <Link
              to="/tools"
              className={`hover:text-white transition-colors flex items-center gap-1.5 ${
                isActive('/tools') ? 'text-[#1473E6] font-bold' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Creator Tools
            </Link>
          </nav>

        </div>

        {/* Right: Currency, Grid Launcher & White Rounded Pill Button (Reference Image 2) */}
        <div className="flex items-center gap-4">
          
          {/* Currency Switcher (Default INR ₹) */}
          <div className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/15 px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-md transition-all">
            <Globe className="w-3.5 h-3.5 text-[#1473E6]" />
            <select
              value={selectedCurrency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="INR" className="bg-slate-900 text-white">INR (₹)</option>
              <option value="USD" className="bg-slate-900 text-white">USD ($)</option>
              <option value="EUR" className="bg-slate-900 text-white">EUR (€)</option>
              <option value="GBP" className="bg-slate-900 text-white">GBP (£)</option>
              <option value="AUD" className="bg-slate-900 text-white">AUD (A$)</option>
              <option value="JPY" className="bg-slate-900 text-white">JPY (¥)</option>
            </select>
          </div>

          {/* Grid Menu Launcher Icon (:::) */}
          <button
            onClick={() => setShowToolsGrid(!showToolsGrid)}
            className="p-2 rounded-full hover:bg-white/15 transition-all text-slate-300 hover:text-white relative"
            title="CreatorHub Apps Grid"
          >
            <Grid className="w-5 h-5" />
          </button>

          {/* Auth Button or Profile (White Rounded Pill Button - Reference Image 2) */}
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'creator' && (
                <Link
                  to="/creator-dashboard"
                  className="px-4 py-1.5 rounded-full bg-white text-slate-900 hover:bg-slate-200 font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#1473E6]" /> Dashboard
                </Link>
              )}

              {user.role === 'client' && (
                <Link
                  to="/client-dashboard"
                  className="px-4 py-1.5 rounded-full bg-white text-slate-900 hover:bg-slate-200 font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-purple-600" /> Post Job
                </Link>
              )}

              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="px-4 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Admin
                </Link>
              )}

              <div className="flex items-center gap-2 pl-2 border-l border-white/20">
                <img
                  src={user.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#1473E6]"
                />
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  title="Sign Out"
                  className="p-1.5 rounded-full text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs shadow-lg transition-all transform hover:scale-105"
            >
              Sign in
            </Link>
          )}

        </div>

      </div>

      {/* Grid Apps Popover Modal */}
      {showToolsGrid && (
        <div className="absolute right-8 top-16 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 space-y-3 text-slate-200 z-50 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-extrabold text-white">CreatorHub Tools Launcher</span>
            <button onClick={() => setShowToolsGrid(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/search" onClick={() => setShowToolsGrid(false)} className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 space-y-1 transition-all">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <div className="text-xs font-bold text-white">Find Creators</div>
              <div className="text-[10px] text-slate-400">India Directory</div>
            </Link>
            <Link to="/jobs" onClick={() => setShowToolsGrid(false)} className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 space-y-1 transition-all">
              <Briefcase className="w-5 h-5 text-amber-400" />
              <div className="text-xs font-bold text-white">Job Board</div>
              <div className="text-[10px] text-slate-400">Apply & Hire</div>
            </Link>
            <Link to="/tools" onClick={() => setShowToolsGrid(false)} className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 space-y-1 transition-all">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <div className="text-xs font-bold text-white">Rate Calculator</div>
              <div className="text-[10px] text-slate-400">Studio Pricing</div>
            </Link>
            <Link to="/tools" onClick={() => setShowToolsGrid(false)} className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 space-y-1 transition-all">
              <FileText className="w-5 h-5 text-purple-400" />
              <div className="text-xs font-bold text-white">Contract Generator</div>
              <div className="text-[10px] text-slate-400">Commercial IP</div>
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
