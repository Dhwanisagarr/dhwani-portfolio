'use client';

import { useState, useEffect } from 'react';

export default function BloopPreloader({
  mainTitle = 'DHWANI SAGAR',
  subTitle = 'SOFTWARE ARCHITECTURE & PRODUCT DESIGN',
  onComplete
}) {
  // Variants: 'initial' | 'textOut' | 'figureAnim' | 'figureComplete' | 'done'
  const [stage, setStage] = useState('initial');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock body scrolling during preloader
    document.body.style.overflow = 'hidden';

    // Sequence timing matching Framer Bloop Preloader
    const t1 = setTimeout(() => {
      setStage('textOut');
    }, 1100);

    const t2 = setTimeout(() => {
      setStage('figureAnim');
    }, 1600);

    const t3 = setTimeout(() => {
      setStage('figureComplete');
    }, 2200);

    const t4 = setTimeout(() => {
      setStage('done');
      setIsVisible(false);
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`bloop-preloader-overlay stage-${stage}`}
      aria-hidden="true"
    >
      {/* BACKGROUND SHIELD */}
      <div className="preloader-bg" />

      {/* TEXT CONTENT CONTAINER */}
      <div className={`text-container ${stage === 'initial' ? 'show-text' : 'hide-text'}`}>
        <h1 className="preloader-title font-mono">{mainTitle}</h1>
        <p className="preloader-subtitle font-sans">{subTitle}</p>
      </div>

      {/* BLOOP TRANSITIONAL LIQUID FIGURE */}
      {(stage === 'figureAnim' || stage === 'figureComplete' || stage === 'textOut') && (
        <div className={`figure-container ${stage === 'figureComplete' ? 'expand-figure' : ''}`}>
          <svg
            viewBox="0 0 2022 1751"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="bloop-svg"
          >
            <path
              d="M 11.605 1198.824 C 117.81 2048.365 715.599 1194.746 966.065 1533.064 C 1216.53 1871.381 1493.524 1794.135 1781.626 1451.023 C 2069.727 1107.911 2087.799 844.701 1896.563 817.836 C 1705.326 790.972 2032.184 57.703 1287.972 4.679 C 543.76 -48.345 -94.6 349.283 11.605 1198.824 Z"
              fill="var(--accent-neon, #CCFF00)"
              stroke="none"
            />
          </svg>
        </div>
      )}

      <style jsx>{`
        .bloop-preloader-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          pointer-events: all;
          background-color: var(--bg-primary, #050505);
          transition: opacity 0.6s cubic-bezier(0.44, 0, 0.56, 1);
        }

        .stage-done {
          opacity: 0;
          pointer-events: none;
        }

        .preloader-bg {
          position: absolute;
          inset: 0;
          background-color: var(--bg-primary, #050505);
          z-index: 1;
          transition: background-color 0.5s ease;
        }

        /* TEXT CONTENT */
        .text-container {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          padding: 0 2rem;
          text-align: center;
          transition: opacity 0.6s cubic-bezier(0.44, 0, 0.56, 1),
                      transform 0.6s cubic-bezier(0.44, 0, 0.56, 1);
        }

        .show-text {
          opacity: 1;
          transform: scale(1);
        }

        .hide-text {
          opacity: 0;
          transform: scale(1.06);
          pointer-events: none;
        }

        .preloader-title {
          font-size: clamp(2.5rem, 7vw, 6.5rem);
          font-weight: 800;
          color: var(--text-primary, #ffffff);
          letter-spacing: -0.03em;
          line-height: 1;
          margin: 0;
          animation: slideInLeft 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .preloader-subtitle {
          font-size: clamp(0.75rem, 1.4vw, 1.05rem);
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent-neon, #CCFF00);
          margin: 0;
          animation: slideInRight 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* BLOOP FIGURE */
        .figure-container {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          transform: scale(0.01);
          opacity: 0;
          transition: transform 0.8s cubic-bezier(0.44, 0, 0.56, 1),
                      opacity 0.4s ease;
        }

        .figure-container.expand-figure {
          transform: scale(3.5);
          opacity: 1;
        }

        .bloop-svg {
          width: 80vw;
          height: 80vh;
          max-width: 1200px;
          filter: drop-shadow(0 0 40px var(--accent-neon-glow, rgba(204, 255, 0, 0.4)));
          animation: spinPulse 6s ease-in-out infinite alternate;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-120px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(120px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes spinPulse {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(6deg) scale(1.05);
          }
          100% {
            transform: rotate(-6deg) scale(0.98);
          }
        }
      `}</style>
    </div>
  );
}
