'use client';

import { useState, useEffect, useRef } from 'react';

export default function BackgroundWatermark({
  word = 'TEXT',
  lines,
  color = 'rgba(102, 0, 5, 0.065)'
}) {
  const containerRef = useRef(null);
  const [numRows, setNumRows] = useState(5);

  const textString = (() => {
    if (Array.isArray(lines) && lines.length > 0) {
      return lines.join(' ');
    }
    if (typeof word === 'string') {
      return word.replace(/[\/&]/g, ' ').trim().toUpperCase();
    }
    return 'TEXT';
  })();

  // Stagger / Scatter configurations per row
  // Defines horizontal offsets (translateX percentage) and generous word gaps for clean, collision-free wallpaper layout
  const rowConfigs = [
    { offsetPercent: -15, gapRem: 14, paddingTop: '1.0rem' },
    { offsetPercent: 25, gapRem: 18, paddingTop: '2.5rem' },
    { offsetPercent: -30, gapRem: 15, paddingTop: '1.2rem' },
    { offsetPercent: 12, gapRem: 16, paddingTop: '3.0rem' },
    { offsetPercent: -20, gapRem: 17, paddingTop: '1.8rem' },
  ];

  useEffect(() => {
    const updateRows = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      const h = parent
        ? Math.max(parent.clientHeight, parent.scrollHeight, containerRef.current.clientHeight, 800)
        : Math.max(containerRef.current.clientHeight, 800);
      
      // Spacious rows (approx 1 row per 300px height, 3 to 6 rows max to avoid clutter & collisions)
      const calculatedRows = Math.max(3, Math.min(6, Math.floor(h / 300)));
      setNumRows(calculatedRows);
    };

    updateRows();
    const observer = new ResizeObserver(updateRows);
    if (containerRef.current) observer.observe(containerRef.current);
    if (containerRef.current?.parentElement) observer.observe(containerRef.current.parentElement);
    window.addEventListener('resize', updateRows);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateRows);
    };
  }, []);

  const activeRows = Array.from({ length: numRows }, (_, i) => ({
    ...rowConfigs[i % rowConfigs.length],
    id: i
  }));

  return (
    <div ref={containerRef} className="bg-typography-scatter font-mono" aria-hidden="true">
      {activeRows.map((cfg, rIdx) => (
        <div
          key={cfg.id}
          className="scatter-row"
          style={{
            transform: `translateX(${cfg.offsetPercent}%)`,
            gap: `${cfg.gapRem}rem`,
            paddingTop: cfg.paddingTop,
          }}
        >
          {/* Repeat text string (4 copies per row) for clean, spacious wallpaper look without collision */}
          {[...Array(4)].map((_, cIdx) => (
            <span key={cIdx} className="scatter-word">
              {textString}
            </span>
          ))}
        </div>
      ))}

      <style jsx>{`
        .bg-typography-scatter {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          color: ${color};
          pointer-events: none;
          user-select: none;
          z-index: 1;
          overflow: hidden;
          padding: 3rem 0;
          box-sizing: border-box;
          width: 100%;
        }

        .scatter-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          white-space: nowrap;
          width: max-content;
          will-change: transform;
        }

        .scatter-word {
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
          font-size: clamp(3.2rem, 6.5vw, 7.5rem);
          flex-shrink: 0;
          opacity: 0.85;
        }

        @media (max-width: 768px) {
          .scatter-word {
            font-size: clamp(2.5rem, 10vw, 4.5rem);
          }
        }
      `}</style>
    </div>
  );
}
