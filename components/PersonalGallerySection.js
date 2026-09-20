'use client';

const GALLERY_ITEMS = [
  {
    id: '01',
    label: 'BOOKS',
    caption: 'Recent reads, design philosophy & notes',
    aspect: '4/5',
    gradient: 'linear-gradient(135deg, #FAF4D4 0%, #F5E8BF 100%)',
    icon: '📖'
  },
  {
    id: '02',
    label: 'LITTLE THINGS',
    caption: 'Desk setup, coffee cups & workspace details',
    aspect: '4/3',
    gradient: 'linear-gradient(135deg, #FAF4D4 0%, #F8EFE0 100%)',
    icon: '✨'
  },
  {
    id: '03',
    label: 'PLACES',
    caption: 'Travel snapshots, cities & quiet corners',
    aspect: '3/4',
    gradient: 'linear-gradient(135deg, #FAF4D4 0%, #EFE1B3 100%)',
    icon: '📍'
  },
  {
    id: '04',
    label: 'MOMENTS',
    caption: 'Weekend coding sessions & candid captures',
    aspect: '4/5',
    gradient: 'linear-gradient(135deg, #F5E8BF 0%, #FAF4D4 100%)',
    icon: '📸'
  },
  {
    id: '05',
    label: 'CURRENTLY',
    caption: 'Ongoing experiments, sketches & ideas',
    aspect: '16/10',
    gradient: 'linear-gradient(135deg, #FAF4D4 0%, #F8EFE0 100%)',
    icon: '🎨'
  },
  {
    id: '06',
    label: 'JUST BECAUSE',
    caption: 'Unplanned everyday things that bring joy',
    aspect: '4/5',
    gradient: 'linear-gradient(135deg, #EFE1B3 0%, #FAF4D4 100%)',
    icon: '🌱'
  }
];

export default function PersonalGallerySection() {
  // Duplicate gallery items array to make a seamless infinite loop ticker
  const tickerItems = [...GALLERY_ITEMS, ...GALLERY_ITEMS];

  return (
    <section id="gallery" className="personal-gallery-section">
      <div className="gallery-header-container">
        <span className="eyebrow font-mono">PERSONAL COLLECTION</span>
        <h2 className="gallery-headline font-serif">
          <span>SNEAK PEEK INTO</span>
          <span className="headline-line2">MY GALLERY.</span>
        </h2>
      </div>

      {/* Infinite Horizontal Ticker Container */}
      <div className="gallery-ticker-wrapper">
        <div className="gallery-ticker-track">
          {tickerItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="gallery-card-item">
              {/* Image Placeholder Frame */}
              <div 
                className="image-placeholder-frame"
                style={{ background: item.gradient }}
              >
                <div className="placeholder-inner">
                  <span className="placeholder-icon">{item.icon}</span>
                  <span className="placeholder-hint font-mono">Replace with your photo</span>
                </div>
              </div>

              {/* Card Meta & Label */}
              <div className="card-meta">
                <span className="card-label font-mono">{item.label}</span>
                <p className="card-caption font-sans">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .personal-gallery-section {
          position: relative;
          background-color: #F2D9DA;
          padding: 6rem 0 7rem 0;
          color: #660005;
          width: 100%;
          overflow: hidden;
          box-sizing: border-box;
        }

        .gallery-header-container {
          position: relative;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto 3.5rem auto;
          padding: 0 3.5rem;
          display: flex;
          flex-direction: column;
        }

        .eyebrow {
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          color: #660005;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .gallery-headline {
          font-family: var(--font-serif, 'Bodoni Moda', Georgia, serif);
          font-size: clamp(2.2rem, 4.5vw, 4.2rem);
          font-weight: 700;
          color: #660005;
          line-height: 1.08;
          letter-spacing: -0.02em;
          display: flex;
          flex-direction: column;
          margin: 0;
        }

        .headline-line2 {
          font-style: normal;
          opacity: 0.92;
        }

        /* Ticker Outer Wrapper (Clipped) */
        .gallery-ticker-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }

        /* Continuous Horizontal Moving Track */
        .gallery-ticker-track {
          display: flex;
          gap: 1.75rem;
          width: max-content;
          animation: tickerMarquee 42s linear infinite;
          padding: 0.5rem 0 1rem 0;
        }

        .gallery-ticker-track:hover {
          animation-play-state: paused;
        }

        /* Individual Gallery Card Item */
        .gallery-card-item {
          width: 310px;
          flex-shrink: 0;
          background: #FAF4D4;
          border: 1px solid rgba(102, 0, 5, 0.16);
          border-radius: 16px;
          padding: 1.15rem;
          box-shadow: 0 4px 18px rgba(102, 0, 5, 0.05);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-card-item:hover {
          transform: translateY(-4px);
          border-color: rgba(102, 0, 5, 0.35);
          box-shadow: 0 10px 28px rgba(102, 0, 5, 0.1);
        }

        /* Image Placeholder Box */
        .image-placeholder-frame {
          width: 100%;
          height: 230px;
          border-radius: 10px;
          border: 1.5px dashed rgba(102, 0, 5, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .placeholder-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          text-align: center;
          padding: 1rem;
        }

        .placeholder-icon {
          font-size: 1.8rem;
          opacity: 0.8;
        }

        .placeholder-hint {
          font-size: 0.76rem;
          font-weight: 600;
          color: #660005;
          opacity: 0.75;
          letter-spacing: 0.02em;
        }

        /* Card Meta & Label */
        .card-meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .card-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #660005;
          text-transform: uppercase;
        }

        .card-caption {
          font-size: 0.86rem;
          color: #660005;
          line-height: 1.4;
          margin: 0;
          font-weight: 500;
        }

        /* Infinite Marquee Animation Keyframes */
        @keyframes tickerMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 860px) {
          .personal-gallery-section {
            padding: 4.5rem 0 5.5rem 0;
          }

          .gallery-header-container {
            padding: 0 1.5rem;
            margin-bottom: 2.5rem;
          }

          .gallery-card-item {
            width: 260px;
            padding: 1rem;
          }

          .image-placeholder-frame {
            height: 190px;
          }
        }
      `}</style>
    </section>
  );
}
