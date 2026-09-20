'use client';

const TOOLS = [
  { name: 'Python', color: '#3776AB' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'VS Code', color: '#007ACC' },
  { name: 'GitHub', color: '#24292E' },
  { name: 'Notion', color: '#000000' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'Flutter', color: '#02569B' },
  { name: 'Postman', color: '#FF6C37' },
  { name: 'SQL', color: '#00758F' },
  { name: 'Firebase', color: '#FFCA28' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Cursor', color: '#660005' },
  { name: 'Antigravity', color: '#660005' },
  { name: 'Canva', color: '#00C4CC' },
  { name: 'Java', color: '#E76F00' },
  { name: 'Golang', color: '#00ADD8' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Vercel', color: '#660005' }
];

export default function ToolMarquee() {
  // Duplicated array so translateX(-50%) creates a seamless loop
  const marqueeList = [...TOOLS, ...TOOLS];

  return (
    <div className="tool-marquee-wrapper">
      <div className="tool-marquee-track">
        {marqueeList.map((tool, idx) => (
          <div key={idx} className="marquee-badge">
            <span
              className="badge-dot"
              style={{ backgroundColor: tool.color }}
            />
            <span className="badge-text font-mono">{tool.name}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .tool-marquee-wrapper {
          width: 100%;
          overflow: hidden;
          padding: 1rem 0;
          margin-bottom: 2rem;
          position: relative;
          user-select: none;
          /* Subtle edge fading gradient mask */
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .tool-marquee-track {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: max-content;
          will-change: transform;
          animation: marqueeScroll 25s linear infinite;
        }

        .tool-marquee-wrapper:hover .tool-marquee-track {
          animation-play-state: paused;
        }

        .marquee-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1.1rem;
          background: #FAF4D4;
          border: 1px solid rgba(102, 0, 5, 0.2);
          border-radius: 999px;
          white-space: nowrap;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          flex-shrink: 0;
        }

        .marquee-badge:hover {
          border-color: #660005;
          transform: translateY(-2px);
          background: #FFFFFF;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }

        .badge-text {
          font-size: 0.82rem;
          font-weight: 700;
          color: #660005;
          letter-spacing: 0.04em;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tool-marquee-track {
            animation: none;
            overflow-x: auto;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
