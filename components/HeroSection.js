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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="hero-tagline"
          >
            CRAFTING BEAUTIFUL DIGITAL EXPERIENCES
          </motion.p>

          {/* 2. DHWANI line */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.25 }}
            className="name-line line-dhwani"
          >
            DHWANI
          </motion.div>

          {/* 3. SAGAR line */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.4 }}
            className="name-line line-sagar"
          >
            SAGAR
          </motion.div>

          {/* 4. Open to Work Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
          max-width: 100vw;
          height: 100vh;
          height: 100dvh;
          min-height: 100vh;
          background-color: #660005;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          box-sizing: border-box;
          pointer-events: none;
        }

        .hero-name-block {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          margin: 0 auto;
          pointer-events: auto;
          box-sizing: border-box;
          /* Master locked ratio controller */
          font-size: clamp(34px, 14vw, 120px);
        }

        @media (min-width: 992px) {
          .hero-name-block {
            font-size: clamp(120px, 18.5vw, 360px);
          }
        }

        .hero-tagline {
          font-family: 'Quicksand', 'Manrope', sans-serif;
          letter-spacing: 0.32em;
          font-size: 0.056em;
          color: #FFFFFF;
          margin: 0 0 0.15em 0.81em;
          text-transform: uppercase;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          white-space: nowrap;
          pointer-events: auto;
        }

        .name-line {
          font-family: 'Cosmico', sans-serif;
          font-size: 1em;
          line-height: 0.79;
          letter-spacing: -0.015em;
          color: #DF8F9C;
          text-transform: uppercase;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          user-select: none;
          white-space: nowrap;
          margin: 0;
        }

        .line-dhwani {
          margin: 0;
        }

        .line-sagar {
          margin-left: 0.52em;
        }

        .hero-open-to-work {
          align-self: flex-end;
          margin-top: -0.08em;
          font-family: 'Quicksand', 'Manrope', sans-serif;
          letter-spacing: 0.28em;
          font-size: 0.052em;
          color: #FFFFFF;
          text-transform: uppercase;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          white-space: nowrap;
          pointer-events: auto;
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
      `}</style>
    </section>
  );
}
