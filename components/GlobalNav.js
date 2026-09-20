'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import HamburgerMenu from './HamburgerMenu';
import SidebarDockMenu from './SidebarDockMenu';

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

  return (
    <>
      {/* Fixed Header: Top-Right Framer Hamburger Menu Toggle */}
      <header className="fixed-header">
        <div className="header-left-space" />

        {/* Framer Animated Hamburger Toggle */}
        <HamburgerMenu
          isOpen={isOpen}
          onToggle={(state) => setIsOpen(state)}
          size={38}
          strokeWidth={2.5}
          strokeColor={pathname === '/about' ? '#660005' : '#FAF4D4'}
          activeColor={isOpen ? '#FAF4D4' : (pathname === '/about' ? '#660005' : '#FAF4D4')}
        />
      </header>

      {/* Framer Sidebar Dock Menu Component */}
      <SidebarDockMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />

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

        @media (max-width: 768px) {
          .fixed-header {
            padding: 0 1.25rem;
            height: 70px;
          }
        }
      `}</style>
    </>
  );
}
