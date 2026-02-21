'use client';

import Link from 'next/link';
import { TrendingUp, Users, Target, Rocket, ArrowRight, ShieldCheck, PieChart, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const stats = [
    { label: 'Ideas Submitted', value: '12,450+', icon: <Rocket className="accent-gold" /> },
    { label: 'Avg funding prob.', value: '18.4%', icon: <Target className="accent-blue" /> },
    { label: 'Top startup weekly', value: 'AgriSafe AI', icon: <TrendingUp className="accent-green" /> },
  ];

  const trendingIdeas = [
    { title: 'FinFlow India', sector: 'FinTech', score: 88, prob: '75%' },
    { title: 'MedSync AI', sector: 'HealthTech', score: 92, prob: '82%' },
    { title: 'LogiSmart', sector: 'Logistics', score: 84, prob: '68%' },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-content"
        >
          <div className="badge-wrapper">
            <span className="hero-badge">
              <span className="status-indicator"></span>
              Live: Shark Tank AI Season 1
            </span>
          </div>
          <h1 className="hero-title outfit">
            India&apos;s AI-Powered <br />
            <span className="gradient-text">Startup Battle</span> Platform
          </h1>
          <p className="hero-subtitle">
            Validate your startup idea with institutional-grade AI analysis.
            Compete in the Arena and see if you have what it takes to survive the Sharks.
          </p>
          <div className="hero-actions">
            <Link href="/submit" className="btn btn-primary">
              Submit Your Idea <ArrowRight size={18} />
            </Link>
            <Link href="/arena" className="btn btn-secondary">
              Enter Arena
            </Link>
          </div>
        </motion.div>

        <div className="hero-stats">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card premium-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Feed */}
      <section className="trending-section">
        <div className="section-header">
          <h2 className="outfit">Trending Ideas</h2>
          <Link href="/arena" className="view-all">View All <ArrowRight size={14} /></Link>
        </div>
        <div className="trending-grid">
          {trendingIdeas.map((idea, idx) => (
            <div key={idx} className="trending-card premium-card glass">
              <div className="card-top">
                <span className="sector-tag">{idea.sector}</span>
                <div className="score-badge">
                  <Activity size={14} /> {idea.score}
                </div>
              </div>
              <h3>{idea.title}</h3>
              <div className="card-footer">
                <div className="footer-metric">
                  <span>Funding Prob.</span>
                  <span className="metric-value accent-green">{idea.prob}</span>
                </div>
                <button className="vote-btn">Vote 🔥</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="features-grid">
        <div className="feature-card">
          <ShieldCheck className="accent-blue" />
          <h3>Investor Grade</h3>
          <p>Analysis built using professional VC frameworks and Indian market data.</p>
        </div>
        <div className="feature-card">
          <PieChart className="accent-gold" />
          <h3>Deep Valuation</h3>
          <p>Get realistic valuation ranges based on stage, sector, and revenue clarity.</p>
        </div>
        <div className="feature-card">
          <Users className="accent-green" />
          <h3>Public Arena</h3>
          <p>Battle against thousands of founders and climb the national leaderboard.</p>
        </div>
      </section>

      <style jsx>{`
        .home-container {
          display: flex;
          flex-direction: column;
          gap: 6rem;
          padding-bottom: 4rem;
        }
        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-top: 4rem;
        }
        .badge-wrapper {
          margin-bottom: 2rem;
        }
        .hero-badge {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-indicator {
          background: var(--accent-red);
        }
        .hero-title {
          font-size: 4.5rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          font-weight: 800;
        }
        .gradient-text {
          background: linear-gradient(135deg, var(--accent-gold), #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 700px;
          line-height: 1.6;
          margin-bottom: 3rem;
        }
        .hero-actions {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 5rem;
        }
        .btn {
          padding: 1rem 2rem;
          border-radius: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }
        .btn-primary {
          background: var(--text-primary);
          color: var(--bg-deep);
        }
        .btn-primary:hover {
          background: #fff;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
        }
        .btn-secondary {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--text-secondary);
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          width: 100%;
          max-width: 1000px;
        }
        .stat-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-info {
          display: flex;
          flex-direction: column;
        }
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
        }
        .stat-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .accent-gold { color: var(--accent-gold); }
        .accent-blue { color: var(--accent-blue); }
        .accent-green { color: var(--accent-green); }

        .trending-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .view-all {
          color: var(--accent-gold);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .trending-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .trending-card h3 {
          margin: 1rem 0;
          font-size: 1.25rem;
        }
        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sector-tag {
          font-size: 0.75rem;
          background: rgba(59, 130, 246, 0.1);
          color: var(--accent-blue);
          padding: 4px 8px;
          border-radius: 4px;
        }
        .score-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-color);
        }
        .footer-metric {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .metric-value {
          font-size: 1.1rem;
          font-weight: 700;
        }
        .vote-btn {
          background: var(--bg-lighter);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .vote-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4rem;
          padding: 4rem 0;
        }
        .feature-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .feature-card h3 {
          font-size: 1.25rem;
        }
        .feature-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .hero-title { font-size: 3.5rem; }
          .hero-stats, .trending-grid, .features-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .hero-stats, .trending-grid, .features-grid { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; width: 100%; }
          .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
}
