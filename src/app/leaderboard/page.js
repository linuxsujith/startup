'use client';

import { Trophy, Medal, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Leaderboard() {
    const rankings = [
        { rank: 1, name: 'EcoPack', user: 'Aditi Sharma', score: 94.2, prob: '80%', votes: 2100, badges: ['🔥 Top 1%', '🦄 Unicorn Potential'] },
        { rank: 2, name: 'MedSync AI', user: 'Rahul Verma', score: 91.5, prob: '82%', votes: 1240, badges: ['Investor Favorite'] },
        { rank: 3, name: 'FinFlow India', user: 'Priya Iyer', score: 88.7, prob: '75%', votes: 980, badges: ['Rising Founder'] },
        { rank: 4, name: 'LogiSmart', user: 'Vikram Singh', score: 82.4, prob: '68%', votes: 750, badges: [] },
        { rank: 5, name: 'AgriSafe AI', user: 'Ananya Das', score: 79.8, prob: '62%', votes: 540, badges: [] },
    ];

    return (
        <div className="leaderboard-container">
            <div className="header">
                <h1 className="outfit">National Leaderboard</h1>
                <p>Real-time ranking of India&apos;s most promising startup ideas.</p>
            </div>

            <div className="top-three">
                {rankings.slice(0, 3).map((item, idx) => (
                    <motion.div
                        key={item.rank}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className={`podium-card ${idx === 0 ? 'first' : idx === 1 ? 'second' : 'third'} premium-card glass`}
                    >
                        <div className="rank-badge">
                            {idx === 0 ? <Trophy size={24} /> : <Medal size={20} />}
                        </div>
                        <h3 className="outfit">{item.name}</h3>
                        <span className="founder">by {item.user}</span>
                        <div className="rank-score">
                            <span className="score-label">Rank Score</span>
                            <span className="score-val">{item.score}</span>
                        </div>
                        <div className="podium-badges">
                            {item.badges.map(b => (
                                <span key={b} className="p-badge">{b}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="list-section premium-card glass">
                <table className="ranks-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Startup</th>
                            <th>Founder</th>
                            <th>Rank Score</th>
                            <th>Funding Prob.</th>
                            <th>Votes</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankings.map((item, idx) => (
                            <motion.tr
                                key={item.rank}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + idx * 0.05 }}
                            >
                                <td className="rank-col">#{item.rank}</td>
                                <td className="name-col">{item.name}</td>
                                <td className="founder-col">{item.user}</td>
                                <td className="score-col">{item.score}</td>
                                <td className="prob-col accent-green">{item.prob}</td>
                                <td className="votes-col">{item.votes}</td>
                                <td className="action-col">
                                    <button className="view-btn"><ArrowUpRight size={16} /></button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .leaderboard-container {
          padding: 2rem 0;
        }
        .header { text-align: center; margin-bottom: 4rem; }
        .header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .header p { color: var(--text-secondary); }

        .top-three {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 4rem;
          align-items: flex-end;
        }
        .podium-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 3rem 1.5rem;
        }
        .first { height: 420px; border-color: var(--accent-gold); position: relative; }
        .first::before {
            content: '';
            position: absolute;
            top: -2px; left: -2px; right: -2px; bottom: -2px;
            border-radius: 12px;
            background: linear-gradient(135deg, var(--accent-gold), transparent);
            z-index: -1;
            opacity: 0.5;
        }
        .second { height: 360px; }
        .third { height: 320px; }
        
        .rank-badge {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-gold);
          margin-bottom: 1rem;
        }
        .podium-card h3 { font-size: 1.5rem; }
        .founder { color: var(--text-secondary); font-size: 0.9rem; }
        .rank-score {
          display: flex;
          flex-direction: column;
          margin: 1.5rem 0;
        }
        .score-val { font-size: 2.5rem; font-weight: 800; color: var(--text-primary); }
        .score-label { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; }
        .podium-badges { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
        .p-badge { font-size: 0.7rem; background: rgba(59, 130, 246, 0.1); color: var(--accent-blue); padding: 4px 8px; border-radius: 4px; font-weight: 600; }

        .list-section { padding: 0 !important; overflow: hidden; }
        .ranks-table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 1.25rem 2rem; color: var(--text-secondary); font-size: 0.85rem; border-bottom: 1px solid var(--border-color); text-transform: uppercase; }
        td { padding: 1.25rem 2rem; border-bottom: 1px solid var(--border-color); font-size: 0.95rem; }
        .rank-col { font-weight: 700; color: var(--text-secondary); }
        .name-col { font-weight: 600; font-size: 1rem; }
        .prob-col { font-weight: 700; }
        .action-col { text-align: right; }
        .view-btn { padding: 8px; border-radius: 6px; background: rgba(255, 255, 255, 0.03); color: var(--text-secondary); }
        .view-btn:hover { background: rgba(255, 255, 255, 0.1); color: white; }

        @media (max-width: 1024px) {
          .top-three { grid-template-columns: 1fr; align-items: stretch; }
          .first, .second, .third { height: auto; padding: 2rem; }
        }
      `}</style>
        </div>
    );
}
