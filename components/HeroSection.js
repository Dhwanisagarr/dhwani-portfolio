'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  // Spring transition physics config explicitly specified per prompt spec
  const springTransition = {
    type: 'spring',
    stiffness: 120,
    damping: 10,
    mass: 0.8,
  };

  return (
    <section className="hero-container" data-color="#660005" aria-label="Hero Section">
      {/* Accessible visual header for screen readers & SEO */}
      <h1 className="sr-only">
        Dhwani Sagar — Crafting Beautiful Digital Experiences
      </h1>

      {/* Hero Content Layer */}
      <div className="hero-content-wrapper">
        {/* Name Block Container containing tagline, stacked DHWANI / SAGAR, and OPEN TO WORK */}
        <div className="hero-name-block">
          {/* 1. Tagline */}
          <motion.p
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="hero-tagline"
          >
            CRAFTING BEAUTIFUL DIGITAL EXPERIENCES
          </motion.p>

          {/* 2. DHWANI line */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springTransition, delay: 0.25 }}
            className="name-line line-dhwani"
          >
            DHWANI
          </motion.div>

          {/* 3. SAGAR line */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springTransition, delay: 0.4 }}
            className="name-line line-sagar"
          >
            SAGAR
          </motion.div>

          {/* 4. Open to Work Text - Right aligned under R of SAGAR */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springTransition, delay: 0.55 }}
            className="hero-open-to-work"
          >
            OPEN TO WORK
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .hero-container {
          position: relative;
          width: 100%;
          max-width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #660005;
          overflow: hidden;
          box-sizing: border-box;
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .hero-name-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          pointer-events: auto;
        }

        .hero-tagline {
          font-family: 'Quicksand', 'Manrope', sans-serif;
          letter-spacing: 0.32em;
          font-size: clamp(11px, 1.2vw, 17px);
          color: #FFFFFF;
          margin: 0 0 1.25rem 0;
          text-align: center;
          text-transform: uppercase;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          pointer-events: auto;
        }

        .name-line {
          font-family: 'Cosmico', sans-serif;
          font-size: clamp(3.2rem, 16.5vw, 210px);
          line-height: 0.85;
          letter-spacing: -0.015em;
          color: #DF8F9C;
          text-transform: uppercase;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          user-select: none;
          white-space: nowrap;
          margin: 0;
          text-align: center;
        }

        .line-dhwani {
          margin: 0;
        }

        .line-sagar {
          margin: 0;
        }

        .hero-open-to-work {
          align-self: center;
          margin-top: 1.5rem;
          font-family: 'Quicksand', 'Manrope', sans-serif;
          letter-spacing: 0.28em;
          font-size: clamp(11px, 1.1vw, 16px);
          color: #FFFFFF;
          text-transform: uppercase;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          pointer-events: auto;
          text-align: center;
        }

        /* Accessible Screen Reader Only Class */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        @media (max-width: 768px) {
          .hero-container {
            padding: 1.5rem 1rem;
          }
          .hero-tagline {
            letter-spacing: 0.22em;
            margin-bottom: 1rem;
          }
          .name-line {
            font-size: clamp(2.8rem, 15.5vw, 90px);
            line-height: 0.88;
          }
          .hero-open-to-work {
            margin-top: 1.25rem;
            letter-spacing: 0.22em;
          }
        }
      `}</style>
    </section>
  );
}
