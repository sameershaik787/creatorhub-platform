import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { MapPin, Briefcase, Sparkles, FileText, PlusCircle, ShieldAlert, LogOut, Globe, Grid } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { selectedCurrency, setCurrency } = useCurrency();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isHome && !scrolled
        ? 'bg-[#000000] text-white border-b border-white/10'
        : 'bg-white text-[#0f172a] border-b border-[#e2e8f0] shadow-sm'
    } px-4 lg:px-10 py-3.5`}>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo (CreatorHub Black & White) */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-1 group">
            <span className={`text-2xl font-extrabold tracking-tight ${
              isHome && !scrolled ? 'text-white' : 'text-[#0f172a]'
            }`}>
              Creator<span className={isHome && !scrolled ? 'text-slate-400' : 'text-[#000000]'}>Hub</span>
            </span>
          </Link>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold">
            <Link
              to="/search"
              className={`transition-colors flex items-center gap-1.5 ${
                isHome && !scrolled ? 'text-slate-200 hover:text-white' : 'text-[#334155] hover:text-[#000000]'
              }`}
            >
              <MapPin className="w-4 h-4 text-slate-500" /> Find Creators
            </Link>

            <Link
              to="/jobs"
              className={`transition-colors flex items-center gap-1.5 ${
                isHome && !scrolled ? 'text-slate-200 hover:text-white' : 'text-[#334155] hover:text-[#000000]'
              }`}
            >
              <Briefcase className="w-4 h-4 text-slate-500" /> Job Board
            </Link>

            <Link
              to="/client-dashboard"
              className={`transition-colors flex items-center gap-1.5 ${
                isHome && !scrolled ? 'text-slate-200 hover:text-white' : 'text-[#334155] hover:text-[#000000]'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-slate-500" /> Post a Project
            </Link>

            <Link
              to="/tools"
              className={`transition-colors flex items-center gap-1.5 ${
                isHome && !scrolled ? 'text-slate-200 hover:text-white' : 'text-[#334155] hover:text-[#000000]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-slate-500" /> Creator Tools
            </Link>
          </nav>
        </div>

        {/* Right: Currency & Black Buttons */}
        <div className="flex items-center gap-5">
          
          {/* Currency Switcher */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all border ${
            isHome && !scrolled
              ? 'bg-white/10 border-white/20 text-white'
              : 'bg-[#f8fafc] border-[#e2e8f0] text-[#0f172a]'
          }`}>
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedCurrency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="INR" className="bg-white text-[#0f172a]">INR (₹)</option>
              <option value="USD" className="bg-white text-[#0f172a]">USD ($)</option>
              <option value="EUR" className="bg-white text-[#0f172a]">EUR (€)</option>
              <option value="GBP" className="bg-white text-[#0f172a]">GBP (£)</option>
              <option value="AUD" className="bg-white text-[#0f172a]">AUD (A$)</option>
              <option value="JPY" className="bg-white text-[#0f172a]">JPY (¥)</option>
            </select>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'creator' && (
                <Link
                  to="/creator-dashboard"
                  className="px-4 py-2 rounded-lg bg-[#000000] text-white hover:bg-[#1e293b] font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" /> Dashboard
                </Link>
              )}

              {user.role === 'client' && (
                <Link
                  to="/client-dashboard"
                  className="px-4 py-2 rounded-lg bg-[#000000] text-white hover:bg-[#1e293b] font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Post Job
                </Link>
              )}

              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Admin
                </Link>
              )}

              <div className="flex items-center gap-2 pl-2 border-l border-[#e2e8f0]">
                <img
                  src={user.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#000000]"
                />
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  title="Sign Out"
                  className={`p-1.5 rounded ${
                    isHome && !scrolled ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-rose-600'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className={`text-sm font-bold transition-colors ${
                  isHome && !scrolled ? 'text-white hover:text-slate-300' : 'text-[#0f172a] hover:text-[#000000]'
                }`}
              >
                Sign in
              </Link>
              <Link
                to="/login?mode=signup"
                className="px-5 py-2 rounded-lg bg-[#000000] hover:bg-[#1e293b] text-white font-bold text-xs shadow-sm transition-all"
              >
                Join
              </Link>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
