'use client';

export default function HeroSection() {
  return (
    <section className="hero-container">
      {/* Background Portrait & Vignette Overlays */}
      <div className="hero-portrait-bg" />
      <div className="hero-vignette-overlay" />
      <div className="hero-grain-overlay" />

      <div className="hero-center-content">
        <div className="eyebrow-text">
          CRAFTING BEAUTIFUL DIGITAL EXPERIENCES
        </div>

        <div className="title-block">
          <h1 className="hero-title">
            <span className="title-line">DHWANI</span>
            <span className="title-line">SAGAR</span>
          </h1>

          <div className="status-label">
            OPEN TO WORK
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #000000;
          overflow: hidden;
        }

        .hero-portrait-bg {
          position: absolute;
          inset: 0;
          background-image: url('/hero_portrait.png');
          background-size: cover;
          background-position: center 20%;
          filter: grayscale(100%) contrast(120%) brightness(0.85);
          opacity: 0.95;
          z-index: 1;
        }

        .hero-vignette-overlay {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.7) 65%, rgba(0, 0, 0, 0.95) 100%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.9) 100%);
          z-index: 2;
          pointer-events: none;
        }

        .hero-grain-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0);
          background-size: 4px 4px;
          z-index: 3;
          pointer-events: none;
        }

        .hero-center-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 1.5rem;
        }

        .eyebrow-text {
          font-family: var(--font-mono);
          font-size: clamp(0.7rem, 1.4vw, 0.95rem);
          font-weight: 500;
          letter-spacing: 0.28em;
          color: #e6ff00;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
        }

        .title-block {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .hero-title {
          font-family: var(--font-display), 'Dela Gothic One', 'Syne', 'Impact', sans-serif;
          font-size: clamp(3.8rem, 13.5vw, 12.5rem);
          font-weight: 900;
          line-height: 0.82;
          letter-spacing: -0.02em;
          color: #e6ff00;
          text-transform: uppercase;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0;
          padding: 0;
          text-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
        }

        .title-line {
          display: block;
          white-space: nowrap;
        }

        .status-label {
          align-self: flex-end;
          font-family: var(--font-mono);
          font-size: clamp(0.65rem, 1.1vw, 0.85rem);
          font-weight: 500;
          letter-spacing: 0.22em;
          color: #e6ff00;
          text-transform: uppercase;
          margin-top: 0.65rem;
          padding-right: 0.2rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95);
        }

        @media (max-width: 768px) {
          .eyebrow-text {
            letter-spacing: 0.18em;
            margin-bottom: 0.5rem;
          }
          .hero-title {
            line-height: 0.85;
          }
          .status-label {
            letter-spacing: 0.15em;
            margin-top: 0.4rem;
          }
        }
      `}</style>
    </section>
  );
}
