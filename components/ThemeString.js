'use client';

import { useState, useEffect, useRef } from 'react';

export default function ThemeString({
  stringLength = 90,
  threshold = 60,
  lineColorDark = '#F7F1E3',
  lineColorLight = '#660005'
}) {
  const [isDark, setIsDark] = useState(true);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });
  const animFrame = useRef(null);

  // Sync state on mount and listen to window themeChange events
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkCurrentTheme = () => {
      const attr = document.documentElement.getAttribute('data-theme');
      if (attr) {
        setIsDark(attr === 'dark');
      } else {
        const saved = localStorage.getItem('theme');
        if (saved) {
          const dark = saved === 'dark';
          setIsDark(dark);
          applyTheme(dark);
        } else {
          setIsDark(true);
          applyTheme(true);
        }
      }
    };

    checkCurrentTheme();

    const handleThemeEvent = () => checkCurrentTheme();
    window.addEventListener('themeChange', handleThemeEvent);
    return () => window.removeEventListener('themeChange', handleThemeEvent);
  }, []);

  const applyTheme = (dark) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const themeName = dark ? 'dark' : 'light';

    root.setAttribute('data-theme', themeName);
    document.body.setAttribute('data-theme', themeName);

    localStorage.setItem('theme', themeName);
    window.dispatchEvent(new Event('themeChange'));
  };

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    applyTheme(nextDark);

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(40);
      } catch (e) {}
    }
  };

  const handleKnobClick = (e) => {
    // If it was just a click without pulling down far, toggle theme
    if (Math.abs(dragOffset.y) < 5 && Math.abs(dragOffset.x) < 5) {
      toggleTheme();
    }
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const rawX = (e.clientX - startPos.current.x) * 0.25; // Dampen horizontal wobble
    const rawY = Math.max(0, Math.min(150, e.clientY - startPos.current.y)); // Clamp vertical drag
    setDragOffset({ x: rawX, y: rawY });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}

    // Trigger toggle if pulled beyond threshold
    if (dragOffset.y > threshold) {
      toggleTheme();
    }

    // Smooth spring return physics
    let currentY = dragOffset.y;
    let currentX = dragOffset.x;
    let vy = 0;
    let vx = 0;

    const animateReturn = () => {
      const fy = -0.28 * currentY;
      vy = (vy + fy) * 0.7;
      currentY += vy;

      const fx = -0.28 * currentX;
      vx = (vx + fx) * 0.7;
      currentX += vx;

      setDragOffset({ x: currentX, y: currentY });

      if (Math.abs(currentY) > 0.4 || Math.abs(currentX) > 0.4 || Math.abs(vy) > 0.4) {
        animFrame.current = requestAnimationFrame(animateReturn);
      } else {
        setDragOffset({ x: 0, y: 0 });
      }
    };

    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(animateReturn);
  };

  const handleX = 25 + dragOffset.x;
  const handleY = stringLength + dragOffset.y;
  const currentLineColor = isDark ? lineColorDark : lineColorLight;

  return (
    <div className="theme-string-wrapper">
      <svg className="string-svg">
        <path
          d={`M 25 0 Q 25 ${handleY / 2} ${handleX} ${handleY}`}
          fill="none"
          stroke={currentLineColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <div
        className={`string-knob ${isDragging ? 'dragging' : ''}`}
        style={{
          transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`
        }}
        onClick={handleKnobClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        title="Pull or click to toggle Dark / Light theme"
        role="button"
        tabIndex={0}
        aria-label="Toggle theme string"
      >
        <div className="knob-icon">
          {isDark ? (
            /* Sun Icon when in Dark Mode (toggle to Light) */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#660005" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" fill="#660005" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            /* Moon Icon when in Light Mode (toggle to Dark) */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7F1E3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#F7F1E3" />
            </svg>
          )}
        </div>
      </div>

      <style jsx>{`
        .theme-string-wrapper {
          position: fixed;
          top: 0;
          left: 40px;
          width: 50px;
          height: 240px;
          z-index: 9998;
          pointer-events: none;
          user-select: none;
        }

        .string-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          pointer-events: none;
        }

        .string-knob {
          position: absolute;
          top: ${stringLength}px;
          left: 7.5px;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: ${isDark ? '#F7F1E3' : '#660005'};
          border: 2px solid ${isDark ? '#F7F1E3' : '#660005'};
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          pointer-events: auto;
          touch-action: none;
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.2s ease;
        }

        .string-knob.dragging {
          cursor: grabbing;
          box-shadow: 0 8px 25px rgba(243, 198, 204, 0.45);
        }

        .string-knob:hover {
          transform: scale(1.08);
        }

        .knob-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .theme-string-wrapper {
            left: 20px;
          }
        }
      `}</style>
    </div>
  );
}
