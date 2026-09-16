'use client';

import BackgroundWatermark from './BackgroundWatermark';

export default function HomeWorkEduSection() {
  const workItems = [
    {
      company: '4RinLabs Pvt. Ltd.',
      role: 'Freelancer',
      date: 'Present'
    },
    {
      company: 'Fyers Securities Pvt. Ltd.',
      role: 'Apprentice',
      date: 'Jul 25 – Dec 25'
    },
    {
      company: 'Zidio Developments',
      role: 'Developer Intern',
      date: 'Feb 25 – May 25'
    }
  ];

  return (
    <section id="experience" className="work-edu-section" data-color="#FAF4D4">
      {/* Giant Tiled Background Typography Watermark */}
      <BackgroundWatermark word="EXPERIENCE" color="rgba(169, 0, 18, 0.065)" />

      <div className="work-edu-container">
        {/* SECTION HEADER */}
        <div className="work-edu-header">
          <div className="eyebrow-row font-mono">
            <span className="eyebrow-dot" />
            <span className="eyebrow">EXPERIENCE & EDUCATION</span>
          </div>
          <h2 className="section-title font-mono">Work & Education</h2>
          <p className="section-subtitle font-sans">
            “My professional journey, roles held, and academic foundation.”
          </p>
        </div>

        <div className="work-edu-content">
          <div className="work-edu-grid">
            {/* LEFT COLUMN: WORK EXPERIENCE */}
            <div className="column work-column">
              <h3 className="col-title font-mono">Work Experience</h3>

              <div className="exp-list">
                {workItems.map((item, idx) => (
                  <div key={idx} className="exp-row">
                    <div className="exp-left">
                      <span className="company-name font-sans">{item.company}</span>
                      <span className="role-name font-sans">{item.role}</span>
                    </div>
                    <div className="exp-right font-mono">
                      <span className="date-badge">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VERTICAL DIVIDER */}
            <div className="vertical-divider-wrap" aria-hidden="true">
              <div className="vertical-divider" />
            </div>

            {/* RIGHT COLUMN: EDUCATION */}
            <div className="column edu-column">
              <h3 className="col-title font-mono">Education</h3>

              <div className="edu-card">
                <h4 className="degree-title font-sans">
                  B.E. in Computer Science and Engineering (Honours) 2025
                </h4>
                <p className="institution-name font-sans">
                  Mangalore Institute of Technology and Engineering (MITE)
                </p>
                <p className="cgpa-text font-sans">
                  CGPA: 8.12
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .work-edu-section {
          position: relative;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: transparent;
          padding: 5.5rem 0;
          box-sizing: border-box;
          color: #CC2027;
          width: 100%;
          overflow: hidden;
        }

        .work-edu-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 3.5rem;
        }

        .work-edu-header {
          display: flex;
          flex-direction: column;
          margin-bottom: 2.75rem;
        }

        .eyebrow-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.4rem;
        }

        .eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #CC2027;
          display: inline-block;
        }

        .eyebrow {
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          color: #CC2027;
          font-weight: 600;
        }

        .section-title {
          font-size: clamp(2.4rem, 4.2vw, 3.8rem);
          font-weight: 600;
          color: #CC2027;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          color: #B91C23;
          max-width: 600px;
          line-height: 1.5;
          font-style: italic;
        }

        .work-edu-content {
          position: relative;
          z-index: 2;
        }

        .work-edu-grid {
          display: grid;
          grid-template-columns: 1.05fr auto 0.95fr;
          gap: 3.5rem;
          align-items: start;
        }

        .column {
          display: flex;
          flex-direction: column;
        }

        .col-title {
          font-size: clamp(2.6rem, 4.2vw, 4rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #CC2027;
          text-transform: none;
          margin-bottom: 2.75rem;
          line-height: 1.1;
          white-space: nowrap;
        }

        /* Work Experience Entry Rows */
        .exp-list {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .exp-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .exp-left {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .company-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #CC2027;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }

        .role-name {
          font-size: 0.98rem;
          color: #D5242B;
          font-weight: 500;
        }

        .exp-right {
          flex-shrink: 0;
          padding-top: 0.2rem;
        }

        .date-badge {
          font-size: 0.95rem;
          color: #B91C23;
          font-weight: 600;
          white-space: nowrap;
        }

        /* Vertical Divider */
        .vertical-divider-wrap {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          height: 100%;
          padding-top: 5rem;
        }

        .vertical-divider {
          width: 1px;
          height: 220px;
          background: rgba(204, 32, 39, 0.25);
        }

        /* Education Card */
        .edu-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .degree-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #CC2027;
          line-height: 1.4;
          letter-spacing: -0.01em;
          max-width: 480px;
        }

        .institution-name {
          font-size: 0.98rem;
          color: #D5242B;
          line-height: 1.45;
          font-weight: 500;
        }

        .cgpa-text {
          font-size: 0.95rem;
          color: #B91C23;
          margin-top: -0.5rem;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .work-edu-container {
            padding: 0 2.5rem;
          }
        }

        @media (max-width: 900px) {
          .work-edu-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .vertical-divider-wrap {
            display: none;
          }

          .col-title {
            margin-bottom: 1.75rem;
            white-space: normal;
          }
        }

        @media (max-width: 640px) {
          .work-edu-container {
            padding: 0 1.5rem;
          }

          .exp-row {
            flex-direction: column;
            gap: 0.25rem;
          }
        }
      `}</style>
    </section>
  );
}
