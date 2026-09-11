import Link from 'next/link';
import { notFound } from 'next/navigation';
import projectsData from '../../../data/projects.json';
import Footer from '../../../components/Footer';

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Dhwani Sagar Case Study`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="detail-wrapper">
      <div className="detail-header">
        <div className="container">
          <Link href="/projects" className="back-link font-mono">
            ← Back to Projects
          </Link>

          <div className="header-meta">
            <span className="eyebrow">{project.category}</span>
            <span className="year font-mono">{project.timeline}</span>
          </div>

          <h1 className="project-title font-mono">{project.title}</h1>
          <p className="project-tagline">{project.tagline}</p>

          <div className="meta-grid glass-panel">
            <div className="meta-col">
              <span className="meta-label font-mono">ROLE</span>
              <span className="meta-val">{project.role}</span>
            </div>
            <div className="meta-col">
              <span className="meta-label font-mono">KEY METRICS</span>
              <span className="meta-val highlight">{project.metrics}</span>
            </div>
            <div className="meta-col">
              <span className="meta-label font-mono">TOOLS & STACK</span>
              <div className="tools-wrap">
                {project.tools.map((t, idx) => (
                  <span key={idx} className="tool-pill font-mono">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container detail-content section-padding">
        <div className="case-study-grid">
          {/* Main Case Study Column */}
          <div className="case-study-main">
            <section className="case-block">
              <h2 className="block-title font-mono">01. Overview</h2>
              <p>{project.description}</p>
            </section>

            {project.caseStudy && (
              <>
                <section className="case-block">
                  <h2 className="block-title font-mono">02. Problem Statement</h2>
                  <p>{project.caseStudy.problem}</p>
                </section>

                <section className="case-block">
                  <h2 className="block-title font-mono">03. Solution & Approach</h2>
                  <p>{project.caseStudy.solution}</p>
                </section>

                <section className="case-block">
                  <h2 className="block-title font-mono">04. Key Technical Highlights</h2>
                  <ul className="highlights-list">
                    {project.caseStudy.highlights.map((h, i) => (
                      <li key={i}>
                        <span className="accent-bullet font-mono">✦</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="case-study-sidebar glass-panel">
            <h3 className="sidebar-title font-mono">PROJECT INFO</h3>
            <div className="info-row">
              <span className="info-label font-mono">CLIENT / CONTEXT</span>
              <span className="info-val">Portfolio Case Study</span>
            </div>
            <div className="info-row">
              <span className="info-label font-mono">STATUS</span>
              <span className="info-val text-neon font-mono">COMPLETED</span>
            </div>
            
            <div className="sidebar-cta">
              <Link href="/contact" className="btn-primary full-width">
                Discuss Similar Project →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <Footer />

      <style>{`
        .detail-wrapper {
          padding-top: 100px;
          background: #080808;
        }

        .detail-header {
          padding: 4rem 0 3rem 0;
          background: #0d0d0d;
          border-bottom: 1px solid var(--border-subtle);
        }

        .back-link {
          display: inline-block;
          font-size: 0.85rem;
          color: var(--accent-neon);
          text-decoration: none;
          margin-bottom: 2rem;
        }

        .header-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .year {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .project-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .project-tagline {
          font-size: 1.35rem;
          color: var(--text-secondary);
          max-width: 700px;
          margin-bottom: 2.5rem;
        }

        .meta-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          padding: 2rem;
        }

        .meta-col {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .meta-label {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: var(--text-muted);
        }

        .meta-val {
          font-size: 1rem;
          color: var(--text-primary);
        }

        .meta-val.highlight {
          color: var(--accent-neon);
          font-family: var(--font-mono);
        }

        .tools-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .tool-pill {
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          color: var(--text-secondary);
        }

        .case-study-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .case-study-main {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .case-block {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .block-title {
          font-size: 1.5rem;
          color: var(--accent-neon);
        }

        .case-block p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        .highlights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .highlights-list li {
          font-size: 1.05rem;
          color: var(--text-secondary);
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .accent-bullet {
          color: var(--accent-neon);
        }

        .case-study-sidebar {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: sticky;
          top: 120px;
        }

        .sidebar-title {
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .info-row {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-label {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .info-val {
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .text-neon { color: var(--accent-neon); }

        .full-width {
          width: 100%;
        }

        @media (max-width: 992px) {
          .meta-grid {
            grid-template-columns: 1fr;
          }
          .case-study-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
