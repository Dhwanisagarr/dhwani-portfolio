'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ALL_CARDS = [
  {
    id: 'about',
    title: 'About',
    path: '/about',
    subtitle: 'Background, product thinking, and craft philosophy.',
    tag: 'BACKGROUND',
    bg: '#FAF4D4',
    pillBg: '#F2D9DA',
    borderColor: 'rgba(102, 0, 5, 0.15)',
    textColor: '#660005',
    subtextColor: '#660005',
  },
  {
    id: 'guest-notes',
    title: 'Guest Notes',
    path: '/guest-notes',
    subtitle: 'Read visitor notes or leave your own message in the logbook.',
    tag: 'COMMUNITY',
    bg: '#FAF4D4',
    pillBg: '#F2D9DA',
    borderColor: 'rgba(102, 0, 5, 0.15)',
    textColor: '#660005',
    subtextColor: '#660005',
  },
  {
    id: 'books',
    title: 'Books',
    path: '/books',
    subtitle: 'Books, notes, and stories that stay with me.',
    tag: 'LIBRARY',
    bg: '#FAF4D4',
    pillBg: '#F2D9DA',
    borderColor: 'rgba(102, 0, 5, 0.15)',
    textColor: '#660005',
    subtextColor: '#660005',
  },
  {
    id: 'epigraphs',
    title: 'Epigraphs',
    path: '/epigraphs',
    subtitle: 'Quotes and timeless principles that inspire my everyday craft.',
    tag: 'PHILOSOPHY',
    bg: '#FAF4D4',
    pillBg: '#F2D9DA',
    borderColor: 'rgba(102, 0, 5, 0.15)',
    textColor: '#660005',
    subtextColor: '#660005',
  },
  {
    id: 'blogs',
    title: 'Blogs',
    path: '/blogs',
    subtitle: 'Personal notes, lessons, and reflections on building things.',
    tag: 'WRITING',
    bg: '#FAF4D4',
    pillBg: '#F2D9DA',
    borderColor: 'rgba(102, 0, 5, 0.15)',
    textColor: '#660005',
    subtextColor: '#660005',
  },
  {
    id: '4rinlabs',
    title: '4RinLabs',
    path: '/4rinlabs',
    subtitle: 'Four friends. One creative playground agency.',
    tag: 'AGENCY',
    bg: '#FAF4D4',
    pillBg: '#F2D9DA',
    borderColor: 'rgba(102, 0, 5, 0.15)',
    textColor: '#660005',
    subtextColor: '#660005',
  }
];

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

function AnimCard({ card, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80 + index * 100);
    return () => clearTimeout(t);
  }, [index]);

  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rx = clamp((y / height * 2 - 1) * -8, -8, 8);
    const ry = clamp((x / width * 2 - 1) * 8, -8, 8);
    setTilt({ x: rx, y: ry });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
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
        perspective: 1000,
        position: 'relative',
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0px)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.1}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.1}s`,
        textDecoration: 'none',
        height: '100%'
      }}
    >
      {/* Main Card Container */}
      <div
        className="anim-card-inner"
        style={{
          position: 'relative',
          zIndex: 2,
          borderRadius: 20,
          padding: '28px 24px 22px',
          background: card.bg,
          border: `1px solid ${card.borderColor}`,
          boxShadow: hovered
            ? `0 20px 40px rgba(102, 0, 5, 0.12), 0 0 0 1px ${card.textColor}22`
            : '0 8px 24px rgba(102, 0, 5, 0.05)',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? '-4px' : '0px'})`,
          transition: hovered
            ? 'box-shadow 0.25s ease, border-color 0.25s ease, transform 0.15s ease'
            : 'box-shadow 0.4s ease, border-color 0.4s ease, transform 0.5s cubic-bezier(.22,1,.36,1)',
          cursor: 'pointer',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}
      >
        {/* Tag Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 11px',
            borderRadius: 999,
            background: card.pillBg,
            marginBottom: 20,
            width: 'fit-content'
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: card.textColor,
              display: 'inline-block'
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: card.textColor,
              fontWeight: 700
            }}
          >
            {card.tag}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display"
          style={{
            margin: '0 0 8px',
            fontWeight: 700,
            fontSize: 26,
            lineHeight: 1.25,
            color: card.textColor,
            letterSpacing: '-0.01em'
          }}
        >
          {card.title}
        </h3>

        {/* Subtitle */}
        <p
          className="font-sans"
          style={{
            margin: '0 0 24px',
            fontSize: 13.5,
            lineHeight: 1.55,
            color: card.subtextColor,
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
            paddingTop: 14,
            borderTop: `1px solid rgba(102, 0, 5, 0.12)`
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: 12,
              color: card.textColor,
              opacity: 0.6,
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
              color: card.textColor,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.02em',
              transform: hovered ? 'translateX(3px)' : 'translateX(0)',
              transition: 'transform 0.25s cubic-bezier(.34,1.56,.64,1)'
            }}
          >
            <span>Explore</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                transform: hovered ? 'translateX(3px)' : 'translateX(0)',
                transition: 'transform 0.25s ease'
              }}
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke={card.textColor}
                strokeWidth="1.8"
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

import BackgroundWatermark from './BackgroundWatermark';

export default function ExploreMoreSection() {
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';
  const sectionBgColor = isAboutPage ? '#F2D9DA' : '#F5E1E2';

  // Filter out the card corresponding to the current active page
  const filteredCards = ALL_CARDS.filter((card) => {
    if (!pathname) return true;
    if (pathname === '/' && card.path === '/about') return true;
    return pathname !== card.path && !pathname.startsWith(`${card.path}/`);
  });

  // Take first 4 cards and re-assign 01, 02, 03, 04 numbers
  const displayCards = filteredCards.slice(0, 4).map((card, idx) => ({
    ...card,
    num: `0${idx + 1}`
  }));

  const isHomePage = pathname === '/';

  return (
    <section 
      id="explore-more" 
      className="explore-section" 
      data-color={sectionBgColor}
      style={{ backgroundColor: isHomePage ? 'transparent' : sectionBgColor }}
    >
      {/* Giant Centered Background Typography Watermark (Removed on /about page) */}
      {!isAboutPage && (
        <BackgroundWatermark word="EXPLORE" color="rgba(102, 0, 5, 0.065)" />
      )}

      <div className="explore-container">
        {/* SECTION HEADER */}
        <div className="explore-header">
          <div className="eyebrow-row">
            <span className="eyebrow-dot" />
            <span className="eyebrow font-mono">EXPLORE MORE</span>
          </div>
          <h2 className="section-title font-display">Explore More</h2>
          <p className="section-subtitle font-sans">
            Dive into background, guest notes, technical articles, or curated epigraphs.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="animated-cards-grid">
          {displayCards.map((card, index) => (
            <AnimCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .explore-section {
          position: relative;
          background-color: transparent;
          padding: 6.5rem 0 7rem 0;
          color: #660005;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        .bg-typography-canvas {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.4rem;
          font-size: clamp(10vw, 17vw, 22vw);
          font-weight: 900;
          line-height: 0.76;
          color: rgba(102, 0, 5, 0.065);
          letter-spacing: -0.04em;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          z-index: 1;
        }

        .typo-row {
          line-height: 0.76;
        }

        .explore-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 3.5rem;
        }

        .explore-header {
          display: flex;
          flex-direction: column;
          margin-bottom: 3rem;
        }

        .eyebrow-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #660005;
          display: inline-block;
        }

        .eyebrow {
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          color: #660005;
          font-weight: 700;
        }

        .section-title {
          font-size: clamp(3rem, 5vw, 4.5rem);
          font-weight: 700;
          color: #660005;
          letter-spacing: -0.02em;
          line-height: 1.05;
          margin-bottom: 0.75rem;
        }

        .section-subtitle {
          font-size: clamp(0.98rem, 1.15vw, 1.08rem);
          color: #660005;
          max-width: 620px;
          line-height: 1.55;
          font-weight: 400;
        }

        .animated-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.35rem;
          width: 100%;
        }

        @media (max-width: 1100px) {
          .animated-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .explore-container {
            padding: 0 1.5rem;
          }
          .animated-cards-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}

