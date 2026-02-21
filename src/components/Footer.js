'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="outfit">StartupWar India</h3>
            <p>Empowering the next generation of Indian entrepreneurs with AI-driven insights.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <Link href="/arena">Arena</Link>
              <Link href="/leaderboard">Leaderboard</Link>
              <Link href="/shark-tank">Shark Tank AI</Link>
            </div>
            <div className="link-group">
              <h4>Resources</h4>
              <Link href="/docs">Documentation</Link>
              <Link href="/blog">Success Stories</Link>
              <Link href="/help">Help Center</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 StartupWar India. All rights reserved.</p>
          <div className="disclaimer">
            Disclaimer: This platform provides AI-generated analysis for educational purposes only. Not financial advice.
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer {
          margin-top: 5rem;
          padding: 4rem 2rem 2rem;
          background: #050505;
          border-top: 1px solid var(--border-color);
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        .footer-brand {
          max-width: 400px;
        }
        .footer-brand h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        .footer-brand p {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.95rem;
        }
        .footer-links {
          display: flex;
          gap: 4rem;
        }
        .link-group h4 {
          font-size: 1rem;
          margin-bottom: 1.2rem;
          color: var(--text-primary);
        }
        .link-group a {
          display: block;
          color: var(--text-secondary);
          margin-bottom: 0.6rem;
          font-size: 0.9rem;
        }
        .link-group a:hover {
          color: var(--accent-gold);
        }
        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
        .disclaimer {
          font-weight: 500;
          color: var(--accent-red);
          max-width: 600px;
          opacity: 0.8;
        }
        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column;
          }
          .footer-links {
            gap: 2rem;
            flex-direction: column;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
