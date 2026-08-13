const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_FILE = path.join(__dirname, 'data.json');

// Authentic 12+ Regional Creators Dataset
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
    // 1. USA - Brandon Li
    {
      id: "usr_creator_brandon",
      name: "Brandon Li",
      email: "brandon@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "creator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      title: "Global Travel Cinematographer & Director",
      location: "Los Angeles, USA",
      currency: "USD",
      lat: 34.0522,
      lng: -118.2437,
      skills: ["Video Editing", "Cinematography", "Color Grading", "Gimbal Movement", "Premiere Pro"],
      hourlyRate: 95,
      rating: 5.0,
      reviewsCount: 64,
      verified: true,
      available: true,
      bio: "Award-winning travel cinematographer known for handheld gimbal movement, organic color grades, and high-energy short films.",
      equipment: ["Sony FX3", "Sony A7S III", "DJI Ronin RS3 Pro", "DaVinci Resolve Micro Panel"],
      resume: {
        title: "Brandon_Li_Cinematographer_Resume.pdf",
        uploadedAt: "2026-08-01",
        summary: "12+ years directing, shooting, and cutting global brand films for Sony, DJI, and National Geographic.",
        experience: [
          { role: "Director & Cinematographer", company: "Unscripted Studio", duration: "2018 - Present", description: "Shot and edited 40+ short films across 30 countries." }
        ],
        education: "B.F.A. in Film Production, UCLA",
        software: ["DaVinci Resolve", "Adobe Premiere Pro", "Final Cut Pro"],
        fileUrl: ""
      },
      packages: {
        basic: { name: "Cinematic Reel Edit", price: 300, delivery: "2 Days", description: "60s high-impact cinematic video edit with custom music sync and color grade." },
        standard: { name: "Full Travel Vlog Cut", price: 850, delivery: "4 Days", description: "10-15m full YouTube documentary cut with multi-track audio and SFX." },
        premium: { name: "Commercial Campaign", price: 2200, delivery: "7 Days", description: "Full commercial video edit with custom 3D intro, sound design, and color pass." }
      },
      portfolio: [
        { type: "video", title: "Tokyo Nights 4K Reel", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80" }
      ],
      createdAt: new Date().toISOString()
    },
    // 2. UK - Daniel Schiffer
    {
      id: "usr_creator_daniel",
      name: "Daniel Schiffer",
      email: "daniel@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "creator",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      title: "Commercial B-Roll & Product Video Specialist",
      location: "London, UK",
      currency: "GBP",
      lat: 51.5074,
      lng: -0.1278,
      skills: ["Video Editing", "Commercial B-Roll", "Sound Design", "Product Photography", "After Effects"],
      hourlyRate: 65,
      rating: 4.95,
      reviewsCount: 48,
      verified: true,
      available: true,
      bio: "Commercial creator famous for seamless whip-pan B-roll edits, beverage commercials, and energetic sound design.",
      equipment: ["Sony A7 IV", "Laowa Probe Lens", "Aputure 300d II", "Sennheiser MKH416"],
      resume: {
        title: "Daniel_Schiffer_Resume.pdf",
        uploadedAt: "2026-07-20",
        summary: "Specialized in high-conversion food & beverage commercial edits for global Instagram and YouTube campaigns.",
        experience: [
          { role: "Senior Commercial Creator", company: "Schiffer Media", duration: "2020 - Present", description: "Produced 100+ product videos for coffee, tech, and shoe brands." }
        ],
        education: "B.A. in Visual Media, University of the Arts London",
        software: ["Premiere Pro", "After Effects", "Audition"],
        fileUrl: ""
      },
      packages: {
        basic: { name: "Product B-Roll Edit", price: 250, delivery: "2 Days", description: "30s dynamic product commercial cut with fast transitions and SFX." },
        standard: { name: "Full Brand Video", price: 650, delivery: "4 Days", description: "60s commercial cut with speed ramps, custom sound design, and color pass." },
        premium: { name: "Social Ad Campaign (3x)", price: 1500, delivery: "6 Days", description: "3 variations of commercial ads (16:9, 9:16, 1:1) optimized for high CTR." }
      },
      portfolio: [
        { type: "video", title: "Espresso B-Roll Commercial", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" }
      ],
      createdAt: new Date().toISOString()
    },
    // 3. Iceland / Europe - Benjamin Hardman
    {
      id: "usr_creator_benjamin",
      name: "Benjamin Hardman",
      email: "benjamin@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "creator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      title: "Nordic Aerial FPV Pilot & Landscape Photographer",
      location: "Reykjavik, Iceland",
      currency: "EUR",
      lat: 64.1466,
      lng: -21.9426,
      skills: ["Drone Videography", "FPV Flying", "Landscape Photography", "Color Grading", "Cold Climate Shoots"],
      hourlyRate: 85,
      rating: 4.9,
      reviewsCount: 31,
      verified: true,
      available: true,
      bio: "Arctic landscape photographer and FPV drone cinematographer capturing extreme glacial flythroughs and volcanic eruptions.",
      equipment: ["DJI Inspire 3", "Custom 7-inch Cinematic FPV Rig", "RED V-Raptor 8K"],
      resume: {
        title: "Benjamin_Hardman_Resume.pdf",
        uploadedAt: "2026-06-15",
        summary: "Certified aerial pilot with 1200+ flight hours over Arctic terrain for BBC, Netflix, and Apple.",
        experience: [
          { role: "Aerial Director", company: "Arctic Visuals", duration: "2017 - Present", description: "Filmed aerial sequences for nature documentaries and automotive commercials." }
        ],
        education: "EU Certified Commercial Drone Pilot License",
        software: ["DaVinci Resolve Studio", "Lightroom Classic"],
        fileUrl: ""
      },
      packages: {
        basic: { name: "Aerial Stock Pack", price: 350, delivery: "1 Day", description: "10 4K raw aerial landscape clips from Iceland and Nordic regions." },
        standard: { name: "FPV Glacier Tour", price: 900, delivery: "3 Days", description: "Continuous FPV drone flythrough cut with color grading and ambient soundtrack." },
        premium: { name: "Documentary Sequence", price: 2100, delivery: "5 Days", description: "Full aerial cinematography shoot and 4K master output." }
      },
      portfolio: [
        { type: "image", title: "Volcanic FPV Aerial Shot", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" }
      ],
      createdAt: new Date().toISOString()
    },
    // 4. India - Ronak Verma
    {
      id: "usr_creator_ronak",
      name: "Ronak Verma",
      email: "ronak@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "creator",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      title: "Bollywood VFX Lead & DaVinci Certified Colorist",
      location: "Mumbai, India",
      currency: "INR",
      lat: 19.0760,
      lng: 72.8777,
      skills: ["Color Grading", "VFX", "DaVinci Resolve", "Video Editing", "3D Compositing"],
      hourlyRate: 55, // $55 USD equivalent ~ ₹4500
      rating: 5.0,
      reviewsCount: 72,
      verified: true,
      available: true,
      bio: "DaVinci Certified Colorist and VFX supervisor with credits on feature films, music videos, and high-end OTT series.",
      equipment: ["DaVinci Resolve Advanced Panel", "EIZO Coloredge Monitor", "Mac Studio M2 Ultra"],
      resume: {
        title: "Ronak_Verma_Colorist_Resume.pdf",
        uploadedAt: "2026-07-10",
        summary: "Lead Colorist with 10+ years grading feature films, commercials, and high-budget music videos.",
        experience: [
          { role: "Senior Colorist", company: "Prime Focus Studio", duration: "2019 - Present", description: "Graded 80+ feature films and commercial ads." }
        ],
        education: "B.Sc in VFX & Film Technology, Whistling Woods International",
        software: ["DaVinci Resolve Studio", "Nuke", "Fusion"],
        fileUrl: ""
      },
      packages: {
        basic: { name: "Short Film Color Grade", price: 200, delivery: "2 Days", description: "Up to 5 minutes scene-by-scene color matching and film look LUT." },
        standard: { name: "Music Video Grade & VFX", price: 550, delivery: "4 Days", description: "Full music video color grade with skin retouching and glow VFX." },
        premium: { name: "Feature Film Color Pass", price: 1600, delivery: "8 Days", description: "Full 90m feature film color grading with Dolby Vision HDR export." }
      },
      portfolio: [
        { type: "video", title: "Bollywood Action Reel", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80" }
      ],
      createdAt: new Date().toISOString()
    },
    // 5. India - Priya Sharma
    {
      id: "usr_creator_priya",
      name: "Priya Sharma",
      email: "priya@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "creator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      title: "YouTube Shorts & Vertical Reel Editor",
      location: "Bengaluru, India",
      currency: "INR",
      lat: 12.9716,
      lng: 77.5946,
      skills: ["Video Editing", "Shorts", "Captions", "Sound FX", "Premiere Pro"],
      hourlyRate: 35, // ~ ₹2800
      rating: 4.9,
      reviewsCount: 39,
      verified: true,
      available: true,
      bio: "Short-form video editor specialized in tech podcasts, SaaS startup promos, and viral Instagram Reels.",
      equipment: ["MacBook Pro M2 Max", "Rode NT-USB"],
      resume: {
        title: "Priya_Sharma_Resume.pdf",
        uploadedAt: "2026-08-05",
        summary: "Edited 400+ vertical videos for Indian & Silicon Valley tech founders.",
        experience: [
          { role: "Shorts Editor", company: "GrowthMedia", duration: "2023 - Present", description: "Cut viral podcast reels generating 25M+ views." }
        ],
        education: "B.A. in Journalism & Mass Communication, Christ University",
        software: ["Adobe Premiere Pro", "After Effects", "CapCut"],
        fileUrl: ""
      },
      packages: {
        basic: { name: "5x Reels Edit Pack", price: 150, delivery: "2 Days", description: "5 vertical short edits with animated captions and SFX." },
        standard: { name: "15x Reels Pack", price: 400, delivery: "4 Days", description: "15 vertical edits with motion graphics overlays and thumbnail graphics." },
        premium: { name: "Monthly Content Engine", price: 800, delivery: "10 Days", description: "30 vertical videos for complete monthly channel automation." }
      },
      portfolio: [],
      createdAt: new Date().toISOString()
    },
    // 6. Australia - Benn TK
    {
      id: "usr_creator_benntk",
      name: "Benn TK",
      email: "benntk@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "creator",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      title: "Cinematic Transition & Sound Design Master",
      location: "Sydney, Australia",
      currency: "AUD",
      lat: -33.8688,
      lng: 151.2093,
      skills: ["Video Editing", "Seamless Transitions", "Sound Design", "VFX", "After Effects"],
      hourlyRate: 75, // A$110
      rating: 5.0,
      reviewsCount: 57,
      verified: true,
      available: true,
      bio: "World-renowned editor famous for mind-bending seamless transitions, 3D match-cuts, and atmospheric sound design.",
      equipment: ["Sony A7S III", "Sennheiser Shotgun", "RTX 4090 Workstation"],
      resume: {
        title: "Benn_TK_Resume.pdf",
        uploadedAt: "2026-07-25",
        summary: "Pioneer of seamless match-cut editing style with 1M+ subscriber YouTube channel.",
        experience: [
          { role: "Creative Director", company: "TK Visuals", duration: "2019 - Present", description: "Produced visual campaigns for Canon, Australia Tourism, and Samsung." }
        ],
        education: "Self-Taught Master Editor",
        software: ["After Effects", "Premiere Pro", "Audition"],
        fileUrl: ""
      },
      packages: {
        basic: { name: "Transition Edit Pack", price: 280, delivery: "2 Days", description: "60s video edit with custom seamless match-cuts and sound design." },
        standard: { name: "Full Cinematic Edit", price: 750, delivery: "4 Days", description: "3-5m cinematic video edit with custom soundscape and color grade." },
        premium: { name: "Commercial Masterwork", price: 1800, delivery: "7 Days", description: "High-end brand commercial with custom 3D transitions and sound score." }
      },
      portfolio: [
        { type: "video", title: "Sydney Seamless Transition Reel", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80" }
      ],
      createdAt: new Date().toISOString()
    },
    // 7. Japan - Kaito Tanaka
    {
      id: "usr_creator_kaito",
      name: "Kaito Tanaka",
      email: "kaito@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "creator",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
      title: "Cyberpunk 3D Motion Artist & Anime VFX",
      location: "Tokyo, Japan",
      currency: "JPY",
      lat: 35.6762,
      lng: 139.6503,
      skills: ["Motion Graphics", "3D Animation", "Cinema 4D", "OctaneRender", "Anime VFX"],
      hourlyRate: 80, // ¥12,000
      rating: 4.95,
      reviewsCount: 41,
      verified: true,
      available: true,
      bio: "Tokyo-based 3D artist creating neon cyberpunk cityscapes, anime-style visual effects, and VTuber stream overlays.",
      equipment: ["Dual RTX 4090 Rig", "Wacom Cintiq Pro 32"],
      resume: {
        title: "Kaito_Tanaka_3D_Resume.pdf",
        uploadedAt: "2026-06-30",
        summary: "3D Motion Generalist with experience at leading Tokyo anime and gaming studios.",
        experience: [
          { role: "Senior 3D Artist", company: "Neon Pulse Tokyo", duration: "2021 - Present", description: "Created 3D intros for esports tournaments and music artists." }
        ],
        education: "B.A. in Media Arts, Tokyo University of the Arts",
        software: ["Cinema 4D", "OctaneRender", "Blender", "After Effects"],
        fileUrl: ""
      },
      packages: {
        basic: { name: "Cyberpunk Intro Sting", price: 250, delivery: "2 Days", description: "5s animated 3D neon logo reveal with sound effects." },
        standard: { name: "3D Stream Overlay Pack", price: 700, delivery: "4 Days", description: "Complete animated VTuber/Streamer overlay set with 3D screens." },
        premium: { name: "Cyberpunk Music Video 3D", price: 1700, delivery: "8 Days", description: "Full 3D animated music video with custom characters and lighting." }
      },
      portfolio: [
        { type: "image", title: "Tokyo Neon Cyber City Render", url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80" }
      ],
      createdAt: new Date().toISOString()
    },
    // 8. Germany - Sara Dietschy
    {
      id: "usr_creator_sara",
      name: "Sara Dietschy",
      email: "sara@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "creator",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      title: "Tech Podcast Producer & Studio Director",
      location: "Berlin, Germany",
      currency: "EUR",
      lat: 52.5200,
      lng: 13.4050,
      skills: ["Podcast Mastering", "Audio Editing", "Video Editing", "Studio Setup", "Logic Pro"],
      hourlyRate: 70,
      rating: 4.9,
      reviewsCount: 35,
      verified: true,
      available: true,
      bio: "Podcast host and audio producer with 8+ years experience recording and mastering tech & creative founder podcasts.",
      equipment: ["Neumann U87", "Rodecaster Pro II", "Genelec 8030 C"],
      resume: {
        title: "Sara_Dietschy_Resume.pdf",
        uploadedAt: "2026-05-15",
        summary: "Audio Producer specializing in podcast audio mastering and multi-cam video podcast editing.",
        experience: [
          { role: "Lead Producer", company: "That Creative Life", duration: "2020 - Present", description: "Produced 200+ podcast episodes featuring industry leaders." }
        ],
        education: "B.Sc in Audio Engineering, SAE Institute Berlin",
        software: ["Logic Pro X", "Premiere Pro", "iZotope RX"],
        fileUrl: ""
      },
      packages: {
        basic: { name: "Podcast Audio Master", price: 120, delivery: "1 Day", description: "Up to 45 mins audio cleaning, de-humming, and voice EQ." },
        standard: { name: "Full Video Podcast Cut", price: 400, delivery: "3 Days", description: "Multi-cam video podcast edit with intro/outro music placement." },
        premium: { name: "Season Launch Package", price: 1100, delivery: "6 Days", description: "Full season (8 episodes) audio mastering and video clips." }
      },
      portfolio: [],
      createdAt: new Date().toISOString()
    },
    // 9. Client - David Miller
    {
      id: "usr_client_1",
      name: "David Miller",
      email: "client@creatorhub.com",
      passwordHash: bcrypt.hashSync("password123", 10),
      role: "client",
      company: "Nexus Media Network",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      createdAt: new Date().toISOString()
    }
  ],
  jobs: [
    {
      id: "job_1",
      title: "Need Fast-Paced Video Editor for 10 YouTube Tech Shorts",
      clientId: "usr_client_1",
      clientName: "David Miller",
      clientCompany: "Nexus Media Network",
      category: "Video Editing",
      skills: ["Video Editing", "Premiere Pro", "Captions", "Sound Design"],
      budget: 800,
      deadline: "2026-08-25",
      location: "Remote / Los Angeles",
      description: "Looking for a skilled video editor to cut 10 YouTube Shorts (30-60s each). Must add engaging captions and sound effects.",
      proposalsCount: 3,
      status: "open",
      createdAt: new Date().toISOString()
    }
  ],
  proposals: [],
  messages: []
};

class DB {
  constructor() {
    this.init();
  }

  init() {
    this.write(initialData);
  }

  read() {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(content);
    } catch (err) {
      console.error("DB Read error, resetting:", err);
      this.write(initialData);
      return initialData;
    }
  }

  write(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  }

  getUsers() { return this.read().users; }
  getUserById(id) { return this.getUsers().find(u => u.id === id); }
  getUserByEmail(email) { return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()); }
  
  saveUser(user) {
    const data = this.read();
    const idx = data.users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      data.users[idx] = { ...data.users[idx], ...user };
    } else {
      data.users.push(user);
    }
    this.write(data);
    return user;
  }

  getJobs() { return this.read().jobs; }
  saveJob(job) {
    const data = this.read();
    data.jobs.unshift(job);
    this.write(data);
    return job;
  }

  getProposals() { return this.read().proposals; }
  saveProposal(proposal) {
    const data = this.read();
    data.proposals.unshift(proposal);
    const job = data.jobs.find(j => j.id === proposal.jobId);
    if (job) job.proposalsCount = (job.proposalsCount || 0) + 1;
    this.write(data);
    return proposal;
  }

  getMessages(user1, user2) {
    const data = this.read();
    return data.messages.filter(m => 
      (m.senderId === user1 && m.receiverId === user2) ||
      (m.senderId === user2 && m.receiverId === user1)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  addMessage(msg) {
    const data = this.read();
    data.messages.push(msg);
    this.write(data);
    return msg;
  }
}

module.exports = new DB();
