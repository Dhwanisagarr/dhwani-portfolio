'use client';

import { useProjectModal } from '../context/ProjectModalContext';
import projectsData from '../data/projects.json';
import BackgroundWatermark from './BackgroundWatermark';

const previewConfigs = {
  'product-thinking-teardowns': {
    height: '240px',
    bg: 'linear-gradient(135deg, #FAF7F2 0%, #EDE8DF 100%)',
    badge: 'PRODUCT TEARDOWNS',
    watermark: 'TEARDOWNS',
  },
  signaldesk: {
    height: '210px',
    bg: 'linear-gradient(135deg, #18121e 0%, #0d0912 100%)',
    badge: 'VOICE OF CUSTOMER',
    watermark: 'SIGNALDESK',
  },
  dahlia: {
    height: '310px',
    bg: 'linear-gradient(135deg, #24101a 0%, #0f070c 100%)',
    badge: 'BOTANICAL MEMORY',
    watermark: 'DAHLIA',
  },
  streakup: {
    height: '190px',
    bg: 'linear-gradient(135deg, #121c16 0%, #0a120e 100%)',
    badge: 'HABIT TRACKER',
    watermark: 'STREAKUP',
  },
  'cp-speech-pain': {
    height: '260px',
    bg: 'linear-gradient(135deg, #1a1226 0%, #0e0917 100%)',
    badge: 'NEURAL ML',
    watermark: 'CP-ML',
  },
  together: {
    height: '225px',
    bg: 'linear-gradient(135deg, #141a26 0%, #090e17 100%)',
    badge: 'FINTECH AI',
    watermark: 'TOGETHER.',
  }
};

// Varied preset position offsets for faded card header watermarks on Projects page
const cardWatermarkOffsets = [
  { transform: 'translate(0px, 0px)' },          // Card 0: Center standard
  { transform: 'translate(-28px, -12px)' },      // Card 1: Shifted top-left
  { transform: 'translate(35px, 10px)' },        // Card 2: Shifted bottom-right
  { transform: 'translate(-15px, 14px)' },       // Card 3: Shifted bottom-left
  { transform: 'translate(30px, -10px)' },       // Card 4: Shifted top-right
];

export default function ProjectsPageClient() {
  const { openProject } = useProjectModal();

  const col1 = projectsData.filter((_, idx) => idx % 3 === 0);
  const col2 = projectsData.filter((_, idx) => idx % 3 === 1);
  const col3 = projectsData.filter((_, idx) => idx % 3 === 2);

  const renderProjectCard = (project, index) => {
    if (!project) return null;
    const config = previewConfigs[project.slug] || {
      height: '220px',
      bg: 'linear-gradient(135deg, #1a121e 0%, #0d0812 100%)',
      badge: project.category ? project.category.toUpperCase() : 'PROJECT',
      watermark: project.slug ? project.slug.toUpperCase() : 'CASE STUDY',
    };

    const isNotionProject = project.slug === 'product-thinking-teardowns';

    return (
      <article
        key={project.id}
        className="p-card-light-pink"
        onClick={() => {
          if (isNotionProject && project.liveUrl) {
            window.open(project.liveUrl, '_blank');
          } else {
            openProject(project.slug || project.id);
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        {/* Top Image Preview Area */}
        <div 
          className="p-card-image-box"
          style={{ 
            height: config.height,
            background: config.bg
          }}
        >
          <img
            src={project.image || `/images/projects/${project.slug}.png`}
            alt={project.title}
            className="p-card-cover-img"
          />
          <div className="p-card-img-overlay" aria-hidden="true" />
          <div 
            className="p-card-watermark font-mono" 
            aria-hidden="true"
            style={cardWatermarkOffsets[index % cardWatermarkOffsets.length]}
          >
            {config.watermark}
          </div>

          <div className="p-card-top-bar font-mono">
            <span className="p-card-badge">{config.badge}</span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-card-live-btn font-mono"
                onClick={(e) => e.stopPropagation()}
              >
                {isNotionProject ? 'Notion ↗' : 'Live Demo ↗'}
              </a>
            )}
            <span className="p-card-num">0{index + 1}</span>
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-card-content">
          <div className="p-card-meta font-mono">
            <span>{project.timeline}</span>
            <span>•</span>
            <span>{project.role}</span>
          </div>

          <h3 className="p-card-title font-mono">{project.title}</h3>

          <p className="p-card-desc font-sans">
            {project.description}
          </p>

          <div className="p-card-tags font-mono">
            {project.tools && project.tools.slice(0, 5).map((tool, tIdx) => (
              <span key={tIdx} className="p-card-tag-pill">
                {tool}
              </span>
            ))}
            {project.tools && project.tools.length > 5 && (
              <span className="p-card-tag-pill extra">
                +{project.tools.length - 5}
              </span>
            )}
          </div>

          <div className="p-card-cta-row">
            <button
              type="button"
              className="p-card-btn font-mono"
              onClick={(e) => {
                e.stopPropagation();
                if (isNotionProject && project.liveUrl) {
                  window.open(project.liveUrl, '_blank');
                } else {
                  openProject(project.slug || project.id);
                }
              }}
            >
              <span>{isNotionProject ? 'Open Notion Doc' : 'View Case Study'}</span>
              <span className="p-card-btn-arrow">↗</span>
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <>
      {/* Dynamic Staggered Typography Watermark */}
      <BackgroundWatermark word="PROJECTS" color="rgba(102, 0, 5, 0.095)" />

      {/* Ambient radial glow spot & grid overlay matching homepage */}
      <div className="p-bg-ambient-glow" aria-hidden="true" />
      <div className="p-bg-grid-overlay" aria-hidden="true" />

      <div className="p-page-container">
        <header className="p-page-header">
          <span className="p-page-eyebrow font-mono">PORTFOLIO</span>
          <h1 className="p-page-title font-mono">Work that makes a difference.</h1>
          <p className="p-page-sublead font-sans">
            Built with intent. Shipped with care. Here is the proof.
          </p>
        </header>

        {/* Desktop 3-Column Masonry Grid */}
        <div className="p-grid-desktop">
          <div className="p-grid-col">
            {col1.map((p) => {
              const index = projectsData.findIndex((item) => item.id === p.id);
              return renderProjectCard(p, index);
            })}
          </div>

          <div className="p-grid-col">
            {col2.map((p) => {
              const index = projectsData.findIndex((item) => item.id === p.id);
              return renderProjectCard(p, index);
            })}
          </div>

          <div className="p-grid-col">
            {col3.map((p) => {
              const index = projectsData.findIndex((item) => item.id === p.id);
              return renderProjectCard(p, index);
            })}
          </div>
        </div>

        {/* Tablet 2-Column Grid */}
        <div className="p-grid-tablet">
          <div className="p-grid-col">
            {projectsData.filter((_, idx) => idx % 2 === 0).map((p) => {
              const index = projectsData.findIndex((item) => item.id === p.id);
              return renderProjectCard(p, index);
            })}
          </div>
          <div className="p-grid-col">
            {projectsData.filter((_, idx) => idx % 2 === 1).map((p) => {
              const index = projectsData.findIndex((item) => item.id === p.id);
              return renderProjectCard(p, index);
            })}
          </div>
        </div>

        {/* Mobile 1-Column Grid */}
        <div className="p-grid-mobile">
          {projectsData.map((project, idx) => renderProjectCard(project, idx))}
        </div>
      </div>
    </>
  );
}
