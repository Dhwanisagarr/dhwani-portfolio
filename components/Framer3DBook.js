'use client';

export default function Framer3DBook({ title, author, coverUrl, coverBg, coverTag }) {
  return (
    <div className="framer-3d-book-container">
      <div className="framer-3d-book-wrapper">
        {/* INNER PAPER LAYER (Revealed when cover rotates open on hover) */}
        <div className="framer-3d-book-paper">
          <div className="framer-3d-paper-spine" aria-hidden="true" />
          <div className="framer-3d-paper-content font-mono">
            <p className="framer-3d-paper-title">{title}</p>
            <p className="framer-3d-paper-author">{author}</p>
          </div>
        </div>

        {/* FRONT COVER LAYER (Rotates open -72deg on hover) */}
        <div
          className="framer-3d-book-cover font-mono"
          style={{ background: coverBg || 'linear-gradient(135deg, #1e1422 0%, #0c060e 100%)' }}
        >
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={title}
              className="framer-3d-cover-img"
              loading="lazy"
            />
          ) : (
            <div className="framer-3d-fallback-cover">
              <span className="framer-3d-fallback-tag">{coverTag || 'BOOK'}</span>
              <span className="framer-3d-fallback-title">{title}</span>
            </div>
          )}

          {/* Realistic spine reflection and surface light */}
          <div className="framer-3d-spine-reflection" aria-hidden="true" />
          <div className="framer-3d-surface-light" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
