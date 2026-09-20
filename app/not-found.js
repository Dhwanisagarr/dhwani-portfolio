'use client';

import Link from 'next/link';
import BackgroundWatermark from '../components/BackgroundWatermark';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="nf-page-wrapper">
      <BackgroundWatermark word="404 — NOT FOUND" color="rgba(102, 0, 5, 0.08)" />
      <div className="b-bg-grid-overlay" aria-hidden="true" />

      <main className="nf-container">
        <div className="nf-card">
          <span className="nf-badge font-mono">ERROR 404</span>
          <h1 className="nf-title font-mono">Page Not Found</h1>
          <p className="nf-message font-sans">
            The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
          </p>

          <div className="nf-actions font-mono">
            <Link href="/" className="nf-btn primary">
              <span>RETURN HOME</span>
              <span>→</span>
            </Link>
            <Link href="/projects" className="nf-btn secondary">
              <span>VIEW PROJECTS</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .nf-page-wrapper {
          position: relative;
          min-height: 100vh;
          background-color: #FAF4D4;
          color: #660005;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 100px;
          overflow-x: hidden;
        }

        .nf-container {
          position: relative;
          z-index: 1;
          max-width: 680px;
          margin: auto;
          padding: 4rem 1.5rem;
          width: 100%;
          box-sizing: border-box;
          text-align: center;
        }

        .nf-card {
          background-color: #F2D9DA;
          border: 1px solid rgba(102, 0, 5, 0.15);
          border-radius: 24px;
          padding: 3.5rem 2.5rem;
          box-shadow: 0 15px 35px rgba(102, 0, 5, 0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }

        .nf-badge {
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background: rgba(102, 0, 5, 0.1);
          padding: 0.4rem 0.9rem;
          border-radius: 50px;
          color: #660005;
        }

        .nf-title {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 700;
          line-height: 1.1;
          margin: 0;
        }

        .nf-message {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.85;
          max-width: 480px;
          margin: 0;
        }

        .nf-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .nf-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.6rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          min-height: 44px;
          transition: all 0.2s ease;
        }

        .nf-btn.primary {
          background-color: #660005;
          color: #FAF4D4;
        }

        .nf-btn.primary:hover {
          background-color: #4a0004;
          transform: translateY(-2px);
        }

        .nf-btn.secondary {
          background-color: transparent;
          color: #660005;
          border: 1px solid rgba(102, 0, 5, 0.3);
        }

        .nf-btn.secondary:hover {
          background-color: rgba(102, 0, 5, 0.06);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
