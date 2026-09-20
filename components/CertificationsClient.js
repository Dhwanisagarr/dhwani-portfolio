'use client';

import { useState, useEffect } from 'react';
import certsData from '../data/certifications.json';
import Footer from './Footer';
import BackgroundWatermark from './BackgroundWatermark';

export default function CertificationsClient() {
  const [activeCert, setActiveCert] = useState(null);

  // Close lightbox modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCardClick = (cert, e) => {
    e.preventDefault();
    setActiveCert(cert);
  };

  return (
    <div className="ct-page-wrapper">
      <BackgroundWatermark word="CERTIFICATIONS" color="rgba(102, 0, 5, 0.095)" />
      <div className="b-bg-grid-overlay" aria-hidden="true" />

      <div className="ct-page-container">
        {/* CENTERED HERO HEADER */}
        <header className="ct-hero-header">
          <div className="ct-hero-content">
            <span className="ct-eyebrow font-mono">ACADEMIC & PROFESSIONAL CREDENTIALS</span>
            <h1 className="ct-hero-title font-mono">Certifications</h1>
            <p className="ct-hero-lead font-sans">
              Verified credentials, certificates, and academic achievements earned through formal study, industry programs, and examinations. Click any credential to view details on screen.
            </p>
          </div>
        </header>

        {/* 2-COLUMN CERTIFICATIONS GRID */}
        <div className="ct-certs-grid">
          {certsData.map((cert) => {
            const isExternalVerify = cert.verifyUrl && cert.verifyUrl !== '#';

            return (
              <article
                key={cert.id}
                className="ct-cert-card"
                onClick={(e) => handleCardClick(cert, e)}
                style={{ cursor: 'pointer' }}
              >
                {/* LEFT IMAGE / BADGE VISUAL CANVAS */}
                <div
                  className="ct-card-media"
                  style={{ background: cert.bg || 'linear-gradient(135deg, #2b1115 0%, #0d0406 100%)' }}
                >
                  {cert.imageUrl ? (
                    <>
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="ct-media-img"
                        loading="lazy"
                      />
                      <div className="ct-media-hover-overlay">
                        <span>VIEW CERTIFICATE ↗</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="ct-media-glow" aria-hidden="true" />
                      <div className="ct-media-watermark font-mono" aria-hidden="true">
                        {cert.badge || 'CERT'}
                      </div>

                      <div className="ct-media-emblem">
                        <svg width="56" height="44" viewBox="0 0 56 44" fill="none">
                          <rect x="8" y="8" width="40" height="28" rx="5" stroke="#FAF4D4" strokeWidth="2.5" fill="none"/>
                          <path d="M18 18 v10 M25 22 v6 M25 24 c0-3 5-3 5 0 v4" stroke="#E3BDBE" strokeWidth="2.5" strokeLinecap="round"/>
                          <circle cx="18" cy="14" r="1.5" fill="#E3BDBE"/>
                        </svg>
                      </div>
                    </>
                  )}
                </div>

                {/* RIGHT CONTENT COLUMN */}
                <div className="ct-card-body font-mono">
                  <div>
                    <div className="ct-card-meta">
                      <span>{cert.category}</span>
                      <span className="ct-meta-sep">•</span>
                      <span>{cert.year}</span>
                    </div>

                    <h2 className="ct-card-title">{cert.title}</h2>
                    <p className="ct-card-desc font-sans">Issued by {cert.issuer}</p>

                    {cert.description && (
                      <p className="ct-card-desc font-sans" style={{ fontSize: '0.88rem', opacity: 0.9 }}>
                        {cert.description}
                      </p>
                    )}
                  </div>

                  <div className="ct-card-cta-row">
                    <button
                      type="button"
                      className="ct-card-read-btn"
                      onClick={(e) => handleCardClick(cert, e)}
                    >
                      <span>View Details</span>
                      <span className="ct-card-arrow">↗</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* IN-SCREEN CERTIFICATE LIGHTBOX POP-UP MODAL */}
      {activeCert && (
        <div className="ct-lightbox-backdrop" onClick={() => setActiveCert(null)}>
          <div className="ct-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ct-modal-header font-mono">
              <div className="ct-modal-title-block">
                <span className="ct-modal-badge">{activeCert.badge}</span>
                <h2 className="ct-modal-title">{activeCert.title}</h2>
                <p className="ct-modal-subtitle font-sans">
                  Issued by {activeCert.issuer} • {activeCert.year}
                </p>
              </div>

              <button
                className="ct-modal-close-btn"
                onClick={() => setActiveCert(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="ct-modal-body">
              {activeCert.imageUrl ? (
                <img
                  src={activeCert.imageUrl}
                  alt={activeCert.title}
                  className="ct-lightbox-image"
                />
              ) : (
                <div className="ct-modal-no-img font-mono">
                  <p>Certificate document preview for {activeCert.title}.</p>
                </div>
              )}
            </div>

            <div className="ct-modal-footer font-mono">
              <span className="ct-modal-meta">
                ID: {activeCert.certId || activeCert.id}
              </span>

              <div className="ct-modal-actions">
                <button
                  type="button"
                  className="ct-modal-dismiss-btn"
                  onClick={() => setActiveCert(null)}
                >
                  Close
                </button>

                {activeCert.verifyUrl && activeCert.verifyUrl !== '#' && (
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ct-modal-verify-link"
                  >
                    <span>Verify Online</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
