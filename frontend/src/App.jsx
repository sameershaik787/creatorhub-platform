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
          <div className="min-h-screen bg-[#FFFFFF] text-[#222325] flex flex-col font-sans selection:bg-[#1DBF73] selection:text-white">
            
            {/* Top Navigation Header */}
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

            {/* Iconic Fiverr Dark Footer */}
            <footer className="bg-[#1f2127] border-t border-slate-800 py-12 text-slate-300 text-xs">
              <div className="max-w-7xl mx-auto px-4 lg:px-10 grid grid-cols-1 md:grid-cols-5 gap-8">
                
                <div className="md:col-span-2 space-y-3">
                  <Link to="/" className="text-2xl font-extrabold text-white">
                    Creator<span className="text-[#1DBF73]">Hub</span>
                    <span className="text-[#1DBF73]">.</span>
                  </Link>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                    Find the perfect Indian creative services for your business. Verified cinematographers, DaVinci colorists, FPV drone pilots, and audio engineers in Mumbai, Bengaluru, Delhi & Hyderabad.
                  </p>
                  <div className="text-[11px] text-slate-400 font-bold">
                    Escrow Protected • Real-Time INR Conversions
                  </div>
                </div>

                <div>
                  <h4 className="font-extrabold text-white text-sm mb-3">Categories</h4>
                  <ul className="space-y-2 text-slate-400">
                    <li><Link to="/search?skill=Video Editing" className="hover:text-[#1DBF73] transition-colors">Video Editing & Reels</Link></li>
                    <li><Link to="/search?skill=Color Grading" className="hover:text-[#1DBF73] transition-colors">DaVinci Color Grading</Link></li>
                    <li><Link to="/search?skill=Drone Videography" className="hover:text-[#1DBF73] transition-colors">FPV Drone Flying</Link></li>
                    <li><Link to="/search?skill=Audio Editing" className="hover:text-[#1DBF73] transition-colors">Audio & Podcast Mixing</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-extrabold text-white text-sm mb-3">Creator Tools</h4>
                  <ul className="space-y-2 text-slate-400">
                    <li><Link to="/tools" className="hover:text-[#1DBF73] transition-colors">Freelance Rate Calculator</Link></li>
                    <li><Link to="/tools" className="hover:text-[#1DBF73] transition-colors">Commercial Contract Generator</Link></li>
                    <li><Link to="/tools" className="hover:text-[#1DBF73] transition-colors">AI Video Script Generator</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-extrabold text-white text-sm mb-3">Account</h4>
                  <ul className="space-y-2 text-slate-400">
                    <li><Link to="/login" className="hover:text-[#1DBF73] transition-colors">Sign In / Join</Link></li>
                    <li><Link to="/creator-dashboard" className="hover:text-[#1DBF73] transition-colors">Creator Dashboard</Link></li>
                    <li><Link to="/admin" className="hover:text-[#1DBF73] transition-colors">Admin Verification Portal</Link></li>
                  </ul>
                </div>

              </div>

              <div className="max-w-7xl mx-auto px-4 lg:px-10 mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
                <div>© 2026 CreatorHub Ltd. All rights reserved.</div>
                <div className="flex gap-4 mt-2 sm:mt-0 font-semibold">
                  <span>Privacy Policy</span>
                  <span>Terms of Service</span>
                  <span>Escrow Protection</span>
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
