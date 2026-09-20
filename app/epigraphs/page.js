'use client';

import { useState } from 'react';
import epigraphsData from '../../data/epigraphs.json';
import Footer from '../../components/Footer';
import BackgroundWatermark from '../../components/BackgroundWatermark';

export default function EpigraphsPage() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, quote, author) => {
    const textToCopy = `“${quote}” — ${author}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="ep-page-wrapper">
      <BackgroundWatermark word="EPIGRAPHS" color="rgba(102, 0, 5, 0.095)" />
      <div className="b-bg-grid-overlay" aria-hidden="true" />

      <div className="ep-page-container">
        {/* EDITORIAL HERO HEADER WITH OVERSIZED BACKGROUND WORD */}
        <header className="ep-hero-header">
          <div className="ep-hero-content">
            <span className="ep-eyebrow font-mono">EPIGRAPHS — 001</span>
            <h1 className="ep-hero-title font-mono">EPIGRAPHS</h1>
            <p className="ep-hero-lead font-sans">
              Quotes, passages, and stanzas that caught my eye. A personal archive of lines and thoughts collected over time.
            </p>
          </div>
        </header>

        {/* METADATA ROW */}
        <div className="ep-meta-row font-mono">
          <span>{epigraphsData.length} EPIGRAPHS</span>
        </div>

        {/* EDITORIAL EPIGRAPH LIST */}
        <div className="ep-list">
          {epigraphsData.map((item, index) => {
            const numStr = String(index + 1).padStart(3, '0');
            const isCopied = copiedId === item.id;
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
              `"${item.quote}" ${item.author}`
            )}`;

            return (
              <article key={item.id} className="ep-entry">
                {/* LEFT METADATA COLUMN */}
                <div className="ep-entry-meta font-mono">
                  <span className="ep-entry-num">{numStr}</span>
                  <span className="ep-entry-type">{item.type || 'QUOTE'}</span>
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="ep-entry-content">
                  <blockquote className="ep-quote font-sans">
                    “{item.quote}”
                  </blockquote>

                  <div className="ep-author-row">
                    <span className="ep-author font-sans">— {item.author}</span>
                    {item.source && (
                      <span className="ep-source font-sans">, {item.source}</span>
                    )}
                  </div>

                  {/* UTILITY ACTIONS */}
                  <div className="ep-actions font-mono">
                    <button
                      className={`ep-action-btn ${isCopied ? 'copied' : ''}`}
                      onClick={() => handleCopy(item.id, item.quote, item.author)}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      <span>{isCopied ? 'COPIED!' : 'COPY'}</span>
                    </button>

                    <a
                      href={searchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ep-action-link"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      <span>SEARCH</span>
                    </a>
                  </div>
                </div>

                <div className="ep-divider" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
