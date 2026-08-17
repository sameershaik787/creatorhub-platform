import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { KeyRound, Mail, Lock, User, MapPin, CheckCircle2, AlertCircle, Eye, EyeOff, Sparkles, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';

  const [mode, setMode] = useState(initialMode); // 'login', 'signup', 'forgot'
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('creator');
  const [location, setLocation] = useState('Mumbai, India');
  const [title, setTitle] = useState('');
  const [selectedSkills, setSelectedSkills] = useState(['Video Editing', 'Motion Graphics']);

  // Feedback State
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('mode') === 'signup') {
      setMode('signup');
    }
  }, [searchParams]);

  const handleToggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleQuickDemoLogin = async (demoEmail, demoPassword) => {
    setError('');
    setSuccessMsg('');
    setLoading(true);
    try {
      await login(demoEmail, demoPassword);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        navigate('/');
      } else if (mode === 'signup') {
        if (!name || !email || !password) {
          throw new Error('Please fill in all required fields.');
        }
        await register({
          name,
          email,
          password,
          role,
          location,
          title: title || (role === 'creator' ? 'Senior Video Editor & Colorist' : 'Hiring Client'),
          skills: selectedSkills
        });
        navigate('/');
      } else if (mode === 'forgot') {
        if (!email) {
          throw new Error('Please enter your email address to reset password.');
        }
        const res = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to send reset link');

        setSuccessMsg(data.message);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] bg-[#F7F7F7] text-[#222325] flex items-center justify-center p-4 lg:p-8 animate-fadeIn">
      
      {/* 🌟 ATTRACTIVE LIGHT SPLIT-SCREEN CONTAINER */}
      <div className="w-full max-w-5xl rounded-3xl bg-white border border-[#E4E5E7] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* 1️⃣ LEFT PANEL: LIGHT CREATOR STUDIO SHOWCASE */}
        <div 
          className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-8 bg-cover bg-center text-[#222325] overflow-hidden"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80')`
          }}
        >
          {/* Light Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/40 z-0" />

          {/* Top Brand Logo (NO TRAILING DOT) */}
          <div className="relative z-10 space-y-1">
            <span className="text-2xl font-extrabold tracking-tight text-[#222325]">
              Creator<span className="text-[#1DBF73]">Hub</span>
            </span>
            <p className="text-xs text-[#74767E] font-medium">India Content Creator Marketplace</p>
          </div>

          {/* Center Feature Cards */}
          <div className="relative z-10 space-y-3 my-auto">
            
            <div className="p-4 rounded-2xl bg-white/90 border border-[#E4E5E7] shadow-sm backdrop-blur-md space-y-1 transition-transform hover:scale-[1.02] duration-200">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1DBF73]">
                <CheckCircle2 className="w-4 h-4 text-[#1DBF73]" /> Verified Indian Freelancers
              </div>
              <p className="text-[11px] text-[#62646A] leading-relaxed">
                Connect directly with editors, colorists, FPV drone pilots & audio engineers in Mumbai, Bengaluru, Delhi & Hyderabad.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-[#E4E5E7] shadow-sm backdrop-blur-md space-y-1 transition-transform hover:scale-[1.02] duration-200">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-600">
                <Sparkles className="w-4 h-4 text-purple-600" /> RAG AI Project Matching
              </div>
              <p className="text-[11px] text-[#62646A] leading-relaxed">
                Natural-language vector AI matchmaker finds the perfect creator for your video budget & deadline.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-[#E4E5E7] shadow-sm backdrop-blur-md space-y-1 transition-transform hover:scale-[1.02] duration-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                <ShieldCheck className="w-4 h-4 text-amber-600" /> Protected Escrow Payments
              </div>
              <p className="text-[11px] text-[#62646A] leading-relaxed">
                Milestone payments funded safely in escrow and released upon client deliverable approval.
              </p>
            </div>

          </div>

          {/* Footer Copyright */}
          <div className="relative z-10 text-[10px] text-[#74767E]">
            © 2026 CreatorHub Ltd. All rights reserved.
          </div>
        </div>

        {/* 2️⃣ RIGHT PANEL: ATTRACTIVE LIGHT AUTH FORM */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
          
          <div className="space-y-6 max-w-md mx-auto w-full">
            
            {/* Header Title */}
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl font-extrabold text-[#222325]">
                {mode === 'login' && 'Welcome back to CreatorHub'}
                {mode === 'signup' && 'Create your CreatorHub account'}
                {mode === 'forgot' && 'Reset your password'}
              </h2>
              <p className="text-xs text-[#74767E]">
                {mode === 'login' && 'Sign in to access your digital resume, jobs, and RAG AI studio tools.'}
                {mode === 'signup' && 'Join thousands of content creators and hiring clients in India.'}
                {mode === 'forgot' && 'Enter your registered email address and we will send you a reset link.'}
              </p>
            </div>

            {/* Mode Tab Switcher Bar */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#F7F7F7] border border-[#E4E5E7] rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
                className={`py-2 rounded-lg transition-all duration-200 ${
                  mode === 'login' ? 'bg-[#1DBF73] text-white shadow-sm font-extrabold' : 'text-[#74767E] hover:text-[#222325]'
                }`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); setSuccessMsg(''); }}
                className={`py-2 rounded-lg transition-all duration-200 ${
                  mode === 'signup' ? 'bg-[#1DBF73] text-white shadow-sm font-extrabold' : 'text-[#74767E] hover:text-[#222325]'
                }`}
              >
                Join / Sign Up
              </button>

              <button
                type="button"
                onClick={() => { setMode('forgot'); setError(''); setSuccessMsg(''); }}
                className={`py-2 rounded-lg transition-all duration-200 ${
                  mode === 'forgot' ? 'bg-[#1DBF73] text-white shadow-sm font-extrabold' : 'text-[#74767E] hover:text-[#222325]'
                }`}
              >
                Forgot Password
              </button>
            </div>

            {/* Alert Messages */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-[#1DBF73] shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* 🔑 FORM 1: SIGN IN VIEW */}
            {mode === 'login' && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#404145]">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="fiverr-input w-full pl-10 pr-3.5 py-2.5 text-xs font-semibold placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-[#404145]">Password</label>
                    <button
                      type="button"
                      onClick={() => { setMode('forgot'); setError(''); setSuccessMsg(''); }}
                      className="text-xs font-bold text-[#1DBF73] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="fiverr-input w-full pl-10 pr-10 py-2.5 text-xs font-semibold placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-[#222325]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="fiverr-btn-green w-full py-3 text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Signing In...' : 'Sign In to CreatorHub'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Quick Demo Credentials Bar */}
                <div className="p-3.5 rounded-xl bg-[#F7F7F7] border border-[#E4E5E7] space-y-2">
                  <div className="text-[10px] font-bold uppercase text-[#74767E]">⚡ Instant 1-Click Demo Logins</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('admin@creatorhub.com', 'admin123')}
                      className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-bold text-center hover:bg-rose-100 transition-colors"
                    >
                      🛡️ Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('ronak@creatorhub.com', 'password123')}
                      className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[#1DBF73] font-bold text-center hover:bg-emerald-100 transition-colors"
                    >
                      🇮🇳 Colorist Mumbai
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('ananya@creatorhub.com', 'password123')}
                      className="p-2 rounded-lg bg-[#E8F8F0] border border-emerald-300 text-emerald-800 font-bold text-center hover:bg-emerald-100 transition-colors"
                    >
                      🇮🇳 Shorts Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('client@creatorhub.com', 'password123')}
                      className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 font-bold text-center hover:bg-purple-100 transition-colors"
                    >
                      🧑‍💼 Hirer Client
                    </button>
                  </div>
                </div>

              </form>
            )}

            {/* 📝 FORM 2: JOIN / SIGN UP VIEW */}
            {mode === 'signup' && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#404145]">I want to join as</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('creator')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        role === 'creator'
                          ? 'bg-[#1DBF73] border-[#1DBF73] text-white shadow-sm font-extrabold'
                          : 'bg-[#F7F7F7] border-[#E4E5E7] text-[#74767E] hover:text-[#222325]'
                      }`}
                    >
                      <span>👨‍🎨 Content Creator</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('client')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        role === 'client'
                          ? 'bg-[#1DBF73] border-[#1DBF73] text-white shadow-sm font-extrabold'
                          : 'bg-[#F7F7F7] border-[#E4E5E7] text-[#74767E] hover:text-[#222325]'
                      }`}
                    >
                      <span>🧑‍💼 Hiring Client</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#404145]">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ronak Sharma"
                      className="fiverr-input w-full pl-10 pr-3.5 py-2.5 text-xs font-semibold placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#404145]">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="fiverr-input w-full px-3.5 py-2.5 text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-[#404145]">Password</label>
                      <button
                        type="button"
                        onClick={() => { setMode('forgot'); setError(''); setSuccessMsg(''); }}
                        className="text-[11px] font-bold text-[#1DBF73] hover:underline"
                      >
                        Forgot?
                      </button>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="fiverr-input w-full px-3.5 py-2.5 text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#404145]">Location Scope (India)</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="fiverr-input w-full px-3.5 py-2.5 text-xs font-bold"
                  >
                    <option value="Mumbai, India">🇮🇳 Mumbai, India</option>
                    <option value="Bengaluru, India">🇮🇳 Bengaluru, India</option>
                    <option value="Delhi NCR, India">🇮🇳 Delhi NCR, India</option>
                    <option value="Hyderabad, India">🇮🇳 Hyderabad, India</option>
                    <option value="Goa, India">🇮🇳 Goa, India</option>
                    <option value="Pune, India">🇮🇳 Pune, India</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="fiverr-btn-green w-full py-3 text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Creating Account...' : 'Complete Registration'}
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            )}

            {/* 🔑 FORM 3: FORGOT PASSWORD RECOVERY VIEW */}
            {mode === 'forgot' && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                
                <div className="p-4 rounded-xl bg-[#F7F7F7] border border-[#E4E5E7] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1DBF73]">
                    <KeyRound className="w-4 h-4" /> Password Recovery Assistance
                  </div>
                  <p className="text-xs text-[#62646A] leading-relaxed">
                    Enter the email address associated with your CreatorHub account. We will send you a single-use password reset link.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#404145]">Registered Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ronak@creatorhub.com"
                      className="fiverr-input w-full pl-10 pr-3.5 py-2.5 text-xs font-semibold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="fiverr-btn-green w-full py-3 text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending Link...' : 'Send Password Reset Link'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between pt-2 border-t border-[#E4E5E7]">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs font-bold text-[#74767E] hover:text-[#222325] flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-xs font-bold text-[#1DBF73] hover:underline"
                  >
                    Create New Account
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
