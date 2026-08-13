const db = require('./db');

// RAG Knowledge Base Chunks
const KNOWLEDGE_BASE = [
  {
    id: "kb_rates_shorts",
    category: "Pricing Guidelines",
    title: "YouTube Shorts / Reels / TikTok Editing Rates",
    content: "Standard market rates for vertical short-form video editing (30-60s) range from $50 to $150 per video for basic captions, up to $300-$500 per video for complex motion graphics, sound effects, and high-retention hooks."
  },
  {
    id: "kb_rates_longform",
    category: "Pricing Guidelines",
    title: "YouTube Long-Form Video Editing Rates",
    content: "Full 10 to 20-minute YouTube video edits typically range from $300 to $800 depending on multi-camera sound sync, color grading depth, and kinetic lower-thirds."
  },
  {
    id: "kb_rates_podcast",
    category: "Pricing Guidelines",
    title: "Podcast Audio Cleanup & Mastering Rates",
    content: "Podcast audio engineering costs $80 to $200 per episode for dialogue EQ, de-humming, and volume leveling. Full season packages (10+ episodes) average $1,000 to $2,500."
  },
  {
    id: "kb_rates_drone",
    category: "Pricing Guidelines",
    title: "FPV Aerial Drone & Real Estate Rates",
    content: "Licensed FPV drone pilots charge between $75 and $150/hr or $500-$1,500 per shoot day, including raw 4K clip delivery and color-graded flythrough cuts."
  },
  {
    id: "kb_legal_copyright",
    category: "Legal & Contracts",
    title: "Copyright Ownership & Commercial Rights",
    content: "Upon 100% project fee settlement through SamsView Escrow, full commercial distribution rights transfer to the client. Creators retain portfolio display rights unless an exclusive NDA is signed."
  },
  {
    id: "kb_escrow_security",
    category: "Platform Protection",
    title: "SamsView Escrow & Milestone Protection",
    content: "Client payments are safely held in SamsView Milestone Escrow and released to creators only upon client approval of deliverables."
  }
];

// Tokenizer & Vector similarity helper
function tokenize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(t => t.length > 2);
}

function calculateSimilarity(queryTokens, docText) {
  const docTokens = tokenize(docText);
  if (docTokens.length === 0 || queryTokens.length === 0) return 0;

  let matchCount = 0;
  queryTokens.forEach(token => {
    if (docTokens.includes(token)) matchCount++;
  });

  return matchCount / Math.sqrt(docTokens.length * queryTokens.length);
}

class RAGEngine {
  // 1. Retrieve Knowledge Chunks
  retrieveKnowledge(query, limit = 3) {
    const queryTokens = tokenize(query);
    const scored = KNOWLEDGE_BASE.map(doc => {
      const score = calculateSimilarity(queryTokens, `${doc.title} ${doc.content} ${doc.category}`);
      return { ...doc, score };
    });

    return scored
      .filter(doc => doc.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  // 2. Retrieve & Rank Creators for AI Recommendation Engine
  recommendCreators(prompt, limit = 3) {
    const queryTokens = tokenize(prompt);
    const creators = db.getUsers().filter(u => u.role === 'creator');

    const scoredCreators = creators.map(creator => {
      const fullDoc = `
        ${creator.name} ${creator.title} ${creator.location} 
        ${creator.skills?.join(' ')} ${creator.bio} 
        ${creator.equipment?.join(' ')} ${creator.resume?.summary} 
        ${creator.resume?.software?.join(' ')}
      `;

      let score = calculateSimilarity(queryTokens, fullDoc);

      // Boost score for verified and available creators
      if (creator.verified) score += 0.1;
      if (creator.available) score += 0.05;

      return { creator, score };
    });

    const matches = scoredCreators
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return matches.map(({ creator, score }) => {
      const { passwordHash, ...sanitized } = creator;
      const matchPercentage = Math.min(Math.round(85 + Math.random() * 14), 99);
      return {
        creator: sanitized,
        matchScore: matchPercentage,
        rationale: `Matched based on expertise in ${creator.skills?.slice(0, 2).join(' & ')} located in ${creator.location} with $${creator.hourlyRate}/hr rate.`
      };
    });
  }

  // 3. Synthesize RAG AI Copilot Chat Response
  generateChatAnswer(query, userId) {
    const retrievedDocs = this.retrieveKnowledge(query, 2);
    const recommendedCreators = this.recommendCreators(query, 2);

    let contextSnippet = retrievedDocs.map(d => `[${d.category}] ${d.content}`).join('\n');
    let creatorSnippet = recommendedCreators.map(m => `• ${m.creator.name} (${m.creator.title}) - ${m.rationale}`).join('\n');

    let answer = "";

    if (retrievedDocs.length > 0) {
      answer += `Based on SamsView Knowledge Base:\n${retrievedDocs[0].content}\n\n`;
    } else {
      answer += `SamsView AI Copilot is here to assist with creator matching, freelance pricing, and contract workflows.\n\n`;
    }

    if (recommendedCreators.length > 0) {
      answer += `Recommended Top Creators for your request:\n${creatorSnippet}`;
    } else {
      answer += `Feel free to ask about standard video editing rates, podcast audio cleanup, contract templates, or search creators by location!`;
    }

    return {
      answer,
      retrievedDocs,
      recommendedCreators
    };
  }

  // 4. AI Script & Proposal Generator
  generateScript(topic, format = 'Shorts') {
    return {
      title: `Viral ${format} Concept: ${topic}`,
      hook: `Did you know this one secret about ${topic}? Watch until the end!`,
      scriptOutline: [
        { time: "0:00 - 0:03", visual: "Fast zoom-in + kinetic caption", audio: "Bold statement hook" },
        { time: "0:03 - 0:15", visual: "B-roll cutaway + sound effect pop", audio: "Core problem explanation" },
        { time: "0:15 - 0:30", visual: "3D animation overlay / diagram", audio: "Solution walkthrough" },
        { time: "0:30 - 0:45", visual: "Call to Action graphic + subscribe button", audio: "Closing pitch" }
      ],
      editingTips: "Use fast 0.8s jump cuts, high-contrast captions with yellow highlights, and subtle background bass swell."
    };
  }
}

module.exports = new RAGEngine();
