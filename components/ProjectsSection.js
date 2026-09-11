'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import projectsData from '../data/projects.json';

const projectAccents = [
  '#efff00', // Project 1: Neon Yellow
  '#00e5ff', // Project 2: Electric Cyan
  '#ff007f', // Project 3: Vivid Magenta
  '#00ff9d', // Project 4: Emerald Green
];

export default function ProjectsSection() {
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

      const wrapperTop = wrapper.offsetTop;
      const wrapperHeight = wrapper.offsetHeight - window.innerHeight;
      const currentScroll = window.scrollY - wrapperTop;

      // Progress normalized between 0 and 1
      const progress = Math.max(0, Math.min(1, currentScroll / wrapperHeight));
      setScrollProgress(progress);

      // Start position: first card starts tucked away toward the right side (~52vw)
      const viewportWidth = window.innerWidth;
      const startOffset = viewportWidth * 0.52;
      const trackWidth = track.scrollWidth;

      // Total horizontal translation distance across section
      const totalTravel = startOffset + trackWidth - (viewportWidth * 0.3);
      const currentX = startOffset - (progress * totalTravel);

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;

      // Active card index
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
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const currentAccent = projectAccents[activeProjectIndex % projectAccents.length];

  return (
    <section id="projects" ref={wrapperRef} className="projects-scroll-wrapper">
      <div
        className="projects-sticky-pin"
        style={{ '--project-accent': currentAccent }}
      >
        {/* SINGLE WORD "PROJECT" OVERSIZED BACKGROUND TYPOGRAPHY */}
        <div className="bg-typography-canvas font-mono" aria-hidden="true">
          <div className="typo-row">PROJECT PROJECT PROJECT</div>
          <div className="typo-row">PROJECT PROJECT PROJECT</div>
          <div className="typo-row">PROJECT PROJECT PROJECT</div>
        </div>

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
            {projectsData.map((project, idx) => (
              <div
                key={project.id}
                className={`project-card ${activeProjectIndex === idx ? 'card-active' : ''}`}
                style={{
                  '--card-accent': projectAccents[idx % projectAccents.length]
                }}
              >
                <Link href={`/projects/${project.slug}`} className="card-link-wrapper">
                  {/* Screen Image Preview Canvas */}
                  <div className="card-media-screen">
                    <div className="screen-preview-bg">
                      <span className="screen-watermark font-mono">
                        {project.slug.split('-')[0].toUpperCase()}
                      </span>
                      <div className="screen-content-overlay">
                        <span className="screen-role font-mono">{project.role}</span>
                        <h3 className="screen-title font-mono">{project.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Compact Bottom White Information Strip */}
                  <div className="card-bottom-strip font-mono">
                    <div className="strip-left">
                      <span className="strip-icon">0{idx + 1}</span>
                      <span className="strip-title">{project.title.split('—')[0].trim()}</span>
                    </div>
                    <div className="strip-right font-mono">
                      <span className="strip-metric">{project.metrics.split(',')[0]}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
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
          background-color: #060606;
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
          background-color: #060606;
          color: #ffffff;
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
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 3.5rem;
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
          font-weight: 500;
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
          font-style: italic;
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
          width: 380px;
          min-width: 380px;
          max-width: 380px;
          height: 250px;
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 20px;
          padding: 4px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.75);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .project-card:hover,
        .project-card.card-active {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 255, 255, 0.2);
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
          height: 202px;
          border-radius: 16px 16px 0 0;
          overflow: hidden;
          position: relative;
          background: #0d0d12;
        }

        .screen-preview-bg {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #181824 0%, #0c0c14 100%);
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }

        .screen-watermark {
          font-size: 2.8rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.04);
          letter-spacing: 0.05em;
          line-height: 1;
        }

        .screen-content-overlay {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          z-index: 2;
        }

        .screen-role {
          font-size: 0.68rem;
          color: var(--card-accent);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.6s ease;
        }

        .screen-title {
          font-size: 1.15rem;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.25;
        }

        /* Bottom White Strip */
        .card-bottom-strip {
          height: 44px;
          background: #ffffff;
          border-radius: 0 0 16px 16px;
          padding: 0 0.85rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #000000;
        }

        .strip-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow: hidden;
        }

        .strip-icon {
          font-size: 0.72rem;
          font-weight: 700;
          color: #000000;
          letter-spacing: 0.05em;
        }

        .strip-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #000000;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }

        .strip-right {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .strip-metric {
          font-size: 0.72rem;
          font-weight: 700;
          color: #000000;
          background: var(--card-accent);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          letter-spacing: 0.02em;
          transition: background-color 0.6s ease;
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
            width: 340px;
            min-width: 340px;
            max-width: 340px;
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
            overflow: visible;
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
          }

          .projects-track {
            transform: none !important;
          }

          .project-card {
            width: 82vw;
            min-width: 82vw;
            scroll-snap-align: center;
          }

          .scroll-hint {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
