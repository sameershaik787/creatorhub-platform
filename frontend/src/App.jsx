import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import Navbar from './components/Navbar';
import AICopilotWidget from './components/AICopilotWidget';
import Home from './pages/Home';
import Login from './pages/Login';
import SearchCreators from './pages/SearchCreators';
import JobBoard from './pages/JobBoard';
import CreatorDashboard from './pages/CreatorDashboard';
import ClientDashboard from './pages/ClientDashboard';
import CreatorTools from './pages/CreatorTools';
import AdminDashboard from './pages/AdminDashboard';
import { Globe } from 'lucide-react';

function Footer() {
  return (
    <footer className="mt-20 border-t border-[#282f40] bg-[#0d111c] py-14 px-4 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Multi-Column Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase text-[11px] tracking-wider">Creativity & Design</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><a href="/search?skill=Video%20Editing" className="hover:text-white transition-colors">Video Editing & Cinematography</a></li>
              <li><a href="/search?skill=Motion%20Graphics" className="hover:text-white transition-colors">Motion Graphics & 3D Intros</a></li>
              <li><a href="/search?skill=Audio%20Editing" className="hover:text-white transition-colors">Audio & Podcast Mixing</a></li>
              <li><a href="/search?skill=Drone%20Videography" className="hover:text-white transition-colors">Aerial FPV Flying</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase text-[11px] tracking-wider">Solutions for Hirers</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><a href="/client-dashboard" className="hover:text-white transition-colors">Post a Creator Job</a></li>
              <li><a href="/search" className="hover:text-white transition-colors">Search Creators by City</a></li>
              <li><a href="/jobs" className="hover:text-white transition-colors">Freelance Project Board</a></li>
              <li><a href="/admin" className="hover:text-white transition-colors">Admin Verification Queue</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase text-[11px] tracking-wider">Creator Studio Tools</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><a href="/tools" className="hover:text-white transition-colors">Freelance Rate Calculator</a></li>
              <li><a href="/tools" className="hover:text-white transition-colors">Contract & NDA Generator</a></li>
              <li><a href="/tools" className="hover:text-white transition-colors">RAG AI Script Generator</a></li>
              <li><a href="/tools" className="hover:text-white transition-colors">Commercial Licensing Rights</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase text-[11px] tracking-wider">Global Regions</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><span className="text-slate-300">🇺🇸 United States (USD $)</span></li>
              <li><span className="text-slate-300">🇬🇧 United Kingdom (GBP £)</span></li>
              <li><span className="text-slate-300">🇪🇺 Europe (EUR €)</span></li>
              <li><span className="text-slate-300">🇮🇳 India (INR ₹)</span></li>
              <li><span className="text-slate-300">🇯🇵 Japan (JPY ¥)</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar - RED SQUARE "A" ICON REMOVED */}
        <div className="pt-8 border-t border-[#282f40] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-white text-sm">
              Creator<span className="text-[#1473E6]">Hub</span>
            </span>
            <span className="text-slate-500">Copyright © 2026 CreatorHub Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Use</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Cookie Preferences</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-[#1473E6] selection:text-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<SearchCreators />} />
                <Route path="/jobs" element={<JobBoard />} />
                <Route path="/tools" element={<CreatorTools />} />
                <Route path="/creator-dashboard" element={<CreatorDashboard />} />
                <Route path="/client-dashboard" element={<ClientDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
            
            {/* CreatorHub RAG AI Floating Assistant */}
            <AICopilotWidget />
          </div>
        </Router>
      </CurrencyProvider>
    </AuthProvider>
  );
}
