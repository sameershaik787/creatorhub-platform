import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import Navbar from './components/Navbar';
import AICopilotWidget from './components/AICopilotWidget';
import Home from './pages/Home';
import SearchCreators from './pages/SearchCreators';
import JobBoard from './pages/JobBoard';
import CreatorTools from './pages/CreatorTools';
import CreatorDashboard from './pages/CreatorDashboard';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <Router>
          <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#1473E6] selection:text-white">
            
            {/* Top Navigation */}
            <Navbar />

            {/* Main Application Body */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchCreators />} />
                <Route path="/jobs" element={<JobBoard />} />
                <Route path="/tools" element={<CreatorTools />} />
                <Route path="/creator-dashboard" element={<CreatorDashboard />} />
                <Route path="/client-dashboard" element={<ClientDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>

            {/* Persistent RAG AI Copilot Floating Assistant */}
            <AICopilotWidget />

            {/* Dark Translucent Multi-Column Footer */}
            <footer className="bg-slate-950 border-t border-white/10 py-12 text-slate-400 text-xs">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
                
                <div className="md:col-span-2 space-y-3">
                  <Link to="/" className="text-xl font-extrabold text-white">
                    Creator<span className="text-[#1473E6]">Hub</span>
                  </Link>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                    Freelance marketplace for content creators, cinematographers, sound engineers, and motion artists across India (Mumbai, Bengaluru, Delhi, Hyderabad, Goa & Pune).
                  </p>
                  <div className="text-[11px] text-slate-500 font-semibold">
                    Complete 12-Step Job Lifecycle & Milestone Escrow Payments.
                  </div>
                </div>

                <div>
                  <h4 className="font-extrabold text-white text-sm mb-3">Marketplace</h4>
                  <ul className="space-y-2 text-slate-400">
                    <li><Link to="/search" className="hover:text-[#1473E6] transition-colors">Find Content Creators</Link></li>
                    <li><Link to="/jobs" className="hover:text-[#1473E6] transition-colors">Freelance Job Board</Link></li>
                    <li><Link to="/search?skill=Video Editing" className="hover:text-[#1473E6] transition-colors">Video Editing Specialists</Link></li>
                    <li><Link to="/search?skill=Audio Editing" className="hover:text-[#1473E6] transition-colors">Podcast & Sound Mixing</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-extrabold text-white text-sm mb-3">Creator Tools</h4>
                  <ul className="space-y-2 text-slate-400">
                    <li><Link to="/tools" className="hover:text-[#1473E6] transition-colors">Freelance Rate Calculator</Link></li>
                    <li><Link to="/tools" className="hover:text-[#1473E6] transition-colors">NDA & Commercial Generator</Link></li>
                    <li><Link to="/tools" className="hover:text-[#1473E6] transition-colors">AI Script Hook Generator</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-extrabold text-white text-sm mb-3">Account & Admin</h4>
                  <ul className="space-y-2 text-slate-400">
                    <li><Link to="/login" className="hover:text-[#1473E6] transition-colors">Sign In / Join</Link></li>
                    <li><Link to="/creator-dashboard" className="hover:text-[#1473E6] transition-colors">Digital Resume Editor</Link></li>
                    <li><Link to="/admin" className="hover:text-[#1473E6] transition-colors">Admin Verification Portal</Link></li>
                  </ul>
                </div>

              </div>

              <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
                <div>© 2026 CreatorHub Inc. All rights reserved.</div>
                <div className="flex gap-4 mt-2 sm:mt-0">
                  <span>Privacy Policy</span>
                  <span>Terms of Service</span>
                  <span>INR Milestone Escrow</span>
                </div>
              </div>
            </footer>

          </div>
        </Router>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
