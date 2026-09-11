import epigraphsData from '../../data/epigraphs.json';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Epigraphs & Quotes — Dhwani Sagar',
  description: 'Curated quotes and epigraphs that shape Dhwani Sagar’s design and technical philosophy.',
};

export default function EpigraphsPage() {
  return (
    <div className="subpage-wrapper">
      <div className="subpage-header">
        <div className="container">
          <span className="eyebrow">PHILOSOPHY & IDEAS</span>
          <h1 className="subpage-title font-mono">Epigraphs</h1>
          <p className="subpage-lead">
            Fragmented quotes, principles, and principles that serve as guiding epigraphs for building digital products.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="epigraphs-grid">
          {epigraphsData.map((item, idx) => (
            <div key={item.id} className="epigraph-card glass-panel">
              <div className="card-num font-mono">0{idx + 1}</div>
              <blockquote className="quote-text font-mono">
                “{item.quote}”
              </blockquote>
              <div className="quote-source">
                <span className="author">— {item.author}</span>
                <span className="source-title font-mono">{item.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      <style>{`
        .epigraphs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 2.5rem;
        }

        .epigraph-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .epigraph-card:hover {
          transform: translateY(-3px);
          border-color: rgba(204, 255, 0, 0.3);
        }

        .card-num {
          font-size: 0.8rem;
          color: var(--accent-neon);
        }

        .quote-text {
          font-size: 1.35rem;
          line-height: 1.6;
          color: var(--text-primary);
          font-weight: 400;
        }

        .quote-source {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
          margin-top: auto;
        }

        .author {
          font-size: 1.05rem;
          color: var(--accent-neon);
          font-weight: 500;
        }

        .source-title {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .epigraphs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
