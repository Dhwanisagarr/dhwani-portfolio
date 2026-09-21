'use client';

import { useState, useEffect, useRef } from 'react';
import { useProjectModal } from '../context/ProjectModalContext';
import projectsData from '../data/projects.json';
import BackgroundWatermark from './BackgroundWatermark';

const projectAccents = [
  '#E3BDBE', // Light Pink
  '#FAF4D4', // Light Goldenrod Yellow
  '#F2D9DA', // Soft Pink
  '#FAF4D4', // Light Goldenrod Yellow
];

// Varied preset position offsets for faded card header watermarks
const watermarkOffsets = [
  { transform: 'translate(0px, 0px)' },          // Card 0 (SignalDesk): Top-left flush
  { transform: 'translate(36px, 12px)' },        // Card 1 (DAHLIA): Shifted right & down
  { transform: 'translate(75px, -2px)' },        // Card 2 (StreakUp): Shifted right towards top-center
  { transform: 'translate(14px, 20px)' },        // Card 3 (CP): Shifted down
  { transform: 'translate(48px, 6px)' },         // Card 4 (Together): Shifted mid-right
];

export default function ProjectsSection() {
  const { openProject } = useProjectModal();
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!wrapperRef.current || !trackRef.current) return;

      const wrapper = wrapperRef.current;
      const track = trackRef.current;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Disable JS transform translation on mobile touch viewports (<= 640px)
      if (viewportWidth <= 640) {
        if (track.style.transform) {
          track.style.transform = '';
        }
        return;
      }

      // Calculate document-absolute top position (works accurately across Safari, Chrome, and all layout contexts)
      const rect = wrapper.getBoundingClientRect();
      const wrapperTop = rect.top + window.scrollY;
      const wrapperHeight = Math.max(1, wrapper.offsetHeight - viewportHeight);
      const currentScroll = window.scrollY - wrapperTop;

      // Progress normalized strictly between 0 and 1
      const progress = Math.max(0, Math.min(1, currentScroll / wrapperHeight));
      setScrollProgress(progress);

      // Horizontal card track translation distance calculation
      const startOffset = viewportWidth * 0.52;
      const trackWidth = track.scrollWidth;

      // Total horizontal travel distance across section
      const totalTravel = startOffset + trackWidth - (viewportWidth * 0.3);
      const currentX = startOffset - (progress * totalTravel);

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;

      // Active card index tracking
      const numProjects = projectsData.length;
      const idx = Math.min(
        numProjects - 1,
        Math.floor(progress * numProjects)
      );
      setActiveProjectIndex(idx);
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('load', handleScroll);

    if (document.fonts) {
      document.fonts.ready.then(handleScroll);
    }

    const resizeObserver = new ResizeObserver(handleScroll);
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
    if (trackRef.current) resizeObserver.observe(trackRef.current);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('load', handleScroll);
      resizeObserver.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const currentAccent = projectAccents[activeProjectIndex % projectAccents.length];

  return (
    <section id="projects" ref={wrapperRef} className="projects-scroll-wrapper" data-color="#660005">
      <div
        className="projects-sticky-pin"
        style={{ '--project-accent': currentAccent }}
      >
        {/* Whole-Word Shared Background Typography Watermark */}
        <BackgroundWatermark word="PROJECT" color="rgba(255, 255, 255, 0.065)" />

        {/* Ambient radial glow spot reacting to active project color */}
        <div className="bg-ambient-glow" aria-hidden="true" />
        <div className="bg-grid-overlay" aria-hidden="true" />

        {/* Section Header (Fixed inside sticky container) */}
        <div className="projects-header-container">
          <div className="header-text-block">
            <span className="eyebrow font-mono">SELECTED PROJECTS</span>
            <h2 className="section-title font-mono">Selected Projects</h2>
            <p className="section-subtitle font-sans">
              “Things I was curious enough to explore, build, and bring to life.”
            </p>
          </div>

          {/* Progress Badge Indicator */}
          <div className="progress-badge font-mono">
            <span className="badge-current">0{activeProjectIndex + 1}</span>
            <span className="badge-slash">/</span>
            <span className="badge-total">0{projectsData.length}</span>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Floating Horizontal Project Cards Track */}
        <div className="track-overflow-mask">
          <div ref={trackRef} className="projects-track">
            {projectsData.map((project, idx) => {
              const isNotionProject = project.slug === 'product-thinking-teardowns';

              return (
                <div
                  key={project.id}
                  className={`project-card ${activeProjectIndex === idx ? 'card-active' : ''}`}
                  onClick={() => {
                    if (isNotionProject && project.liveUrl) {
                      window.open(project.liveUrl, '_blank');
                    } else {
                      openProject(project);
                    }
                  }}
                  style={{
                    cursor: 'pointer',
                    '--card-accent': projectAccents[idx % projectAccents.length]
                  }}
                >
                  <div className="card-link-wrapper">
                    {/* Clean Media Screen displaying project cover picture */}
                    <div className="card-media-screen">
                      <img
                        src={project.image || `/images/projects/${project.slug}.png`}
                        alt={project.title}
                        className="card-cover-img"
                      />
                    </div>

                    {/* Clean Bottom Information Strip matching reference */}
                    <div className="card-bottom-strip font-mono">
                      <div className="strip-left">
                        <span className="strip-logo-mark">
                          {project.slug === 'product-thinking-teardowns' && '💡'}
                          {project.slug === 'signaldesk' && '⚡'}
                          {project.slug === 'dahlia' && '🌸'}
                          {project.slug === 'streakup' && '📈'}
                          {project.slug === 'cp-speech-pain' && '🧠'}
                          {project.slug === 'together' && '✨'}
                          {!['product-thinking-teardowns', 'signaldesk', 'dahlia', 'streakup', 'cp-speech-pain', 'together'].includes(project.slug) && '🚀'}
                        </span>
                        <span className="strip-title">{project.title.split('—')[0].trim()}</span>
                      </div>
                      <div className="strip-right font-mono">
                        {isNotionProject && project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="strip-status-badge live"
                            onClick={(e) => e.stopPropagation()}
                          >
                            NOTION DOC ↗
                          </a>
                        ) : project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="strip-status-badge live"
                            onClick={(e) => e.stopPropagation()}
                          >
                            LIVE APP ↗
                          </a>
                        ) : (
                          <span className="strip-status-badge case-study">
                            CASE STUDY
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Scroll Hint */}
        <div className="scroll-hint font-mono">
          <span>SCROLL DOWN TO EXPLORE</span>
          <div className="scroll-line" />
        </div>
      </div>

      <style jsx>{`
        .projects-scroll-wrapper {
          position: relative;
          height: 380vh;
          background-color: transparent;
        }

        .projects-sticky-pin {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100dvh;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3.5rem 0 2.5rem 0;
          box-sizing: border-box;
          background-color: transparent;
          color: #F7F1E3;
          transition: background-color 0.6s ease;
        }

        /* OVERSIZED "PROJECT" BACKGROUND TYPOGRAPHY */
        .bg-typography-canvas {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.2rem;
          font-size: clamp(14vw, 22vw, 30vw);
          font-weight: 900;
          line-height: 0.76;
          color: var(--project-accent);
          letter-spacing: -0.04em;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          z-index: 1;
          opacity: 0.12;
          transition: color 0.6s ease, opacity 0.6s ease;
        }

        .typo-row {
          line-height: 0.76;
        }

        .bg-ambient-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 60% 50%,
            var(--project-accent) 0%,
            transparent 65%
          );
          opacity: 0.06;
          pointer-events: none;
          z-index: 1;
          transition: background 0.6s ease;
        }

        .bg-grid-overlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.015) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.015) 1px,
              transparent 1px
            );
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 2;
        }

        .projects-header-container {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1680px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 5rem);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
        }

        .header-text-block {
          display: flex;
          flex-direction: column;
        }

        .eyebrow {
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          color: var(--project-accent);
          margin-bottom: 0.4rem;
          transition: color 0.6s ease;
        }

        .section-title {
          font-size: clamp(2.4rem, 4.2vw, 3.8rem);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          color: #a0a0a5;
          max-width: 520px;
          line-height: 1.5;
          font-style: normal;
          font-weight: 400;
        }

        .progress-badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.45rem 0.95rem;
          border-radius: 100px;
          font-size: 0.85rem;
        }

        .badge-current {
          color: var(--project-accent);
          font-weight: 600;
          transition: color 0.6s ease;
        }

        .badge-slash,
        .badge-total {
          color: #78787d;
        }

        .progress-bar-track {
          width: 50px;
          height: 3px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 2px;
          overflow: hidden;
          margin-left: 0.3rem;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--project-accent);
          transition: width 0.1s linear, background-color 0.6s ease;
        }

        /* Track Container */
        .track-overflow-mask {
          position: relative;
          z-index: 4;
          width: 100%;
          overflow: hidden;
          padding: 1.5rem 0;
        }

        .projects-track {
          display: flex;
          gap: 2.25rem;
          will-change: transform;
          transition: transform 0.08s ease-out;
        }

        /* Refined Card Design matching Reference Screenshot */
        .project-card {
          width: 580px;
          min-width: 580px;
          max-width: 580px;
          height: 370px;
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 28px;
          padding: 6px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 65px rgba(0, 0, 0, 0.8);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          border: 1.5px solid rgba(255, 255, 255, 0.4);
        }

        .project-card:hover,
        .project-card.card-active {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 32px 75px rgba(0, 0, 0, 0.95), 0 0 30px rgba(255, 255, 255, 0.25);
          border-color: #ffffff;
        }

        .card-link-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          text-decoration: none;
          color: inherit;
        }

        .card-media-screen {
          width: 100%;
          height: 308px;
          border-radius: 22px 22px 0 0;
          overflow: hidden;
          position: relative;
          background: #0d0d12;
        }

        .card-cover-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }

        /* Bottom White Strip */
        .card-bottom-strip {
          height: 50px;
          background: #ffffff;
          border-radius: 0 0 22px 22px;
          padding: 0 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #000000;
        }

        .strip-left {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          overflow: hidden;
        }

        .strip-logo-mark {
          font-size: 0.95rem;
          line-height: 1;
        }

        .strip-title {
          font-size: 0.88rem;
          font-weight: 800;
          color: #000000;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 340px;
        }

        .strip-right {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          gap: 0.5rem;
        }

        .strip-status-badge {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.3rem 0.85rem;
          border-radius: 100px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .strip-status-badge.live {
          color: #660005;
          background: #DF8F9C;
          border: 1px solid rgba(102, 0, 5, 0.2);
          text-decoration: none;
        }

        .strip-status-badge.live:hover {
          transform: translateY(-1px);
          background: #660005;
          color: #FAF4D4;
        }

        .strip-status-badge.case-study {
          color: #FAF4D4;
          background: #660005;
        }

        .scroll-hint {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          color: #78787d;
          letter-spacing: 0.15em;
        }

        .scroll-line {
          width: 35px;
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 900px) {
          .project-card {
            width: calc(100vw - 3rem);
            min-width: 0 !important;
            max-width: 520px;
            height: 320px;
          }

          .card-media-screen {
            height: 260px;
          }

          .projects-header-container {
            padding: 0 2rem;
          }
        }

        @media (max-width: 640px) {
          .projects-scroll-wrapper {
            height: auto;
          }

          .projects-sticky-pin {
            position: relative;
            height: auto;
            overflow: hidden;
            padding: 4rem 1.5rem;
          }

          .projects-header-container {
            padding: 0;
            flex-direction: column;
            align-items: flex-start;
          }

          .track-overflow-mask {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding: 1rem 0;
            width: 100%;
            box-sizing: border-box;
          }

          .projects-track {
            transform: none !important;
            max-width: 100%;
          }

          .project-card {
            width: calc(100vw - 3rem) !important;
            min-width: 0 !important;
            max-width: 100% !important;
            height: 290px;
            scroll-snap-align: center;
            box-sizing: border-box;
          }

          .card-media-screen {
            height: 232px;
            width: 100%;
          }

          .card-cover-img {
            max-width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }

          .scroll-hint {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
