'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, LayoutDashboard, Send, Trophy, Sword, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/', icon: <Zap size={18} /> },
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} />, hidden: !user },
    { name: 'Submit Idea', href: '/submit', icon: <Send size={18} /> },
    { name: 'Arena', href: '/arena', icon: <Sword size={18} /> },
    { name: 'Leaderboard', href: '/leaderboard', icon: <Trophy size={18} /> },
    { name: 'Shark Tank AI', href: '/shark-tank', icon: <Zap size={18} /> },
  ];

  return (
    <nav className="navbar glass">
      <div className="nav-container">
        <Link href="/" className="logo outfit">
          Creator<span className="accent">OS</span>
        </Link>
        <div className="nav-links">
          {navLinks.filter(l => !l.hidden).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
        <div className="nav-auth">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white group">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue/20 transition-all">
                  <User size={16} />
                </div>
                <span className="hidden md:inline">{user?.displayName || "User"}</span>
              </Link>
              <button
                onClick={logout}
                className="text-white/40 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="rounded-lg bg-brand-blue px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-blue/90 hover:shadow-lg shadow-brand-blue/20">
              Sign In
            </Link>
          )}
        </div>
      </div>
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          z-index: 1000;
          display: flex;
          align-items: center;
          padding: 0 2rem;
        }
        .nav-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -1px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .accent {
          color: var(--accent-blue);
        }
        .nav-links {
          display: flex;
          gap: 1rem;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }
        .active {
          border-bottom: 2px solid var(--accent-blue);
          border-radius: 8px 8px 0 0;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
