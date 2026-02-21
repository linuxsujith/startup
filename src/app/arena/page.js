'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, MessageSquare, TrendingUp, Filter, Search, Award } from 'lucide-react';

export default function Arena() {
    const [filter, setFilter] = useState('Highest Score');

    const ideas = [
        {
            id: 1,
            name: 'MedSync AI',
            pitch: 'Next-gen synchronized patient records for rural clinics.',
            score: 92,
            prob: '82%',
            votes: 1240,
            comments: 42,
            tags: ['HealthTech', 'AI'],
            badge: 'Unicorn Potential'
        },
        {
            id: 2,
            name: 'FinFlow India',
            pitch: 'Automated GST filing for micro-entrepreneurs.',
            score: 88,
            prob: '75%',
            votes: 980,
            comments: 18,
            tags: ['FinTech', 'SaaS'],
            badge: 'Investor Favorite'
        },
        {
            id: 3,
            name: 'LogiSmart',
            pitch: 'Hyperlocal delivery optimization using swarm intelligence.',
            score: 84,
            prob: '68%',
            votes: 750,
            comments: 12,
            tags: ['Logistics', 'DeepTech'],
            badge: 'Rising Founder'
        },
        {
            id: 4,
            name: 'EcoPack',
            pitch: '100% biodegradable packaging from agricultural waste.',
            score: 91,
            prob: '80%',
            votes: 2100,
            comments: 85,
            tags: ['SustainTech', 'Hardware'],
            badge: '🔥 Top 1%'
        }
    ];

    return (
        <div className="arena-container">
            <div className="arena-header">
                <div className="header-text">
                    <h1 className="outfit">The Public Arena</h1>
                    <p>Where ideas collide and only the strongest survive.</p>
                </div>
                <div className="header-actions">
                    <div className="search-bar">
                        <Search size={18} />
                        <input type="text" placeholder="Search startups..." />
                    </div>
                    <div className="filter-dropdown glass">
                        <Filter size={16} />
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option>Highest Score</option>
                            <option>Most Votes</option>
                            <option>Newest</option>
                            <option>Funding Probability</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="arena-grid">
                {ideas.map((idea, idx) => (
                    <motion.div
                        key={idea.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="arena-card premium-card glass"
                    >
                        <div className="card-header">
                            <div className="tags">
                                {idea.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                            </div>
                            <div className="idea-badge">
                                <Award size={14} /> {idea.badge}
                            </div>
                        </div>

                        <div className="card-body">
                            <h3 className="outfit">{idea.name}</h3>
                            <p>{idea.pitch}</p>
                        </div>

                        <div className="card-metrics">
                            <div className="main-metric">
                                <span className="metric-label">AI Score</span>
                                <span className="metric-val">{idea.score}</span>
                            </div>
                            <div className="main-metric">
                                <span className="metric-label">Funding Prob.</span>
                                <span className="metric-val accent-green">{idea.prob}</span>
                            </div>
                        </div>

                        <div className="card-footer">
                            <div className="interactions">
                                <button className="inter-btn">
                                    <Flame size={16} className="flame-icon" />
                                    <span>{idea.votes}</span>
                                </button>
                                <button className="inter-btn">
                                    <MessageSquare size={16} />
                                    <span>{idea.comments}</span>
                                </button>
                            </div>
                            <button className="view-details">Deep Analysis</button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .arena-container {
          padding: 2rem 0;
        }
        .arena-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .header-text h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .header-text p { color: var(--text-secondary); }

        .header-actions {
          display: flex;
          gap: 1rem;
        }
        .search-bar {
          background: var(--bg-lighter);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          display: flex;
          align-items: center;
          padding: 0 1rem;
          gap: 0.5rem;
          width: 300px;
        }
        .search-bar input {
          background: transparent;
          border: none;
          color: white;
          padding: 0.75rem 0;
          width: 100%;
        }
        .search-bar input:focus { outline: none; }
        .filter-dropdown {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 1rem;
          border-radius: 8px;
        }
        select {
          background: transparent;
          border: none;
          color: white;
          padding: 0.75rem 0;
          font-weight: 600;
          cursor: pointer;
        }
        select:focus { outline: none; }

        .arena-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .arena-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .tags { display: flex; gap: 8px; }
        .tag {
          font-size: 0.7rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 4px 10px;
          border-radius: 20px;
          color: var(--text-secondary);
        }
        .idea-badge {
          background: rgba(245, 158, 11, 0.1);
          color: var(--accent-gold);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .card-body h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .card-body p { color: var(--text-secondary); line-height: 1.6; }

        .card-metrics {
          display: flex;
          gap: 3rem;
          padding: 1.25rem 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }
        .main-metric { display: flex; flex-direction: column; gap: 4px; }
        .metric-label { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; }
        .metric-val { font-size: 1.5rem; font-weight: 800; }
        .accent-green { color: var(--accent-green); }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .interactions { display: flex; gap: 1rem; }
        .inter-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .inter-btn:hover { background: rgba(255, 255, 255, 0.08); color: white; }
        .flame-icon { color: #f97316; }
        .view-details {
          color: var(--accent-gold);
          font-weight: 700;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .arena-grid { grid-template-columns: 1fr; }
          .header-actions { width: 100%; }
          .search-bar { width: 100%; }
        }
      `}</style>
        </div>
    );
}
