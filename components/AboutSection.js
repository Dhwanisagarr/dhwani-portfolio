'use client';

import Link from 'next/link';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">
          {/* Left Column: Heading, Copy & Action Buttons */}
          <div className="about-left">
            <h2 className="about-heading font-mono">
              <span className="heading-bright">Think. Design.</span>
              <span className="heading-muted">Build.</span>
            </h2>

            <div className="about-copy font-sans">
              <p>
                Hey! I'm Dhwani Sagar someone who enjoys figuring out why things work, why they don't, and how they could work better. I'm interested in the space where product thinking, design, and technology meet.
              </p>

              <p>
                I like starting with a problem, understanding the people around it, exploring possible solutions, and then bringing ideas to life whether that means shaping the product, designing the experience, or building it.
              </p>

              <p>
                Right now, I'm learning, experimenting, and looking for opportunities where I can grow through real products and real problems.
              </p>
            </div>

            <div className="about-ctas">
              <a
                href="/resume.pdf"
                download="Dhwani_Sagar_Resume.pdf"
                className="btn-cta btn-cta-yellow font-sans"
              >
                <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Resume</span>
              </a>

              <Link href="/contact" className="btn-cta btn-cta-charcoal font-sans">
                <span>Get in Touch</span>
                <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Personal Photo */}
          <div className="about-right">
            <div className="photo-wrapper">
              <img
                src="/dhwani_portrait.jpg"
                alt="Dhwani Sagar"
                className="portrait-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          position: relative;
          background-color: #060606;
          padding: 6.5rem 0;
          color: #ffffff;
          width: 100%;
        }

        .about-container {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 3.5rem;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 4.5rem;
          align-items: center;
        }

        .about-left {
          display: flex;
          flex-direction: column;
          max-width: 580px;
        }

        .about-heading {
          font-size: clamp(2.8rem, 4.5vw, 4.2rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 2.25rem;
          display: flex;
          flex-direction: column;
        }

        .heading-bright {
          color: #ffffff;
          font-weight: 500;
        }

        .heading-muted {
          color: #686868;
          font-weight: 500;
        }

        .about-copy {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          line-height: 1.65;
          color: #d1d1d6;
        }

        .about-copy p {
          margin: 0;
        }

        .about-ctas {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          margin-top: 2.5rem;
        }

        .btn-cta {
          height: 48px;
          min-height: 48px;
          max-height: 48px;
          width: 215px;
          min-width: 215px;
          padding: 0 1.25rem;
          border-radius: 4px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.925rem;
          text-decoration: none !important;
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.6rem;
          white-space: nowrap !important;
          box-sizing: border-box !important;
          cursor: pointer;
          transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
        }

        .btn-cta-yellow {
          background-color: #efff00 !important;
          color: #000000 !important;
          border: 1px solid #efff00 !important;
        }

        .btn-cta-yellow:hover, .btn-cta-yellow:focus, .btn-cta-yellow:active, .btn-cta-yellow:visited {
          background-color: #f7ff40 !important;
          color: #000000 !important;
          text-decoration: none !important;
          transform: translateY(-2px);
        }

        .btn-cta-charcoal {
          background-color: #1a1a1a !important;
          color: #ffffff !important;
          border: 1px solid #efff00 !important;
        }

        .btn-cta-charcoal:hover, .btn-cta-charcoal:focus, .btn-cta-charcoal:active, .btn-cta-charcoal:visited {
          background-color: #262626 !important;
          color: #ffffff !important;
          border-color: #efff00 !important;
          text-decoration: none !important;
          transform: translateY(-2px);
        }

        .btn-icon {
          flex-shrink: 0;
          display: block;
        }

        .about-right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .photo-wrapper {
          position: relative;
          width: 100%;
          max-width: 490px;
          height: 430px;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .portrait-img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 18%;
          border-radius: 4px;
        }

        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .about-left {
            max-width: 100%;
          }
          .about-right {
            justify-content: center;
          }
          .photo-wrapper {
            max-width: 100%;
          }
        }

        @media (max-width: 640px) {
          .about-container {
            padding: 0 1.5rem;
          }
          .about-ctas {
            flex-direction: column;
            align-items: stretch;
            gap: 0.85rem;
          }
          .btn-cta {
            width: 100% !important;
            min-width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
