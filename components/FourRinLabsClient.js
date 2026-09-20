'use client';

import BackgroundWatermark from './BackgroundWatermark';
import ExploreMoreSection from './ExploreMoreSection';
import Footer from './Footer';

export default function FourRinLabsClient() {
  const capabilities = [
    { title: 'Websites', desc: 'Custom, high-crafted web applications built with speed and performance.' },
    { title: 'Portfolio Websites', desc: 'Personalized showcase sites that capture individual identity and craft.' },
    { title: 'Landing Pages', desc: 'Conversion-focused landing pages designed to tell clear product stories.' },
    { title: 'E-commerce', desc: 'Sleek, responsive online store experiences focused on smooth purchasing.' },
    { title: 'Digital Experiences', desc: 'Interactive web tools, widgets, and creative visual experiences.' },
    { title: 'Integrations', desc: 'Connecting APIs, data workflows, and backend services into clean interfaces.' },
  ];

  return (
    <div className="rin-page-wrapper">
      <BackgroundWatermark word="4RINLABS" color="rgba(102, 0, 5, 0.08)" />
      <div className="rin-bg-grid-overlay" aria-hidden="true" />

      <main className="rin-container">
        {/* HERO SECTION */}
        <section className="rin-hero">
          <span className="rin-eyebrow font-mono">CREATIVE AGENCY & STUDIO</span>
          <h1 className="rin-title font-mono">4RinLabs</h1>
          <p className="rin-tagline font-mono">Four friends. One creative playground.</p>
          <p className="rin-intro font-sans">
            4RinLabs was started by me and three friends who enjoy creating things on the web and helping people turn ideas into digital experiences.
          </p>
        </section>

        {/* OUR STORY SECTION */}
        <section className="rin-section rin-story-section">
          <div className="rin-section-header">
            <span className="rin-sub-eyebrow font-mono">OUR STORY</span>
            <h2 className="rin-section-title font-mono">How It Started</h2>
          </div>
          <div className="rin-story-card">
            <p className="font-sans">
              What began as late-night discussions and side projects between four friends slowly evolved into something bigger. We shared a common love for good design, clean code, and bringing web ideas to life.
            </p>
            <p className="font-sans">
              As we kept building together, friends and creators began asking us to help build their sites and projects. We decided to formalize our shared workspace under one roof—4RinLabs—a creative agency dedicated to crafting thoughtful web experiences.
            </p>
          </div>
        </section>

        {/* WHAT WE DO SECTION */}
        <section className="rin-section rin-capabilities-section">
          <div className="rin-section-header">
            <span className="rin-sub-eyebrow font-mono">CAPABILITIES</span>
            <h2 className="rin-section-title font-mono">What We Do</h2>
          </div>
          <div className="rin-capabilities-grid">
            {capabilities.map((item, idx) => (
              <div key={idx} className="rin-capability-card">
                <span className="rin-cap-num font-mono">0{idx + 1}</span>
                <h3 className="rin-cap-title font-mono">{item.title}</h3>
                <p className="rin-cap-desc font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO PREVIEW SECTION */}
        <section className="rin-section rin-portfolio-section">
          <div className="rin-section-header">
            <span className="rin-sub-eyebrow font-mono">PORTFOLIO PREVIEW</span>
            <h2 className="rin-section-title font-mono">A Few Things We&apos;ve Built</h2>
          </div>

          <div className="rin-portfolio-card">
            <div className="rin-card-image-box">
              <img
                src="/images/projects/4rinlabs-preview.png"
                alt="4RinLabs Portfolio Preview"
                className="rin-card-img"
              />
              <div className="rin-card-overlay" aria-hidden="true" />
              <div className="rin-card-watermark font-mono" aria-hidden="true">
                4RINLABS
              </div>
            </div>

            <div className="rin-card-body">
              <div className="rin-card-content">
                <h3 className="rin-card-title font-mono">4RinLabs — Portfolio</h3>
                <p className="rin-card-desc font-sans">
                  A collection of websites, experiments, and digital experiences we&apos;ve created together.
                </p>
              </div>

              <div className="rin-card-action">
                <a
                  href="https://www.4rinlabs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rin-visit-btn font-mono"
                >
                  <span>VISIT 4RINLABS</span>
                  <span className="arrow">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ExploreMoreSection />
      <Footer />

      <style jsx>{`
        .rin-page-wrapper {
          position: relative;
          min-height: 100vh;
          background-color: #FAF4D4;
          color: #660005;
          padding-top: 100px;
          overflow-x: hidden;
        }

        .rin-bg-grid-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(rgba(102, 0, 5, 0.04) 1px, transparent 1px);
          background-size: 24px 24px;
          z-index: 0;
        }

        .rin-container {
          position: relative;
          z-index: 1;
          max-width: 1080px;
          margin: 0 auto;
          padding: 2rem 2.5rem 6rem 2.5rem;
        }

        .rin-hero {
          margin-bottom: 5rem;
          max-width: 800px;
        }

        .rin-eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #660005;
          opacity: 0.7;
          margin-bottom: 0.75rem;
        }

        .rin-title {
          font-size: 4rem;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        .rin-tagline {
          font-size: 1.5rem;
          font-weight: 600;
          color: #660005;
          opacity: 0.9;
          margin-bottom: 1.5rem;
        }

        .rin-intro {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #660005;
          opacity: 0.85;
        }

        .rin-section {
          margin-bottom: 5rem;
        }

        .rin-section-header {
          margin-bottom: 2rem;
        }

        .rin-sub-eyebrow {
          display: block;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.65;
          margin-bottom: 0.5rem;
        }

        .rin-section-title {
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .rin-story-card {
          background-color: #F2D9DA;
          border: 1px solid rgba(102, 0, 5, 0.15);
          border-radius: 20px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          font-size: 1.125rem;
          line-height: 1.7;
          box-shadow: 0 10px 30px rgba(102, 0, 5, 0.05);
        }

        .rin-capabilities-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .rin-capability-card {
          background-color: #F2D9DA;
          border: 1px solid rgba(102, 0, 5, 0.15);
          border-radius: 16px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .rin-capability-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(102, 0, 5, 0.08);
        }

        .rin-cap-num {
          font-size: 0.85rem;
          opacity: 0.5;
        }

        .rin-cap-title {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .rin-cap-desc {
          font-size: 0.95rem;
          line-height: 1.5;
          opacity: 0.8;
        }

        .rin-portfolio-card {
          background-color: #F2D9DA;
          border: 1px solid rgba(102, 0, 5, 0.15);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(102, 0, 5, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .rin-portfolio-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(102, 0, 5, 0.1);
        }

        .rin-card-image-box {
          position: relative;
          width: 100%;
          height: 380px;
          background: linear-gradient(135deg, #0f2416 0%, #05120a 100%);
          overflow: hidden;
        }

        .rin-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .rin-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(16, 185, 129, 0.3) 0%, transparent 60%);
        }

        .rin-card-watermark {
          position: absolute;
          bottom: 1.5rem;
          right: 2rem;
          font-size: 3.5rem;
          font-weight: 800;
          color: rgba(16, 185, 129, 0.18);
          pointer-events: none;
          user-select: none;
          letter-spacing: 0.05em;
        }

        .rin-card-body {
          padding: 2.25rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .rin-card-content {
          max-width: 600px;
        }

        .rin-card-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .rin-card-desc {
          font-size: 1.1rem;
          line-height: 1.5;
          opacity: 0.85;
        }

        .rin-visit-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #660005;
          color: #FAF4D4;
          padding: 0.9rem 1.75rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
        }

        .rin-visit-btn:hover {
          background-color: #4a0004;
          transform: scale(1.03);
        }

        .rin-visit-btn .arrow {
          font-size: 1.1rem;
        }

        @media (max-width: 900px) {
          .rin-capabilities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .rin-container {
            padding: 1.5rem 1.25rem 4rem 1.25rem;
          }

          .rin-title {
            font-size: 2.75rem;
          }

          .rin-tagline {
            font-size: 1.25rem;
          }

          .rin-intro {
            font-size: 1.1rem;
          }

          .rin-capabilities-grid {
            grid-template-columns: 1fr;
          }

          .rin-card-image-box {
            height: 260px;
          }

          .rin-card-body {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}
