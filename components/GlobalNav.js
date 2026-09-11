'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HamburgerMenu from './HamburgerMenu';

export default function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when navigation drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Dismiss on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Guest Notes', path: '/guest-notes' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Books', path: '/books' },
    { name: 'Epigraphs', path: '/epigraphs' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Fixed Header: Top-Left Theme Toggle Anchor & Top-Right Hamburger Menu */}
      <header className="fixed-header">
        <div className="header-left-space" />

        {/* Framer Animated Hamburger Toggle */}
        <HamburgerMenu
          isOpen={isOpen}
          onToggle={(state) => setIsOpen(state)}
          size={38}
          strokeWidth={2.5}
        />
      </header>

      {/* Navigation Overlay Drawer */}
      <div className={`nav-overlay ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="nav-backdrop" onClick={() => setIsOpen(false)} />
        
        <div className="nav-drawer">
          <div className="nav-drawer-header">
            <span className="nav-eyebrow">NAVIGATION INDEX</span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="drawer-close"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="nav-links-grid">
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-number">0{idx + 1}</span>
                  <span className="nav-title">{link.name}</span>
                  {isActive && <span className="active-dot"></span>}
                </Link>
              );
            })}
          </nav>

          <div className="nav-drawer-footer">
            <div className="nav-footer-meta">
              <span className="meta-label">STATUS</span>
              <span className="meta-value">Open to opportunities</span>
            </div>

            <div className="nav-footer-meta">
              <span className="meta-label">ADMIN & CMS</span>
              <Link href="/admin" className="admin-link">
                Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fixed-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2.5rem;
          z-index: 999;
          background: transparent;
          pointer-events: none;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--text-primary);
          pointer-events: auto;
        }

        .brand-dot {
          width: 8px;
          height: 8px;
          background-color: var(--accent-neon);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-neon);
        }

        .brand-name {
          font-family: var(--font-mono);
          font-weight: 500;
          font-size: 0.95rem;
          letter-spacing: 0.12em;
        }

        /* 2-Line Toggle Button */
        .nav-toggle {
          width: 44px;
          height: 44px;
          background: transparent;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          pointer-events: auto;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-toggle:hover {
          border-color: var(--accent-neon);
          background: #1f1f23;
        }

        .line {
          width: 20px;
          height: 2px;
          background-color: var(--text-primary);
          transition: transform 0.3s ease, background-color 0.3s ease;
          transform-origin: center;
        }

        .nav-toggle:hover .line {
          background-color: var(--accent-neon);
        }

        .nav-toggle.active .line-1 {
          transform: translateY(4.5px) rotate(45deg);
          background-color: var(--accent-neon);
        }

        .nav-toggle.active .line-2 {
          transform: translateY(-4.5px) rotate(-45deg);
          background-color: var(--accent-neon);
        }

        /* Navigation Overlay */
        .nav-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }

        .nav-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .nav-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .nav-drawer {
          position: relative;
          width: 100%;
          max-width: 480px;
          height: 100%;
          background: #0d0d0d;
          border-left: 1px solid var(--border-subtle);
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1001;
          overflow-y: auto;
        }

        .nav-overlay.open .nav-drawer {
          transform: translateX(0);
        }

        .nav-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .nav-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          color: var(--accent-neon);
        }

        .drawer-close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 1.25rem;
          cursor: pointer;
          transition: color 0.2s;
        }

        .drawer-close:hover {
          color: var(--accent-neon);
        }

        .nav-links-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 2rem 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 0.85rem 1rem;
          text-decoration: none;
          color: var(--text-secondary);
          border-radius: 4px;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .nav-item:hover, .nav-item.active {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.03);
          border-color: var(--border-subtle);
        }

        .nav-item.active {
          border-color: rgba(204, 255, 0, 0.3);
        }

        .nav-number {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-neon);
        }

        .nav-title {
          font-family: var(--font-mono);
          font-size: 1.35rem;
          font-weight: 400;
          letter-spacing: -0.01em;
        }

        .active-dot {
          margin-left: auto;
          width: 6px;
          height: 6px;
          background: var(--accent-neon);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--accent-neon);
        }

        .nav-drawer-footer {
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-footer-meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .meta-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: var(--text-muted);
        }

        .meta-value {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .admin-link {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--accent-neon);
          text-decoration: none;
        }

        .admin-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .fixed-header {
            padding: 0 1.25rem;
            height: 70px;
          }
          .nav-drawer {
            max-width: 100%;
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
