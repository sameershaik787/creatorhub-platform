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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Clean Typographic CreatorHub Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-[#1473E6] transition-colors">
            Creator<span className="text-[#1473E6]">Hub</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            Adobe Studio UI
          </span>
        </Link>

        {/* Center Navigation Links (Adobe Light Theme) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <Link
            to="/"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isActive('/') ? 'bg-[#1473E6] text-white shadow-sm' : 'text-slate-700 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              isActive('/search') ? 'bg-[#1473E6] text-white shadow-sm' : 'text-slate-700 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-600" /> Find Creators
          </Link>
          <Link
            to="/jobs"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              isActive('/jobs') ? 'bg-[#1473E6] text-white shadow-sm' : 'text-slate-700 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-600" /> Job Board
          </Link>
          <Link
            to="/tools"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              isActive('/tools') ? 'bg-[#1473E6] text-white shadow-sm' : 'text-slate-700 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-600" /> Creator Tools
          </Link>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          
          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-xl text-xs">
            <Globe className="w-3.5 h-3.5 text-[#1473E6]" />
            <select
              value={selectedCurrency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="USD" className="bg-white text-slate-900">USD ($)</option>
              <option value="EUR" className="bg-white text-slate-900">EUR (€)</option>
              <option value="GBP" className="bg-white text-slate-900">GBP (£)</option>
              <option value="INR" className="bg-white text-slate-900">INR (₹)</option>
              <option value="AUD" className="bg-white text-slate-900">AUD (A$)</option>
              <option value="JPY" className="bg-white text-slate-900">JPY (¥)</option>
            </select>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'creator' && (
                <Link
                  to="/creator-dashboard"
                  className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-[#1473E6] text-xs font-bold hover:bg-slate-200 transition-all flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" /> Dashboard & Resume
                </Link>
              )}
              {user.role === 'client' && (
                <Link
                  to="/client-dashboard"
                  className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-purple-600 text-xs font-bold hover:bg-slate-200 transition-all flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Post Job
                </Link>
              )}
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-100 transition-all flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Admin Panel
                </Link>
              )}

              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <img
                  src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#1473E6]"
                />
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-slate-900">{user.name}</div>
                  <div className="text-[10px] text-slate-500 capitalize">{user.role}</div>
                </div>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  title="Log out"
                  className="p-1.5 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all"
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
