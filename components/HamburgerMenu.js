'use client';

import { startTransition } from 'react';

export default function HamburgerMenu({
  isOpen = false,
  onToggle,
  strokeColor = '#ffffff',
  activeColor = '#efff00',
  strokeWidth = 2.5,
  size = 40
}) {
  const handleClick = () => {
    startTransition(() => {
      if (onToggle) {
        onToggle(!isOpen);
      }
    });
  };

  const currentColor = isOpen ? activeColor : strokeColor;

  return (
    <button
      onClick={handleClick}
      type="button"
      className="framer-hamburger-btn"
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      style={{
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        background: 'transparent',
        border: 'none',
        padding: 0,
        pointerEvents: 'auto',
        outline: 'none'
      }}
    >
      <svg
        viewBox="0 0 32 32"
        style={{
          width: '100%',
          height: '100%',
          transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
          transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <path
          className="line line-top-bottom"
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          fill="none"
          stroke={currentColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          strokeDasharray={isOpen ? '20 300' : '12 63'}
          strokeDashoffset={isOpen ? -32.42 : 0}
          style={{
            transition:
              'stroke 300ms ease, stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        <path
          className="line"
          d="M7 16 27 16"
          fill="none"
          stroke={currentColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          style={{
            transition:
              'stroke 300ms ease, stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </svg>
    </button>
  );
}
