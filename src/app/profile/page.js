'use client';

import { motion } from 'framer-motion';
import { User, Award, TrendingUp, History, Settings, ExternalLink } from 'lucide-react';

export default function Profile() {
    const user = {
        name: 'Sujith Kumar',
        email: 'sujith@startupwar.in',
        rank: 124,
        points: 8450,
        badges: ['🚀 Rising Founder', '💰 Investor Favorite', '🏛 Arena Veteran'],
        myIdeas: [
            { id: 1, name: 'EcoPack', score: 94, votes: 2100, date: '21 Feb 2026' },
            { id: 2, name: 'MedSync AI', score: 91, votes: 1240, date: '15 Feb 2026' }
        ],
        sharkHistory: [
            { id: 101, idea: 'EcoPack', verdict: 'Deal', investment: '₹50L', equity: '5%' },
            { id: 102, idea: 'LogiSmart', verdict: 'No Deal', reason: 'Market size' }
        ]
    };

    return (
        <div className="profile-container">
            <div className="profile-layout">
                {/* Sidebar Info */}
                <aside className="profile-sidebar">
                    <div className="user-card premium-card glass">
                        <div className="avatar-large">
                            <User size={40} />
                        </div>
                        <h2>{user.name}</h2>
                        <p className="email">{user.email}</p>
                        <div className="user-stats">
                            <div className="u-stat">
                                <span>Rank</span>
                                <strong>#{user.rank}</strong>
                            </div>
                            <div className="u-stat">
                                <span>Points</span>
                                <strong>{user.points}</strong>
                            </div>
                        </div>
                        <button className="settings-btn"><Settings size={16} /> Edit Profile</button>
                    </div>

                    <div className="badges-card premium-card glass">
                        <h3>My Badges</h3>
                        <div className="badges-list">
                            {user.badges.map(b => (
                                <div key={b} className="badge-item">
                                    <Award size={14} />
                                    <span>{b}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="profile-main">
                    <section className="profile-section">
                        <div className="section-header">
                            <h2 className="outfit">Submitted Ideas</h2>
                            <button className="new-btn">Submit New</button>
                        </div>
                        <div className="ideas-list">
                            {user.myIdeas.map(idea => (
                                <div key={idea.id} className="idea-item premium-card">
                                    <div className="idea-info">
                                        <h3>{idea.name}</h3>
                                        <span className="idea-date">Submitted on {idea.date}</span>
                                    </div>
                                    <div className="idea-stats">
                                        <div className="i-stat">
                                            <span>AI Score</span>
                                            <strong className="accent-gold">{idea.score}</strong>
                                        </div>
                                        <div className="i-stat">
                                            <span>Votes</span>
                                            <strong>{idea.votes}</strong>
                                        </div>
                                    </div>
                                    <button className="view-btn"><ExternalLink size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="profile-section">
                        <div className="section-header">
                            <h2 className="outfit">Shark Tank History</h2>
                        </div>
                        <div className="shark-history">
                            {user.sharkHistory.map(item => (
                                <div key={item.id} className="history-item glass">
                                    <div className="hist-header">
                                        <h4>{item.idea}</h4>
                                        <span className={`hist-verdict ${item.verdict === 'Deal' ? 'deal' : 'no-deal'}`}>
                                            {item.verdict}
                                        </span>
                                    </div>
                                    {item.verdict === 'Deal' ? (
                                        <p className="hist-details">
                                            Received <strong>{item.investment}</strong> for {item.equity} equity.
                                        </p>
                                    ) : (
                                        <p className="hist-details">
                                            Rejected due to: {item.reason}.
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>

            <style jsx>{`
        .profile-container { padding: 2rem 0; }
        .profile-layout { display: grid; grid-template-columns: 350px 1fr; gap: 3rem; align-items: start; }

        .profile-sidebar { display: flex; flex-direction: column; gap: 2rem; }
        .user-card { text-align: center; padding: 3rem 2rem; }
        .avatar-large { 
            width: 80px; height: 80px; background: var(--bg-lighter); 
            border-radius: 50%; display: flex; align-items: center; justify-content: center; 
            margin: 0 auto 1.5rem; border: 2px solid var(--border-color);
        }
        .email { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2rem; }
        .user-stats { display: flex; justify-content: space-around; padding-top: 2rem; border-top: 1px solid var(--border-color); }
        .u-stat { display: flex; flex-direction: column; gap: 4px; }
        .u-stat span { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; }
        .u-stat strong { font-size: 1.25rem; }
        .settings-btn { margin-top: 2.5rem; width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); color: var(--text-secondary); display: flex; align-items: center; justify-content: center; gap: 8px; }

        .badges-card h3 { font-size: 1rem; margin-bottom: 1.5rem; }
        .badges-list { display: flex; flex-direction: column; gap: 1rem; }
        .badge-item { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: var(--text-secondary); background: rgba(255, 255, 255, 0.02); padding: 8px 12px; border-radius: 6px; }

        .profile-main { display: flex; flex-direction: column; gap: 4rem; }
        .profile-section { }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .new-btn { background: var(--accent-gold); color: black; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem; }
        
        .ideas-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .idea-item { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem; }
        .idea-info h3 { font-size: 1.25rem; margin-bottom: 4px; }
        .idea-date { color: var(--text-secondary); font-size: 0.8rem; }
        .idea-stats { display: flex; gap: 3rem; }
        .i-stat { display: flex; flex-direction: column; align-items: center; }
        .i-stat span { font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase; }
        .i-stat strong { font-size: 1.1rem; }

        .shark-history { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .history-item { padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 12px; }
        .hist-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .hist-verdict { font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
        .deal { background: rgba(16, 185, 129, 0.1); color: var(--accent-green); }
        .no-deal { background: rgba(239, 68, 68, 0.1); color: var(--accent-red); }
        .hist-details { color: var(--text-secondary); font-size: 0.9rem; }

        @media (max-width: 1024px) {
            .profile-layout { grid-template-columns: 1fr; }
            .profile-sidebar { flex-direction: row; }
            .user-card, .badges-card { flex: 1; }
        }
        @media (max-width: 768px) {
            .profile-sidebar { flex-direction: column; }
            .shark-history { grid-template-columns: 1fr; }
            .idea-stats { display: none; }
        }
      `}</style>
        </div>
    );
}
