'use client';

import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        {/* SECTION HEADER */}
        <div className="section-header text-center">
          <div className="eyebrow-pill font-mono">
            <span>EXPLORATION</span>
          </div>
          <h2 className="section-main-title font-mono">Continue The Journey</h2>
          <p className="section-main-desc font-sans">
            From case studies to daily logs — discover writing, guest notes, reading lists, and curated epigraphs.
          </p>
        </div>

        {/* COMPOSITION: 1 LARGE FEATURED BOX (LEFT 40%) + 4 DISTINCT BOXES IN 2x2 GRID (RIGHT 60%) */}
        <div className="curious-composition">
          {/* BOX 1 (LEFT TALL FEATURED CARD) */}
          <div className="featured-tall-card">
            <div className="card-top-bar">
              <span className="badge-tag font-mono">CONTINUED</span>
              <div className="hero-spark-circle font-mono" aria-hidden="true">
                <span>✦</span>
              </div>
            </div>

            <div className="card-middle">
              <h3 className="hero-heading font-mono">Still Curious?</h3>
              <p className="hero-text font-sans">
                There is more to explore beyond the home page. Dive into writing, guest notes, reading logs, or curated epigraphs.
              </p>
            </div>

            <div className="card-bottom">
              <Link href="/projects" className="action-pill-btn font-mono">
                <span>Explore All Pathways</span>
                <span className="pill-arrow">→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT: 2x2 GRID OF 4 DISTINCT VISIBLE CARDS */}
          <div className="right-2x2-grid">
            {/* BOX 2: PROJECT CASE STUDIES */}
            <Link href="/projects" className="grid-card">
              <div className="card-top-bar">
                <div className="card-icon-box">
                  <span className="icon-symbol">⚡</span>
                </div>
                <div className="card-arrow-circle font-mono">
                  <span>↗</span>
                </div>
              </div>
              <div className="grid-card-content">
                <h4 className="grid-card-title font-mono">Project Case Studies</h4>
                <p className="grid-card-desc font-sans">
                  In-depth breakdowns of product thinking, design, and build decisions.
                </p>
              </div>
            </Link>

            {/* BOX 3: GUEST NOTES */}
            <Link href="/guest-notes" className="grid-card">
              <div className="card-top-bar">
                <div className="card-icon-box">
                  <span className="icon-symbol">✎</span>
                </div>
                <div className="card-arrow-circle font-mono">
                  <span>↗</span>
                </div>
              </div>
              <div className="grid-card-content">
                <h4 className="grid-card-title font-mono">Guest Notes</h4>
                <p className="grid-card-desc font-sans">
                  Read messages left by visitors or leave your own note.
                </p>
              </div>
            </Link>

            {/* BOX 4: WRITING & BLOGS */}
            <Link href="/blogs" className="grid-card">
              <div className="card-top-bar">
                <div className="card-icon-box">
                  <span className="icon-symbol">✦</span>
                </div>
                <div className="card-arrow-circle font-mono">
                  <span>↗</span>
                </div>
              </div>
              <div className="grid-card-content">
                <h4 className="grid-card-title font-mono">Writing & Blogs</h4>
                <p className="grid-card-desc font-sans">
                  Thoughts, experiments, and things I'm figuring out.
                </p>
              </div>
            </Link>

            {/* BOX 5: BOOKS & EPIGRAPHS */}
            <Link href="/books" className="grid-card">
              <div className="card-top-bar">
                <div className="card-icon-box">
                  <span className="icon-symbol">📖</span>
                </div>
                <div className="card-arrow-circle font-mono">
                  <span>↗</span>
                </div>
              </div>
              <div className="grid-card-content">
                <h4 className="grid-card-title font-mono">Books & Epigraphs</h4>
                <p className="grid-card-desc font-sans">
                  Books, ideas, and curated lines that stay with me.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          background-color: #060606;
          padding: 8rem 0 10rem 0;
          color: #ffffff;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          width: 100%;
        }

        .cta-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3.5rem;
        }

        /* Top Header */
        .section-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 4rem;
        }

        .eyebrow-pill {
          font-size: 0.75rem;
          letter-spacing: 0.16em;
          color: #efff00;
          padding: 0.35rem 0.9rem;
          background: rgba(239, 255, 0, 0.08);
          border: 1px solid rgba(239, 255, 0, 0.25);
          border-radius: 100px;
          margin-bottom: 1.25rem;
        }

        .section-main-title {
          font-size: clamp(2.4rem, 4.2vw, 3.8rem);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 0.85rem;
        }

        .section-main-desc {
          font-size: clamp(1rem, 1.2vw, 1.12rem);
          color: #a0a0a5;
          max-width: 580px;
          line-height: 1.6;
        }

        /* Composition Layout: 40% Left Tall Box + 60% Right 2x2 Grid Boxes */
        .curious-composition {
          display: grid;
          grid-template-columns: 0.95fr 1.35fr;
          gap: 1.75rem;
          width: 100%;
          align-items: stretch;
        }

        /* BOX 1: Left Featured Tall Card (40% Width) */
        .featured-tall-card {
          background-color: #121218;
          background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 20px;
          padding: 2.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          min-height: 480px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .featured-tall-card:hover {
          border-color: #efff00;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 255, 0, 0.08);
        }

        .badge-tag {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          color: #efff00;
          padding: 0.35rem 0.8rem;
          background: rgba(239, 255, 0, 0.1);
          border: 1px solid rgba(239, 255, 0, 0.3);
          border-radius: 6px;
        }

        .hero-spark-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #efff00;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          box-shadow: 0 0 15px rgba(239, 255, 0, 0.3);
        }

        .hero-heading {
          font-size: clamp(2.2rem, 3.5vw, 3.2rem);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 1rem;
        }

        .hero-text {
          font-size: 1rem;
          color: #a0a0a5;
          line-height: 1.65;
        }

        .action-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.6rem;
          background: #efff00;
          border-radius: 100px;
          color: #000000;
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 20px rgba(239, 255, 0, 0.25);
        }

        .action-pill-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(239, 255, 0, 0.45);
          background: #ffffff;
        }

        .pill-arrow {
          font-size: 1.1rem;
          transition: transform 0.25s ease;
        }

        .action-pill-btn:hover .pill-arrow {
          transform: translateX(4px);
        }

        /* Right 2x2 Grid (60% Width) */
        .right-2x2-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.75rem;
        }

        /* BOXES 2-5: Grid Cards */
        .grid-card {
          background: #121218;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 20px;
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-decoration: none;
          color: inherit;
          min-height: 230px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .grid-card:hover {
          transform: translateY(-6px);
          border-color: #efff00;
          background: #181822;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 255, 0, 0.08);
        }

        .card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 1.75rem;
        }

        .card-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .icon-symbol {
          font-size: 1.15rem;
          color: #efff00;
        }

        .grid-card:hover .card-icon-box {
          background: #efff00;
          border-color: #efff00;
        }

        .grid-card:hover .icon-symbol {
          color: #000000;
        }

        .card-arrow-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a0a0a5;
          font-size: 1.05rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .grid-card:hover .card-arrow-circle {
          background: #efff00;
          border-color: #efff00;
          color: #000000;
          transform: translate(2px, -2px);
        }

        .grid-card-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .grid-card-title {
          font-size: clamp(1.25rem, 1.8vw, 1.6rem);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.2;
          transition: color 0.25s ease;
        }

        .grid-card:hover .grid-card-title {
          color: #efff00;
        }

        .grid-card-desc {
          font-size: 0.92rem;
          color: #a0a0a5;
          line-height: 1.55;
        }

        @media (max-width: 992px) {
          .cta-container {
            padding: 0 2rem;
          }

          .curious-composition {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .featured-tall-card {
            min-height: 380px;
          }

          .right-2x2-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        @media (max-width: 640px) {
          .cta-container {
            padding: 0 1.5rem;
          }

          .featured-tall-card,
          .grid-card {
            padding: 1.75rem;
          }
        }
      `}</style>
    </section>
  );
}


