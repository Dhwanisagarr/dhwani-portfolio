'use client';

import { useState } from 'react';

export default function GalleryStack({ images }) {
  const defaultImages = [
    { src: '/about-gallery/photo1.jpg', alt: 'Dhwani Sagar in red saree' },
    { src: '/about-gallery/photo2.jpg', alt: 'Notebook collection - collector? maybe.' },
    { src: '/about-gallery/photo3.jpg', alt: 'Photo prints and polaroids - proof I was here' },
    { src: '/about-gallery/photo4.jpg', alt: 'Watercolor sunset sketch - I can draw, cmon' },
    { src: '/about-gallery/photo5.jpg', alt: 'Dhwani holding Cracking the PM Interview book - yeah on my way' }
  ];

  const photoList = images && images.length > 0 ? images : defaultImages;
  
  // Array of active indexes mapping stack depth (0 is top, N-1 is bottom)
  const [order, setOrder] = useState(() => photoList.map((_, i) => i));
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setOrder((prev) => {
      const nextOrder = [...prev];
      const top = nextOrder.shift();
      nextOrder.push(top);
      return nextOrder;
    });
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  // Stack offsets for cards based on depth index in current order
  const getStackStyle = (depth) => {
    const total = photoList.length;
    const isTop = depth === 0;

    // Preserved subtle angles and offsets matching Framer Gallery Stack spec
    const rotations = [0, -4, 5, -2, 3];
    const yOffsets = [0, 10, 20, 28, 36];
    const scaleFactors = [1, 0.96, 0.92, 0.88, 0.84];

    const rot = rotations[depth % rotations.length];
    const yOff = yOffsets[Math.min(depth, yOffsets.length - 1)];
    const scale = scaleFactors[Math.min(depth, scaleFactors.length - 1)];

    return {
      zIndex: total - depth,
      transform: `translate3d(0, ${yOff}px, 0) rotate(${rot}deg) scale(${scale})`,
      opacity: depth > 3 ? 0.4 : 1,
      cursor: isTop ? 'pointer' : 'default'
    };
  };

  const topPhotoIndex = order[0];

  return (
    <div className="gallery-stack-wrapper">
      <div 
        className="gallery-stack-container" 
        onClick={handleNext}
        role="button"
        tabIndex={0}
        aria-label="Cycle gallery photos"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleNext();
          }
        }}
      >
        {photoList.map((photo, origIdx) => {
          const depth = order.indexOf(origIdx);
          const style = getStackStyle(depth);

          return (
            <div
              key={photo.src || origIdx}
              className={`gallery-card ${depth === 0 ? 'is-top' : ''}`}
              style={style}
            >
              <img
                src={photo.src}
                alt={photo.alt || `Gallery photo ${origIdx + 1}`}
                className="card-image"
                loading="eager"
              />
              <div className="card-border-glow" />
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .gallery-stack-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 420px;
          margin: 0 auto;
          user-select: none;
        }

        .gallery-stack-container {
          position: relative;
          width: 100%;
          height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          perspective: 1000px;
        }

        .gallery-card {
          position: absolute;
          width: 320px;
          height: 420px;
          border-radius: 20px;
          overflow: hidden;
          background: #18181b;
          border: 3px solid #FAF4D4;
          box-shadow: 
            0 16px 40px rgba(0, 0, 0, 0.35),
            0 4px 12px rgba(102, 0, 5, 0.15);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), 
                      opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.3s ease;
          transform-origin: center center;
          will-change: transform, opacity;
        }

        .gallery-card.is-top:hover {
          box-shadow: 
            0 22px 50px rgba(0, 0, 0, 0.45),
            0 0 0 2px #660005;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          pointer-events: none;
        }

        .card-border-glow {
          position: absolute;
          inset: 0;
          border-radius: 17px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          pointer-events: none;
        }

        .gallery-meta-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 320px;
          margin-top: 1.25rem;
          padding: 0.4rem 0.75rem;
          background: rgba(102, 0, 5, 0.08);
          border: 1px solid rgba(102, 0, 5, 0.2);
          border-radius: 30px;
        }

        .cycle-btn {
          background: transparent;
          border: none;
          color: #660005;
          font-family: inherit;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          padding: 0;
        }

        .cycle-btn:hover {
          color: #660005;
        }

        .sparkle {
          font-size: 0.85rem;
          color: #660005;
          animation: spinSparkle 4s linear infinite;
        }

        @keyframes spinSparkle {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .photo-counter {
          font-size: 0.78rem;
          font-weight: 700;
          color: #660005;
          letter-spacing: 0.08em;
        }

        @media (max-width: 640px) {
          .gallery-stack-container {
            height: 420px;
          }
          .gallery-card {
            width: 270px;
            height: 360px;
          }
          .gallery-meta-bar {
            width: 270px;
          }
        }
      `}</style>
    </div>
  );
}
