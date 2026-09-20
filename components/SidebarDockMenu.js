'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarDockMenu({ isOpen, onClose }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Reset collapsed state when drawer opens/closes
  useEffect(() => {
    if (!isOpen) {
      setIsCollapsed(false);
    }
  }, [isOpen]);

  const navItems = [
    { name: 'Home', path: '/', number: '01', desc: 'Main Index & Hero' },
    { name: 'About', path: '/about', number: '02', desc: 'Story & Experience' },
    { name: 'Projects', path: '/projects', number: '03', desc: 'Selected Work & Demos' },
    { name: '4RinLabs', path: '/4rinlabs', number: '04', desc: 'Creative Agency & Studio' },
    { name: 'Certifications', path: '/certifications', number: '05', desc: 'Credentials & Badges' },
    { name: 'Guest Notes', path: '/guest-notes', number: '06', desc: 'Visitor Guestbook' },
    { name: 'Blogs', path: '/blogs', number: '07', desc: 'Articles & Writings' },
    { name: 'Books', path: '/books', number: '08', desc: 'Reading List & Shelf' },
    { name: 'Epigraphs', path: '/epigraphs', number: '09', desc: 'Quotes & Inspiration' },
    { name: 'Contact', path: '/contact', number: '10', desc: 'Get in Touch' }
  ];

  if (!isOpen) return null;

  return (
    <div className={`dock-portal ${isOpen ? 'is-visible' : ''}`} role="dialog" aria-modal="true">
      {/* Dimmed Blurred Backdrop */}
      <div 
        className="dock-backdrop" 
        onClick={onClose} 
        aria-label="Close menu backdrop"
      />

      {/* Floating Framer Dock Menu Shell */}
      <aside 
        className={`dock-container ${isCollapsed ? 'is-collapsed' : ''}`}
        aria-label="Sidebar Navigation Dock"
      >
        {/* Dock Header */}
        <div className="dock-header">
          <div className="dock-brand">
            <div className="brand-avatar">
              <span className="avatar-text">DS</span>
              <span className="online-indicator" />
            </div>
            {!isCollapsed && (
              <div className="brand-meta">
                <span className="brand-title">Dhwani Sagar</span>
                <span className="brand-subtitle">Navigation Dock</span>
              </div>
            )}
          </div>

          <div className="header-actions">
            {/* Collapse/Expand Dock Toggle */}
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="action-btn collapse-btn"
              title={isCollapsed ? "Expand Dock" : "Collapse Dock"}
              aria-label={isCollapsed ? "Expand Dock" : "Collapse Dock"}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Close Dock Toggle */}
            <button
              type="button"
              onClick={onClose}
              className="action-btn close-btn"
              title="Close Navigation"
              aria-label="Close Navigation"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dock Nav Body */}
        <nav className="dock-nav">
          <ul className="dock-list">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.path;
              const isHovered = hoveredIdx === idx;

              return (
                <li key={item.path} className="dock-item-wrapper">
                  <Link
                    href={item.path}
                    className={`dock-item ${isActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={onClose}
                  >
                    <span className="item-number">{item.number}</span>
                    
                    {!isCollapsed && (
                      <div className="item-content">
                        <span className="item-title">{item.name}</span>
                        <span className="item-desc">{item.desc}</span>
                      </div>
                    )}

                    {isActive && <span className="active-pill-dot" />}
                    
                    {!isCollapsed && !isActive && (
                      <span className="hover-arrow">→</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Dock Footer */}
        {!isCollapsed && (
          <div className="dock-footer">
            <div className="footer-status">
              <span className="status-ping" />
              <span className="status-text">Open for new projects</span>
            </div>
            
            <div className="footer-meta-row">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="admin-dock-link">
                <span>Resume</span>
                <span className="arrow">↗</span>
              </a>
              <span className="tz-stamp">BLR • UTC+5:30</span>
            </div>
          </div>
        )}
      </aside>

      <style jsx>{`
        .dock-portal {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 1.5rem;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dock-portal.is-visible {
          opacity: 1;
          pointer-events: auto;
        }

        .dock-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 12, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          animation: fadeIn 0.3s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .dock-container {
          position: relative;
          z-index: 1001;
          width: 380px;
          max-height: calc(100vh - 3rem);
          height: auto;
          background: rgba(18, 18, 22, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 
            0 24px 60px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(102, 0, 5, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform: translateX(40px) scale(0.96);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: slideInDock 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .dock-container.is-collapsed {
          width: 90px;
        }

        @keyframes slideInDock {
          to {
            transform: translateX(0) scale(1);
          }
        }

        /* Header */
        .dock-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }

        .dock-brand {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .brand-avatar {
          position: relative;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #660005 0%, #660005 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 12px rgba(102, 0, 5, 0.3);
          flex-shrink: 0;
        }

        .avatar-text {
          font-family: var(--font-mono, monospace);
          font-weight: 700;
          font-size: 0.85rem;
          color: #FAF4D4;
          letter-spacing: 0.05em;
        }

        .online-indicator {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 9px;
          height: 9px;
          background: #22c55e;
          border: 2px solid #121216;
          border-radius: 50%;
        }

        .brand-meta {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: var(--font-mono, monospace);
          font-weight: 600;
          font-size: 0.95rem;
          color: #FAF4D4;
          letter-spacing: -0.01em;
        }

        .brand-subtitle {
          font-size: 0.72rem;
          color: rgba(250, 244, 212, 0.55);
          letter-spacing: 0.04em;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: rgba(250, 244, 212, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: rgba(102, 0, 5, 0.25);
          border-color: rgba(102, 0, 5, 0.5);
          color: #FAF4D4;
          transform: scale(1.05);
        }

        /* Nav Body */
        .dock-nav {
          padding: 0.85rem;
          overflow-y: auto;
          max-height: calc(100vh - 12rem);
        }

        .dock-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .dock-item-wrapper {
          width: 100%;
        }

        .dock-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          text-decoration: none;
          color: rgba(250, 244, 212, 0.75);
          background: transparent;
          border: 1px solid transparent;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dock-container.is-collapsed .dock-item {
          justify-content: center;
          padding: 0.85rem 0.5rem;
        }

        .dock-item:hover, .dock-item.is-hovered {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.08);
          color: #FAF4D4;
          transform: translateX(3px);
        }

        .dock-container.is-collapsed .dock-item:hover {
          transform: scale(1.08);
        }

        .dock-item.is-active {
          background: rgba(102, 0, 5, 0.18);
          border-color: rgba(102, 0, 5, 0.4);
          color: #FAF4D4;
          box-shadow: 0 4px 20px rgba(102, 0, 5, 0.15);
        }

        .item-number {
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          font-weight: 600;
          color: #660005;
          background: rgba(102, 0, 5, 0.12);
          padding: 0.2rem 0.45rem;
          border-radius: 6px;
          border: 1px solid rgba(102, 0, 5, 0.2);
          flex-shrink: 0;
        }

        .dock-item.is-active .item-number {
          background: #660005;
          color: #FAF4D4;
          border-color: #660005;
        }

        .item-content {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          flex-grow: 1;
          min-width: 0;
        }

        .item-title {
          font-family: var(--font-mono, monospace);
          font-size: 0.95rem;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-desc {
          font-size: 0.72rem;
          color: rgba(250, 244, 212, 0.45);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dock-item:hover .item-desc {
          color: rgba(250, 244, 212, 0.7);
        }

        .active-pill-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #660005;
          box-shadow: 0 0 10px #660005;
          flex-shrink: 0;
        }

        .hover-arrow {
          font-size: 0.9rem;
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.2s ease;
          color: #660005;
        }

        .dock-item:hover .hover-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Dock Footer */
        .dock-footer {
          padding: 1rem 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
          padding: 0.4rem 0.75rem;
          border-radius: 20px;
          width: fit-content;
        }

        .status-ping {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }

        .status-text {
          font-size: 0.75rem;
          color: rgba(250, 244, 212, 0.9);
          font-family: var(--font-mono, monospace);
        }

        .footer-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
        }

        .admin-dock-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #660005;
          font-family: var(--font-mono, monospace);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .admin-dock-link:hover {
          color: #FAF4D4;
          text-decoration: underline;
        }

        .tz-stamp {
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          color: rgba(250, 244, 212, 0.4);
          letter-spacing: 0.05em;
        }

        /* Responsive Breakpoint */
        @media (max-width: 640px) {
          .dock-portal {
            padding: 10px;
          }
          .dock-container {
            width: 100%;
            max-height: calc(100vh - 20px);
            border-radius: 20px;
          }
        }
      `}</style>
    </div>
  );
}
