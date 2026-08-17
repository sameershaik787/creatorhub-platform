const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_FILE = path.join(__dirname, 'data.json');

// Authentic Indian Creators Dataset (India Only Focus: Mumbai, Bengaluru, Delhi NCR, Hyderabad, Goa, Pune, Chennai)
const initialData = {
  users: [
    {
      id: "usr_admin",
      name: "Admin Manager",
      email: "admin@creatorhub.com",
      passwordHash: bcrypt.hashSync("admin123", 10),
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      createdAt: new Date().toISOString()
    },
    // 1. India - Ronak Sharma (Mumbai)
    {
      id: "usr_creator_ronak",
      name: "Ronak Sharma",
      email: "ronak@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "creator",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      title: "Senior DaVinci Colorist & Bollywood VFX Editor",
      location: "Mumbai, India",
      currency: "INR",
      lat: 19.0760,
      lng: 72.8777,
      skills: ["Color Grading", "Video Editing", "VFX", "DaVinci Resolve", "Commercials"],
      hourlyRate: 45,
      rating: 4.9,
      reviewsCount: 88,
      verified: true,
      available: true,
      earnings: 12500,
      escrowBalance: 0,
      bio: "10+ years color grading feature films, OTT web series, and music videos in Mumbai. Master of film print emulation.",
      equipment: ["DaVinci Resolve Studio", "Apple Mac Studio M2 Ultra", "ProArt Reference Monitor"],
      resume: {
        title: "Ronak_Sharma_Colorist_Resume.pdf",
        uploadedAt: "2026-08-05",
        summary: "Lead Colorist on 25+ OTT streaming series and top Indian commercial brands.",
        experience: [
          { role: "Senior Colorist", company: "Prime Color Labs Mumbai", duration: "2019 - Present", description: "Graded commercial videos and feature trailers." }
        ],
        education: "B.Sc. in Digital Filmmaking, Whistling Woods International",
        software: ["DaVinci Resolve Studio", "BaseLight", "Adobe After Effects"],
        fileUrl: ""
      },
      packages: {
        basic: { name: "Music Video Color Pass", price: 150, delivery: "2 Days", description: "Full scene color grading & skin tone match." },
        standard: { name: "Commercial Campaign Cut", price: 450, delivery: "3 Days", description: "Color grading + kinetic titles + sound polish." },
        premium: { name: "Feature Film Package", price: 1200, delivery: "6 Days", description: "Complete OTT series color pass + 4K master export." }
      },
      portfolio: [
        { type: "video", title: "Bollywood Action Trailer Grade", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80" }
      ],
      createdAt: new Date().toISOString()
    },
    // 2. India - Ananya Roy (Bengaluru)
    {
      id: "usr_creator_ananya",
      name: "Ananya Roy",
      email: "ananya@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "creator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      title: "Tech Reels & YouTube Shorts Specialist",
      location: "Bengaluru, India",
      currency: "INR",
      lat: 12.9716,
      lng: 77.5946,
      skills: ["Video Editing", "Shorts Editing", "Motion Graphics", "CapCut Pro", "Premiere Pro"],
      hourlyRate: 35,
      rating: 5.0,
      reviewsCount: 112,
      verified: true,
      available: true,
      earnings: 9800,
      escrowBalance: 0,
      bio: "High-retention video editor for tech founders and top creators. Specialized in fast-paced hook edits & sound design.",
      equipment: ["Sony A7 IV", "MacBook Pro M3 Max", "Shure SM7B"],
      resume: {
        title: "Ananya_Roy_Editor_Resume.pdf",
        uploadedAt: "2026-08-08",
        summary: "Created 300+ viral Shorts with over 50 Million combined views.",
        experience: [
          { role: "Lead Short-Form Editor", company: "Bengaluru Media House", duration: "2022 - Present", description: "Edited high-retention reels." }
        ],
        education: "B.A. in Media Communications, Christ University Bengaluru",
        software: ["Adobe Premiere Pro", "After Effects", "CapCut Pro"],
        fileUrl: ""
      },
      packages: {
        basic: { name: "5 Shorts Reel Pack", price: 120, delivery: "2 Days", description: "5 high-hook vertical reels with captions & SFX." },
        standard: { name: "15 Shorts Monthly Retainer", price: 350, delivery: "5 Days", description: "15 vertical reels with kinetic typography." },
        premium: { name: "Complete Brand Video Suite", price: 800, delivery: "7 Days", description: "YouTube longform + 20 Reels + thumbnails." }
      },
      portfolio: [
        { type: "video", title: "Tech Startup Launch Reel", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" }
      ],
      createdAt: new Date().toISOString()
    },
    // 3. India - Vikramaditya Singh (Delhi NCR)
    {
      id: "usr_creator_vikram",
      name: "Vikramaditya Singh",
      email: "vikram@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "creator",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      title: "FPV Cinematic Drone Pilot & Commercial Photographer",
      location: "Delhi NCR, India",
      currency: "INR",
      lat: 28.6139,
      lng: 77.2090,
      skills: ["Drone Videography", "FPV Flying", "Aerial Photography", "Cinematography"],
      hourlyRate: 60,
      rating: 4.9,
      reviewsCount: 54,
      verified: true,
      available: true,
      earnings: 14200,
      escrowBalance: 0,
      bio: "DGCA certified drone pilot specializing in indoor FPV flythroughs for luxury resorts, automobile brands, and architectural shoots.",
      equipment: ["DJI Avata 2 FPV", "Custom 5-inch Cinewhoop", "RED Komodo 6K", "DJI Mavic 3 Pro"],
      resume: {
        title: "Vikramaditya_Drone_Pilot_Resume.pdf",
        uploadedAt: "2026-08-10",
        summary: "DGCA Commercial License holder with 500+ flying hours across India.",
        experience: [
          { role: "Chief FPV Pilot", company: "Aerial Motion Delhi", duration: "2020 - Present", description: "Shot commercial FPV shots." }
        ],
        education: "B.Tech in Aeronautical Engineering, IIT Delhi",
        software: ["ReelSteady GO", "Gyroflow", "Premiere Pro"],
        fileUrl: ""
      },
      packages: {
        basic: { name: "Indoor FPV Shot", price: 200, delivery: "1 Day", description: "1-minute continuous indoor FPV walkthrough." },
        standard: { name: "Resort Aerial Shoot", price: 500, delivery: "3 Days", description: "Full resort 4K aerial video + color graded footage." },
        premium: { name: "Commercial Film Aerials", price: 1100, delivery: "5 Days", description: "2-day FPV + heavy lift aerial shooting package." }
      },
      portfolio: [
        { type: "video", title: "Luxury Hotel FPV Flythrough", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80" }
      ],
      createdAt: new Date().toISOString()
    },
    // 4. India - Priya Nair (Hyderabad)
    {
      id: "usr_creator_priya",
      name: "Priya Nair",
      email: "priya@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "creator",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      title: "Audio Engineer & Podcast Mastering Specialist",
      location: "Hyderabad, India",
      currency: "INR",
      lat: 17.3850,
      lng: 78.4867,
      skills: ["Audio Editing", "Podcast Mixing", "Vocal Cleanup", "Pro Tools", "Sound Design"],
      hourlyRate: 40,
      rating: 5.0,
      reviewsCount: 76,
      verified: true,
      available: true,
      earnings: 8400,
      escrowBalance: 0,
      bio: "Pro Tools certified audio engineer with 8+ years experience mixing podcasts, audiobooks, and background scores.",
      equipment: ["Pro Tools Ultimate", "Universal Audio Apollo Twin", "Neumann U87 Ai"],
      resume: {
        title: "Priya_Nair_Audio_Engineer_Resume.pdf",
        uploadedAt: "2026-08-04",
        summary: "Mixed 200+ podcast episodes for Spotify and Audible creators.",
        experience: [
          { role: "Senior Audio Producer", company: "SoundCraft Hyderabad", duration: "2021 - Present", description: "Audio mixing & vocal restoration." }
        ],
        education: "Diploma in Sound Engineering, AR Rahman Music Academy",
        software: ["Avid Pro Tools", "iZotope RX 10", "Logic Pro X"],
        fileUrl: ""
      },
      packages: {
        basic: { name: "Single Episode Mix", price: 100, delivery: "1 Day", description: "Noise cleanup, vocal leveling & background score sync." },
        standard: { name: "Podcast 4-Pack Season", price: 320, delivery: "4 Days", description: "4 episode mastering + custom intro/outro sound FX." },
        premium: { name: "Full Audio Series Suite", price: 750, delivery: "7 Days", description: "Spatial audio mixing + mastering for Audible/Spotify." }
      },
      portfolio: [
        { type: "video", title: "Podcast Audio Restoration", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80" }
      ],
      createdAt: new Date().toISOString()
    },
    // Client User - Brand Hirer
    {
      id: "usr_client_demo",
      name: "Rohit Verma",
      company: "Nexus Digital India",
      email: "client@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "client",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      location: "Mumbai, India",
      createdAt: new Date().toISOString()
    }
  ],
  jobs: [
    {
      id: "job_sample_1",
      title: "Need Senior Video Editor for 10 Tech Reels & Shorts",
      clientId: "usr_client_demo",
      clientName: "Rohit Verma",
      clientCompany: "Nexus Digital India",
      category: "Video Editing",
      skills: ["Video Editing", "Shorts Editing", "Motion Graphics"],
      budget: 350,
      currency: "INR",
      deadline: "2026-09-15",
      location: "Mumbai / Remote",
      description: "Looking for an expert editor to cut 10 fast-paced tech Reels with Alex Hormozi style kinetic captions, sound effects, and color pass.",
      proposalsCount: 2,
      status: "open",
      deliverable: "",
      deliverableStatus: "none",
      escrowStatus: "unfunded",
      hiredCreatorId: "",
      createdAt: new Date().toISOString()
    }
  ],
  proposals: [],
  messages: [],
  reviews: []
};

// Initialize DB file
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

function readDB() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return initialData;
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

module.exports = {
  getUsers: () => readDB().users || [],
  getUserById: (id) => (readDB().users || []).find(u => u.id === id),
  getUserByEmail: (email) => (readDB().users || []).find(u => u.email === email),
  saveUser: (updatedUser) => {
    const dbData = readDB();
    const idx = dbData.users.findIndex(u => u.id === updatedUser.id);
    if (idx !== -1) {
      dbData.users[idx] = updatedUser;
    } else {
      dbData.users.push(updatedUser);
    }
    writeDB(dbData);
  },
  getJobs: () => readDB().jobs || [],
  getJobById: (id) => (readDB().jobs || []).find(j => j.id === id),
  saveJob: (job) => {
    const dbData = readDB();
    const idx = dbData.jobs.findIndex(j => j.id === job.id);
    if (idx !== -1) {
      dbData.jobs[idx] = job;
    } else {
      dbData.jobs.push(job);
    }
    writeDB(dbData);
  },
  getProposals: () => readDB().proposals || [],
  saveProposal: (prop) => {
    const dbData = readDB();
    const idx = dbData.proposals.findIndex(p => p.id === prop.id);
    if (idx !== -1) {
      dbData.proposals[idx] = prop;
    } else {
      dbData.proposals.push(prop);
    }
    writeDB(dbData);
  },
  getMessages: (userId1, userId2) => {
    const msgs = readDB().messages || [];
    return msgs.filter(m => 
      (m.senderId === userId1 && m.receiverId === userId2) ||
      (m.senderId === userId2 && m.receiverId === userId1)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  },
  addMessage: (msg) => {
    const dbData = readDB();
    if (!dbData.messages) dbData.messages = [];
    dbData.messages.push(msg);
    writeDB(dbData);
  },
  addReview: (review) => {
    const dbData = readDB();
    if (!dbData.reviews) dbData.reviews = [];
    dbData.reviews.push(review);
    writeDB(dbData);
  }
};
