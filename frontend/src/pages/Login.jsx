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
  const [location, setLocation] = useState('United States');
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
          title: title || (role === 'creator' ? 'Senior Video Editor & Creator' : 'Creative Project Manager'),
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
    <div className="min-h-[90vh] bg-[#0b0f19] text-slate-100 flex items-center justify-center p-4 lg:p-8">
      
      {/* 🌟 ATTRACTIVE SPLIT-SCREEN CONTAINER */}
      <div className="w-full max-w-5xl rounded-3xl bg-[#151924] border border-[#282f40] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* 1️⃣ LEFT PANEL: CINEMATIC STUDIO SHOWCASE */}
        <div 
          className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-8 bg-cover bg-center text-white overflow-hidden"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80')`
          }}
        >
          {/* Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-black/40 z-0" />

          {/* Top Brand Logo */}
          <div className="relative z-10 space-y-1">
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Creator<span className="text-[#1473E6]">Hub</span>
            </span>
            <p className="text-xs text-slate-300 font-medium">Global Content Creator Marketplace</p>
          </div>

          {/* Center Feature Cards */}
          <div className="relative z-10 space-y-3 my-auto">
            
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-700/80 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> 12,000+ Verified Creators
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Connect directly with directors, B-roll editors, FPV drone pilots & sound engineers in USA, UK, India, Japan & Australia.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-700/80 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#1473E6]">
                <Sparkles className="w-4 h-4 text-pink-400" /> RAG AI Project Matching
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Natural-language vector AI matchmaker finds the perfect creator for your video budget & deadline.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-700/80 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-2 text-xs font-extrabold text-purple-400">
                <ShieldCheck className="w-4 h-4" /> Multi-Currency & Contracts
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Instant currency switching ($, €, £, ₹, A$, ¥) with automated commercial IP transfer agreements.
              </p>
            </div>

          </div>

          {/* Footer Copyright */}
          <div className="relative z-10 text-[10px] text-slate-400">
            © 2026 CreatorHub Inc. Adobe Spectrum Dark UI.
          </div>
        </div>

        {/* 2️⃣ RIGHT PANEL: ATTRACTIVE ADOBE DARK AUTH FORM */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-[#151924]">
          
          <div className="space-y-6 max-w-md mx-auto w-full">
            
            {/* Header Title */}
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl font-extrabold text-white">
                {mode === 'login' && 'Welcome back to CreatorHub'}
                {mode === 'signup' && 'Create your CreatorHub account'}
                {mode === 'forgot' && 'Reset your password'}
              </h2>
              <p className="text-xs text-slate-400">
                {mode === 'login' && 'Sign in to access your digital resume, jobs, and RAG AI studio tools.'}
                {mode === 'signup' && 'Join thousands of content creators and hiring clients worldwide.'}
                {mode === 'forgot' && 'Enter your registered email address and we will send you a reset link.'}
              </p>
            </div>

            {/* Mode Tab Switcher Bar */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#0d111c] border border-[#282f40] rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
                className={`py-2 rounded-lg transition-all ${
                  mode === 'login' ? 'bg-[#1473E6] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); setSuccessMsg(''); }}
                className={`py-2 rounded-lg transition-all ${
                  mode === 'signup' ? 'bg-[#1473E6] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Join / Sign Up
              </button>

              <button
                type="button"
                onClick={() => { setMode('forgot'); setError(''); setSuccessMsg(''); }}
                className={`py-2 rounded-lg transition-all ${
                  mode === 'forgot' ? 'bg-[#1473E6] text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Forgot Password
              </button>
            </div>

            {/* Alert Messages */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* 🔑 FORM 1: SIGN IN VIEW */}
            {mode === 'login' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#1473E6] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0d111c] border border-[#282f40] text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#1473E6] focus:ring-1 focus:ring-[#1473E6] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-300">Password</label>
                    <button
                      type="button"
                      onClick={() => { setMode('forgot'); setError(''); setSuccessMsg(''); }}
                      className="text-xs font-bold text-[#1473E6] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#1473E6] absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0d111c] border border-[#282f40] text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#1473E6] focus:ring-1 focus:ring-[#1473E6] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#1473E6] hover:bg-[#0D66D0] text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Signing In...' : 'Sign In to CreatorHub'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Single-Click Social Buttons */}
                <div className="pt-2 space-y-2">
                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-[#282f40]"></div>
                    <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-slate-500">Or continue with</span>
                    <div className="flex-grow border-t border-[#282f40]"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('brandon@creatorhub.com', 'password123')}
                      className="py-2.5 px-3 rounded-xl bg-[#0d111c] border border-[#282f40] hover:border-slate-500 text-xs font-bold text-slate-300 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Google Account</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('admin@creatorhub.com', 'admin123')}
                      className="py-2.5 px-3 rounded-xl bg-[#0d111c] border border-[#282f40] hover:border-slate-500 text-xs font-bold text-slate-300 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="text-[#FA0F00] font-extrabold">Adobe ID</span>
                    </button>
                  </div>
                </div>

                {/* Quick Demo Credentials Bar */}
                <div className="p-3 rounded-xl bg-[#0d111c] border border-[#282f40] space-y-2">
                  <div className="text-[10px] font-bold uppercase text-slate-400">⚡ Instant 1-Click Demo Logins</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px]">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('admin@creatorhub.com', 'admin123')}
                      className="p-1.5 rounded bg-rose-950/60 border border-rose-800 text-rose-300 font-bold text-center hover:bg-rose-900"
                    >
                      🛡️ Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('brandon@creatorhub.com', 'password123')}
                      className="p-1.5 rounded bg-indigo-950/60 border border-indigo-800 text-indigo-300 font-bold text-center hover:bg-indigo-900"
                    >
                      🇺🇸 Creator USA
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('ronak@creatorhub.com', 'password123')}
                      className="p-1.5 rounded bg-amber-950/60 border border-amber-800 text-amber-300 font-bold text-center hover:bg-amber-900"
                    >
                      🇮🇳 Creator India
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('client@creatorhub.com', 'password123')}
                      className="p-1.5 rounded bg-purple-950/60 border border-purple-800 text-purple-300 font-bold text-center hover:bg-purple-900"
                    >
                      🧑‍💼 Client
                    </button>
                  </div>
                </div>

              </form>
            )}

            {/* 📝 FORM 2: JOIN / SIGN UP VIEW */}
            {mode === 'signup' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Role Selector */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">I want to join as</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('creator')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        role === 'creator'
                          ? 'bg-[#1473E6] border-[#1473E6] text-white shadow-md'
                          : 'bg-[#0d111c] border-[#282f40] text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>👨‍🎨 Content Creator</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('client')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        role === 'client'
                          ? 'bg-[#1473E6] border-[#1473E6] text-white shadow-md'
                          : 'bg-[#0d111c] border-[#282f40] text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>🧑‍💼 Hiring Client</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#1473E6] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Brandon Li"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0d111c] border border-[#282f40] text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#1473E6] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d111c] border border-[#282f40] text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#1473E6]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-slate-300">Password</label>
                      <button
                        type="button"
                        onClick={() => { setMode('forgot'); setError(''); setSuccessMsg(''); }}
                        className="text-[11px] font-bold text-[#1473E6] hover:underline"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-[#0d111c] border border-[#282f40] text-xs font-semibold text-white focus:outline-none focus:border-[#1473E6]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-3 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d111c] border border-[#282f40] text-xs font-bold text-white focus:outline-none focus:border-[#1473E6]"
                  >
                    <option value="United States">🇺🇸 United States (Los Angeles, NY)</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom (London)</option>
                    <option value="India">🇮🇳 India (Mumbai, Bengaluru)</option>
                    <option value="Japan">🇯🇵 Japan (Tokyo)</option>
                    <option value="Australia">🇦🇺 Australia (Sydney)</option>
                    <option value="Iceland">🇮🇸 Iceland / Europe</option>
                  </select>
                </div>

                {role === 'creator' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Primary Creative Skills</label>
                    <div className="flex flex-wrap gap-1.5">
                      {['Video Editing', 'Audio Editing', 'Motion Graphics', 'Drone Videography', 'Color Grading'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleToggleSkill(s)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                            selectedSkills.includes(s)
                              ? 'bg-[#1473E6] border-[#1473E6] text-white'
                              : 'bg-[#0d111c] border-[#282f40] text-slate-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#1473E6] hover:bg-[#0D66D0] text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Creating Account...' : 'Complete Registration'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Already have an account? <span className="text-[#1473E6]">Sign In</span>
                  </button>
                </div>

              </form>
            )}

            {/* 🔑 FORM 3: FORGOT PASSWORD RECOVERY VIEW */}
            {mode === 'forgot' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="p-4 rounded-xl bg-[#0d111c] border border-[#282f40] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1473E6]">
                    <KeyRound className="w-4 h-4" /> Password Recovery Assistance
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Enter the email address associated with your CreatorHub account. We will send you a single-use password reset link.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Registered Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#1473E6] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. brandon@creatorhub.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0d111c] border border-[#282f40] text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#1473E6] focus:ring-1 focus:ring-[#1473E6] transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#1473E6] hover:bg-[#0D66D0] text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending Link...' : 'Send Password Reset Link'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between pt-2 border-t border-[#282f40]">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-xs font-bold text-[#1473E6] hover:underline"
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
