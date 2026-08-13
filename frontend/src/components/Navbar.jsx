import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency, RATES } from '../context/CurrencyContext';
import { MapPin, Briefcase, Sparkles, FileText, PlusCircle, ShieldAlert, LogOut, Globe } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { selectedCurrency, setCurrency } = useCurrency();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#0d111c]/95 backdrop-blur-md border-b border-[#282f40] px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Clean Typographic CreatorHub Logo - RED SQUARE "A" ICON REMOVED */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-[#1473E6] transition-colors">
            Creator<span className="text-[#1473E6]">Hub</span>
          </span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#151924] px-3 py-1 rounded-xl border border-[#282f40]">
          <Link
            to="/"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isActive('/') ? 'bg-[#1473E6] text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-[#1c2232]'
            }`}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              isActive('/search') ? 'bg-[#1473E6] text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-[#1c2232]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Find Creators
          </Link>
          <Link
            to="/jobs"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              isActive('/jobs') ? 'bg-[#1473E6] text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-[#1c2232]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-400" /> Job Board
          </Link>
          <Link
            to="/tools"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              isActive('/tools') ? 'bg-[#1473E6] text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-[#1c2232]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Creator Tools
          </Link>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          
          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-[#151924] border border-[#282f40] px-2.5 py-1.5 rounded-xl text-xs">
            <Globe className="w-3.5 h-3.5 text-[#1473E6]" />
            <select
              value={selectedCurrency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="USD" className="bg-[#151924] text-white">USD ($)</option>
              <option value="EUR" className="bg-[#151924] text-white">EUR (€)</option>
              <option value="GBP" className="bg-[#151924] text-white">GBP (£)</option>
              <option value="INR" className="bg-[#151924] text-white">INR (₹)</option>
              <option value="AUD" className="bg-[#151924] text-white">AUD (A$)</option>
              <option value="JPY" className="bg-[#151924] text-white">JPY (¥)</option>
            </select>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'creator' && (
                <Link
                  to="/creator-dashboard"
                  className="px-3 py-1.5 rounded-xl bg-[#151924] border border-[#282f40] text-[#1473E6] text-xs font-bold hover:bg-[#1c2232] transition-all flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" /> Dashboard & Resume
                </Link>
              )}
              {user.role === 'client' && (
                <Link
                  to="/client-dashboard"
                  className="px-3 py-1.5 rounded-xl bg-[#151924] border border-[#282f40] text-purple-400 text-xs font-bold hover:bg-[#1c2232] transition-all flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Post Job
                </Link>
              )}
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-bold hover:bg-rose-900 transition-all flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Admin Panel
                </Link>
              )}

              <div className="flex items-center gap-2 pl-2 border-l border-[#282f40]">
                <img
                  src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#1473E6]"
                />
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-white">{user.name}</div>
                  <div className="text-[10px] text-slate-400 capitalize">{user.role}</div>
                </div>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  title="Log out"
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-[#1c2232] transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-[#1c2232] transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/login?mode=signup"
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#1473E6] hover:bg-[#0D66D0] text-white shadow-md transition-all"
              >
                Join CreatorHub
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
