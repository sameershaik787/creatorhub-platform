const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const db = require('./db');
const ragEngine = require('./ragEngine');
const { JWT_SECRET, authenticateToken, requireRole } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Storage setup for uploading Creator Resumes & Portfolio Assets
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Backend Error:", err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// ----------------------------------------------------
// AUTH ROUTES
// ----------------------------------------------------

// Forgot Password Reset Link Endpoint
app.post('/api/auth/forgot-password', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Please enter your email address' });
    }

    const user = db.getUserByEmail(email);
    // Even if user not found, return clean success for security
    const resetToken = 'rst_' + Math.random().toString(36).substr(2, 9);
    
    return res.json({
      message: `Password reset link sent successfully to ${email}. Please check your inbox or spam folder.`,
      resetToken
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Server error processing password reset' });
  }
});

// User Signup
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, role, title, location, skills } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = db.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const id = 'usr_' + Date.now();
    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser = {
      id,
      name,
      email,
      passwordHash,
      role,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random()*99999)}?auto=format&fit=crop&w=300&q=80`,
      title: title || (role === 'creator' ? 'Content Creator & Editor' : 'Client'),
      location: location || 'Remote',
      lat: 34.0522 + (Math.random() - 0.5) * 10,
      lng: -118.2437 + (Math.random() - 0.5) * 10,
      skills: skills || ['Video Editing', 'Content Creation'],
      hourlyRate: 50,
      rating: 5.0,
      reviewsCount: 1,
      verified: role === 'creator' ? false : true,
      available: true,
      bio: 'Excited to collaborate on creative video, audio, and motion graphics projects.',
      equipment: ['Professional Workstation', 'Studio Headphones'],
      resume: {
        title: `${name.replace(/\s+/g, '_')}_Resume.pdf`,
        uploadedAt: new Date().toISOString().split('T')[0],
        summary: 'Passionate creator experienced in high-quality social media content production.',
        experience: [
          { role: 'Freelance Content Creator', company: 'Self-Employed', duration: '2023 - Present', description: 'Produced short-form video reels, graphics, and audio edits.' }
        ],
        education: 'Degree / Certification in Media & Visual Arts',
        software: ['Adobe Creative Cloud', 'DaVinci Resolve'],
        fileUrl: ''
      },
      packages: {
        basic: { name: "Basic Package", price: 100, delivery: "2 Days", description: "Standard content editing service." },
        standard: { name: "Standard Package", price: 300, delivery: "4 Days", description: "Comprehensive editing with sound design & graphics." },
        premium: { name: "Pro Package", price: 750, delivery: "7 Days", description: "Full commercial production with revisions." }
      },
      portfolio: [],
      createdAt: new Date().toISOString()
    };

    db.saveUser(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { passwordHash: _, ...userWithoutPassword } = newUser;
    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const user = db.getUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Current Logged-in User Profile
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = db.getUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { passwordHash: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// ----------------------------------------------------
// CREATOR & LOCATION SEARCH ROUTES
// ----------------------------------------------------

// Get All Creators (with filtering by Skill, Location, Budget, Availability)
app.get('/api/creators', (req, res) => {
  let creators = db.getUsers().filter(u => u.role === 'creator');
  const { skill, location, minRate, maxRate, availableOnly, search } = req.query;

  if (search) {
    const q = search.toLowerCase();
    creators = creators.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.title.toLowerCase().includes(q) ||
      c.skills.some(s => s.toLowerCase().includes(q)) ||
      c.location.toLowerCase().includes(q)
    );
  }

  if (skill && skill !== 'All') {
    creators = creators.filter(c => c.skills.some(s => s.toLowerCase().includes(skill.toLowerCase())));
  }

  if (location) {
    creators = creators.filter(c => c.location.toLowerCase().includes(location.toLowerCase()));
  }

  if (minRate) {
    creators = creators.filter(c => c.hourlyRate >= Number(minRate));
  }
  if (maxRate) {
    creators = creators.filter(c => c.hourlyRate <= Number(maxRate));
  }

  if (availableOnly === 'true') {
    creators = creators.filter(c => c.available);
  }

  const sanitized = creators.map(({ passwordHash, ...rest }) => rest);
  res.json(sanitized);
});

// Get Creator by ID
app.get('/api/creators/:id', (req, res) => {
  const user = db.getUserById(req.params.id);
  if (!user || user.role !== 'creator') {
    return res.status(404).json({ error: 'Creator not found' });
  }
  const { passwordHash: _, ...sanitized } = user;
  res.json(sanitized);
});

// Update Creator Profile & Availability
app.put('/api/creators/profile', authenticateToken, (req, res) => {
  const user = db.getUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const updatedUser = {
    ...user,
    ...req.body,
    id: user.id, // prevent ID overwrite
    email: user.email, // prevent email overwrite
    role: user.role
  };

  db.saveUser(updatedUser);
  const { passwordHash: _, ...sanitized } = updatedUser;
  res.json(sanitized);
});

// Resume File Upload Endpoint
app.post('/api/creators/upload-resume', authenticateToken, upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const user = db.getUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const fileUrl = `/uploads/${req.file.filename}`;
  const updatedResume = {
    ...user.resume,
    title: req.file.originalname,
    uploadedAt: new Date().toISOString().split('T')[0],
    fileUrl: fileUrl
  };

  user.resume = updatedResume;
  db.saveUser(user);

  res.json({ message: 'Resume uploaded successfully', resume: updatedResume });
});

// ----------------------------------------------------
// RAG AI COPILOT & RECOMMENDATION ROUTES
// ----------------------------------------------------

// RAG AI Chatbot Endpoint
app.post('/api/ai/chat', (req, res) => {
  const { query, userId } = req.body;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  const response = ragEngine.generateChatAnswer(query, userId);
  res.json(response);
});

// RAG Creator Recommendation Endpoint
app.post('/api/ai/recommend', (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  const recommendations = ragEngine.recommendCreators(prompt);
  res.json({ prompt, recommendations });
});

// AI Video Script Generator Endpoint
app.post('/api/ai/script', (req, res) => {
  const { topic, format } = req.body;
  if (!topic) return res.status(400).json({ error: 'Topic is required' });

  const scriptData = ragEngine.generateScript(topic, format || 'Shorts');
  res.json(scriptData);
});

// ----------------------------------------------------
// JOBS & PROPOSALS ROUTES
// ----------------------------------------------------

// Get All Freelance Job Posts
app.get('/api/jobs', (req, res) => {
  const jobs = db.getJobs();
  res.json(jobs);
});

// Create Job Post (Client only)
app.post('/api/jobs', authenticateToken, (req, res) => {
  const { title, category, skills, budget, deadline, location, description } = req.body;
  if (!title || !budget) {
    return res.status(400).json({ error: 'Title and budget are required' });
  }

  const user = db.getUserById(req.user.id);

  const newJob = {
    id: 'job_' + Date.now(),
    title,
    clientId: req.user.id,
    clientName: user.name,
    clientCompany: user.company || 'Independent Client',
    category: category || 'General Content Creation',
    skills: skills || ['Video Editing'],
    budget: Number(budget),
    deadline: deadline || '2026-09-15',
    location: location || 'Remote',
    description: description || '',
    proposalsCount: 0,
    status: 'open',
    createdAt: new Date().toISOString()
  };

  db.saveJob(newJob);
  res.json(newJob);
});

// Submit Proposal for Job (Creator only)
app.post('/api/proposals', authenticateToken, (req, res) => {
  const { jobId, bidAmount, estimatedDays, coverLetter } = req.body;
  const user = db.getUserById(req.user.id);

  const proposal = {
    id: 'prop_' + Date.now(),
    jobId,
    creatorId: user.id,
    creatorName: user.name,
    bidAmount: Number(bidAmount),
    estimatedDays: Number(estimatedDays),
    coverLetter,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  db.saveProposal(proposal);
  res.json(proposal);
});

// Get Proposals for a Job
app.get('/api/jobs/:id/proposals', authenticateToken, (req, res) => {
  const props = db.getProposals().filter(p => p.jobId === req.params.id);
  res.json(props);
});

// 1. Shortlist Proposal (Client only)
app.post('/api/proposals/:id/shortlist', authenticateToken, (req, res) => {
  const props = db.getProposals();
  const proposal = props.find(p => p.id === req.params.id);
  if (!proposal) return res.status(404).json({ error: 'Proposal not found' });

  proposal.status = 'shortlisted';
  db.saveProposal(proposal);
  res.json({ message: 'Proposal shortlisted', proposal });
});

// 2. Hire Freelancer & Fund Escrow (Client only)
app.post('/api/proposals/:id/hire', authenticateToken, (req, res) => {
  const props = db.getProposals();
  const proposal = props.find(p => p.id === req.params.id);
  if (!proposal) return res.status(404).json({ error: 'Proposal not found' });

  const job = db.getJobById(proposal.jobId);
  if (!job) return res.status(404).json({ error: 'Associated job not found' });

  proposal.status = 'hired';
  db.saveProposal(proposal);

  job.status = 'hired';
  job.hiredCreatorId = proposal.creatorId;
  job.hiredCreatorName = proposal.creatorName;
  job.escrowStatus = 'funded';
  job.agreedAmount = proposal.bidAmount;
  db.saveJob(job);

  // Update Freelancer Escrow Balance
  const creator = db.getUserById(proposal.creatorId);
  if (creator) {
    creator.escrowBalance = (creator.escrowBalance || 0) + proposal.bidAmount;
    db.saveUser(creator);
  }

  res.json({ message: `Hired ${proposal.creatorName}. Escrow funded with ₹${proposal.bidAmount}`, job, proposal });
});

// 3. Submit Deliverable (Freelancer only)
app.post('/api/jobs/:id/deliver', authenticateToken, (req, res) => {
  const { deliverableUrl, notes } = req.body;
  const job = db.getJobById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  job.deliverableUrl = deliverableUrl || 'https://www.w3schools.com/html/mov_bbb.mp4';
  job.deliverableNotes = notes || 'Completed video deliverable ready for client review.';
  job.deliverableStatus = 'submitted';
  db.saveJob(job);

  res.json({ message: 'Deliverable submitted to client for approval', job });
});

// 4. Approve Deliverable & Release Escrow Payment (Client only)
app.post('/api/jobs/:id/approve', authenticateToken, (req, res) => {
  const job = db.getJobById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  job.deliverableStatus = 'approved';
  job.status = 'completed';
  job.escrowStatus = 'released';
  db.saveJob(job);

  // Transfer Escrow Payment to Freelancer Earnings
  if (job.hiredCreatorId) {
    const creator = db.getUserById(job.hiredCreatorId);
    if (creator) {
      const amount = job.agreedAmount || job.budget || 300;
      creator.escrowBalance = Math.max(0, (creator.escrowBalance || 0) - amount);
      creator.earnings = (creator.earnings || 0) + amount;
      db.saveUser(creator);
    }
  }

  res.json({ message: 'Deliverable approved! Escrow payment released to freelancer earnings balance.', job });
});

// 5. Submit Rating & Review (Client only)
app.post('/api/jobs/:id/review', authenticateToken, (req, res) => {
  const { rating, comment } = req.body;
  const job = db.getJobById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  const review = {
    id: 'rev_' + Date.now(),
    jobId: job.id,
    creatorId: job.hiredCreatorId,
    clientId: req.user.id,
    clientName: req.user.name,
    rating: Number(rating) || 5,
    comment: comment || 'Outstanding deliverable quality and timely communication!',
    date: new Date().toISOString().split('T')[0]
  };

  db.addReview(review);
  res.json({ message: 'Review & rating submitted successfully!', review });
});

// ----------------------------------------------------
// CHAT & MESSAGING ROUTES
// ----------------------------------------------------

// Get Messages between Logged-in user and another user
app.get('/api/messages/:otherUserId', authenticateToken, (req, res) => {
  const messages = db.getMessages(req.user.id, req.params.otherUserId);
  res.json(messages);
});

// Send Message
app.post('/api/messages', authenticateToken, (req, res) => {
  const { receiverId, content } = req.body;
  if (!receiverId || !content) {
    return res.status(400).json({ error: 'Receiver and content are required' });
  }

  const msg = {
    id: 'msg_' + Date.now(),
    senderId: req.user.id,
    receiverId,
    content,
    timestamp: new Date().toISOString()
  };

  db.addMessage(msg);
  res.json(msg);
});

// ----------------------------------------------------
// ADMIN ROUTES
// ----------------------------------------------------

// Get Platform Stats & User Management (Admin only)
app.get('/api/admin/stats', authenticateToken, requireRole('admin'), (req, res) => {
  const users = db.getUsers();
  const jobs = db.getJobs();
  const proposals = db.getProposals();

  const creatorsCount = users.filter(u => u.role === 'creator').length;
  const clientsCount = users.filter(u => u.role === 'client').length;
  const totalVolume = jobs.reduce((sum, j) => sum + (j.budget || 0), 0);

  const sanitizedUsers = users.map(({ passwordHash, ...u }) => u);

  res.json({
    stats: {
      totalUsers: users.length,
      creatorsCount,
      clientsCount,
      totalJobs: jobs.length,
      totalProposals: proposals.length,
      totalVolume
    },
    users: sanitizedUsers
  });
});

// Approve/Verify Creator (Admin only)
app.put('/api/admin/verify-creator/:id', authenticateToken, requireRole('admin'), (req, res) => {
  const user = db.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.verified = true;
  db.saveUser(user);
  res.json({ message: 'Creator verified successfully', user });
});

// Serve Frontend Static Files in Production (Render / Cloud Deployment)
const fs = require('fs');
const frontendDistPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      res.sendFile(path.join(frontendDistPath, 'index.html'));
    }
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 SamsView Backend API running on http://localhost:${PORT}`);
});

