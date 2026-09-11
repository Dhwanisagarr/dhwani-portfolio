'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const CARDS_DATA = [
  {
    id: 1,
    num: '01',
    title: 'About',
    path: '/about',
    subtitle: 'Background, product thinking, and craft philosophy.',
    tag: 'BACKGROUND',
    gradient: 'linear-gradient(135deg, #0d0d0d, #1a1a2e, #16213e)',
    accent: '#CCFF00',
    icon: '✦'
  },
  {
    id: 2,
    num: '02',
    title: 'Guest Notes',
    path: '/guest-notes',
    subtitle: 'Read visitor notes or leave your own message in the logbook.',
    tag: 'COMMUNITY',
    gradient: 'linear-gradient(135deg, #051937, #004d7a, #008793)',
    accent: '#38bdf8',
    icon: '◈'
  },
  {
    id: 3,
    num: '03',
    title: 'Blogs',
    path: '/blogs',
    subtitle: 'Articles on software architecture, UX, & design engineering.',
    tag: 'WRITING',
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    accent: '#a78bfa',
    icon: '⟨⟩'
  },
  {
    id: 4,
    num: '04',
    title: 'Epigraphs',
    path: '/epigraphs',
    subtitle: 'Quotes and timeless principles that inspire my everyday craft.',
    tag: 'PHILOSOPHY',
    gradient: 'linear-gradient(135deg, #0a0a0a, #1f1b33, #2d1b69)',
    accent: '#f472b6',
    icon: '⬡'
  }
];

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

function AnimCard({ card, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100 + index * 120);
    return () => clearTimeout(t);
  }, [index]);

  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rx = clamp((y / height * 2 - 1) * -14, -14, 14);
    const ry = clamp((x / width * 2 - 1) * 14, -14, 14);
    setTilt({ x: rx, y: ry });
    setGlowPos({ x: (x / width) * 100, y: (y / height) * 100 });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
    setHovered(false);
  };

  return (
    <Link
      href={card.path}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      className="animated-card-wrapper"
      style={{
        perspective: 900,
        position: 'relative',
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0px) scale(1)' : 'translateY(36px) scale(0.96)',
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${index * 0.12}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${index * 0.12}s`,
        textDecoration: 'none'
      }}
    >
      {/* Outer Radial Glow */}
      <div
        style={{
          position: 'absolute',
          inset: -2,
          borderRadius: 22,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${card.accent}55, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Main Card Container */}
      <div
        className="anim-card-inner"
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: 20,
          padding: '32px 26px 28px',
          background: card.gradient,
          border: `1px solid ${hovered ? card.accent + '66' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: hovered
            ? `0 32px 64px rgba(0,0,0,0.55), 0 0 0 1px ${card.accent}33, inset 0 1px 0 rgba(255,255,255,0.12)`
            : '0 16px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          transition: hovered
            ? 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.15s ease'
            : 'box-shadow 0.5s ease, border-color 0.5s ease, transform 0.6s cubic-bezier(.22,1,.36,1)',
          cursor: 'pointer',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}
      >
        {/* Subtle Highlight Reflection */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.07) 0%, transparent 65%)`,
            pointerEvents: 'none',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
            borderRadius: 20
          }}
        />

        {/* Noise overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
            pointerEvents: 'none',
            borderRadius: 20
          }}
        />

        {/* Tag Pill with Pulsing Dot */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 12px',
            borderRadius: 999,
            background: `${card.accent}22`,
            border: `1px solid ${card.accent}44`,
            marginBottom: 24,
            width: 'fit-content'
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: card.accent,
              display: 'inline-block',
              boxShadow: `0 0 6px ${card.accent}`,
              animation: 'pulseDot 2s ease-in-out infinite'
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: card.accent,
              fontWeight: 600
            }}
          >
            {card.tag}
          </span>
        </div>

        {/* Dynamic Icon */}
        <div
          style={{
            fontSize: 36,
            lineHeight: 1,
            marginBottom: 16,
            color: card.accent,
            textShadow: `0 0 20px ${card.accent}88`,
            transform: hovered ? 'scale(1.15) rotate(-6deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.4s cubic-bezier(.34,1.56,.64,1)',
            display: 'inline-block'
          }}
        >
          {card.icon}
        </div>

        {/* Title */}
        <h3
          className="font-mono"
          style={{
            margin: '0 0 10px',
            fontWeight: 700,
            fontSize: 24,
            lineHeight: 1.2,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            textShadow: `0 2px 24px ${card.accent}33`
          }}
        >
          {card.title}
        </h3>

        {/* Subtitle */}
        <p
          className="font-sans"
          style={{
            margin: '0 0 28px',
            fontSize: 14,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.65)',
            fontWeight: 400
          }}
        >
          {card.subtitle}
        </p>

        {/* Bottom Bar: Number & Explore Link */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: 16,
            borderTop: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.05em'
            }}
          >
            {card.num}
          </span>

          <div
            className="font-sans"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: card.accent,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.04em',
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.3s cubic-bezier(.34,1.56,.64,1)'
            }}
          >
            <span>Explore</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                transform: hovered ? 'translateX(3px)' : 'translateX(0)',
                transition: 'transform 0.3s ease'
              }}
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke={card.accent}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ExploreMoreSection() {
  return (
    <section id="explore-more" className="explore-section">
      <div className="explore-container">
        {/* SECTION HEADER */}
        <div className="explore-header">
          <span className="eyebrow font-mono">EXPLORE MORE</span>
          <h2 className="section-title font-mono">Explore More</h2>
          <p className="section-subtitle font-sans">
            Dive into background, guest notes, technical articles, or curated epigraphs.
          </p>
        </div>

        {/* FRAMER ANIMATED CARDS GRID */}
        <div className="animated-cards-grid">
          {CARDS_DATA.map((card, index) => (
            <AnimCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .explore-section {
          position: relative;
          background-color: var(--bg-primary);
          padding: 6rem 0 7rem 0;
          color: var(--text-primary);
          width: 100%;
          border-top: 1px solid var(--border-subtle);
          box-sizing: border-box;
          overflow: hidden;
          transition: background-color 0.35s ease, color 0.35s ease;
        }

        .explore-container {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 3.5rem;
        }

        .explore-header {
          display: flex;
          flex-direction: column;
          margin-bottom: 3.5rem;
        }

        .eyebrow {
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          color: var(--accent-neon);
          margin-bottom: 0.4rem;
        }

        .section-title {
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 500;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 0.6rem;
        }

        .section-subtitle {
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.55;
        }

        .animated-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          width: 100%;
        }

        @keyframes pulseDot {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 6px currentColor;
          }
          50% {
            opacity: 0.5;
            box-shadow: 0 0 12px currentColor;
          }
        }

        @media (max-width: 1100px) {
          .animated-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .explore-container {
            padding: 0 1.5rem;
          }
          .animated-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
