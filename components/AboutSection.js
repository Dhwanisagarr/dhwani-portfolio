'use client';

import Link from 'next/link';
import GalleryStack from './GalleryStack';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">
          {/* Left Column: Heading, Copy & Action Buttons */}
          <div className="about-left">
            <span className="about-eyebrow font-mono">A Little About Me</span>

            <h2 className="about-heading font-mono">
              Oh, hi.
            </h2>

            <h3 className="about-subheading font-mono">
              Nice to meet you. I'm Dhwani Sagar.
            </h3>

            <div className="about-copy font-sans">
              <p>
                I'm someone who gets curious about people, problems, and how things work. That curiosity somehow took me through technology, design, and building things—and eventually made me interested in product.
              </p>

              <p>
                I like exploring ideas, figuring things out, and thinking about how something can be made better for the people using it.
              </p>

              <p>
                When I'm not doing that, I'm probably reading, painting, or going down some completely random internet rabbit hole.
              </p>
            </div>

            <div className="about-ctas">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta btn-cta-yellow font-sans"
              >
                <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FAF4D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

          {/* Right Column: Framer Gallery Stack Component */}
          <div className="about-right">
            <GalleryStack />
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          position: relative;
          background-color: #F2D9DA;
          padding: 6.5rem 0;
          color: #660005;
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

        .about-eyebrow {
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          color: #660005;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }

        .about-heading {
          font-size: clamp(3rem, 5vw, 4.5rem);
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 0.75rem;
          color: #660005;
          font-weight: 700;
        }

        .about-subheading {
          font-size: clamp(1.4rem, 2.2vw, 2.1rem);
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin-bottom: 1.75rem;
          color: #660005;
          font-weight: 600;
        }

        .about-copy {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          line-height: 1.65;
          color: #660005;
        }

        .about-copy p {
          margin: 0;
        }

        .scroll-journey-hint {
          font-size: 0.88rem;
          color: #660005;
          margin-top: 1.75rem;
          letter-spacing: 0.05em;
          opacity: 0.85;
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
          background-color: #660005 !important;
          color: #FAF4D4 !important;
          border: 1px solid #660005 !important;
        }

        .btn-cta-yellow:hover, .btn-cta-yellow:focus, .btn-cta-yellow:active, .btn-cta-yellow:visited {
          background-color: #660005 !important;
          color: #FAF4D4 !important;
          text-decoration: none !important;
          transform: translateY(-2px);
        }

        .btn-cta-charcoal {
          background-color: #FAF4D4 !important;
          color: #660005 !important;
          border: 1px solid #660005 !important;
        }

        .btn-cta-charcoal:hover, .btn-cta-charcoal:focus, .btn-cta-charcoal:active, .btn-cta-charcoal:visited {
          background-color: #E3BDBE !important;
          color: #660005 !important;
          border-color: #660005 !important;
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
          object-position: center 25%;
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
