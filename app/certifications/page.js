import certsData from '../../data/certifications.json';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Certifications & Credentials — Dhwani Sagar',
  description: 'Academic degrees, apprenticeships, and credentials of Dhwani Sagar.',
};

export default function CertificationsPage() {
  return (
    <div className="subpage-wrapper">
      <div className="subpage-header">
        <div className="container">
          <span className="eyebrow">ACADEMIC & PROFESSIONAL CREDENTIALS</span>
          <h1 className="subpage-title font-mono">Certifications</h1>
          <p className="subpage-lead">
            Formal degrees, technical apprenticeships, and verified achievements.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="certs-grid">
          {certsData.map((cert) => (
            <div key={cert.id} className="cert-card glass-panel">
              <div className="cert-top">
                <span className="cert-badge font-mono">{cert.badge}</span>
                <span className="cert-year font-mono">{cert.year}</span>
              </div>

              <h2 className="cert-title font-mono">{cert.title}</h2>
              <span className="cert-issuer">{cert.issuer}</span>

              {cert.grade && (
                <div className="grade-tag font-mono">
                  GRADE: {cert.grade}
                </div>
              )}

              <p className="cert-desc">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      <style>{`
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 2rem;
        }

        .cert-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .cert-card:hover {
          transform: translateY(-4px);
          border-color: rgba(204, 255, 0, 0.3);
        }

        .cert-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cert-badge {
          font-size: 0.75rem;
          color: var(--accent-neon);
          letter-spacing: 0.1em;
        }

        .cert-year {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .cert-title {
          font-size: 1.35rem;
          color: var(--text-primary);
        }

        .cert-issuer {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .grade-tag {
          font-size: 0.75rem;
          padding: 0.3rem 0.6rem;
          background: rgba(204, 255, 0, 0.08);
          border: 1px solid rgba(204, 255, 0, 0.2);
          color: var(--accent-neon);
          border-radius: 4px;
          width: fit-content;
        }

        .cert-desc {
          font-size: 0.925rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .certs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
