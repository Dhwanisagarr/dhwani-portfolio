'use client';

import { useEffect, useRef } from 'react';

// Inline RGB Lerp Function - Zero Libraries
function parseHex(hex) {
  if (!hex || typeof hex !== 'string') return [102, 0, 5]; // Fallback Red
  let c = hex.replace('#', '').trim();
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return [102, 0, 5];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function lerpColor(colorA, colorB, progress) {
  const t = Math.max(0, Math.min(1, progress));
  const rgbA = parseHex(colorA);
  const rgbB = parseHex(colorB);

  const r = Math.round(rgbA[0] + (rgbB[0] - rgbA[0]) * t);
  const g = Math.round(rgbA[1] + (rgbB[1] - rgbA[1]) * t);
  const b = Math.round(rgbA[2] + (rgbB[2] - rgbA[2]) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

export default function ScrollColorController() {
  const bgRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    // Homepage section identity color map
    const defaultSectionMap = [
      { selector: '.hero-container', color: '#660005' },
      { selector: '.about-section', color: '#F2D9DA' },
      { selector: '.work-edu-section', color: '#FAF4D4' },
      { selector: '.projects-scroll-wrapper', color: '#660005' },
      { selector: '.tools-section', color: '#F2D9DA' },
      { selector: '.contact-section', color: '#660005' },
      { selector: '.explore-section', color: '#F5E1E2' },
      { selector: '.site-footer', color: '#F5E1E2' },
    ];

    const updateColor = () => {
      ticking = false;
      if (!bgRef.current) return;

      // Find all sections on page
      let sectionData = [];
      const dataNodes = document.querySelectorAll('[data-color]');

      if (dataNodes.length > 0) {
        dataNodes.forEach((node) => {
          const color = node.getAttribute('data-color');
          const rect = node.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const height = rect.height;
          const isSticky = node.classList.contains('projects-scroll-wrapper');

          // For sticky horizontal scroll wrapper, solid color spans until pin unpins
          const startPoint = top;
          const endPoint = isSticky
            ? Math.max(top + 100, top + height - window.innerHeight)
            : top + height;

          sectionData.push({
            top,
            height,
            startPoint,
            endPoint,
            center: top + height / 2,
            color,
            isSticky
          });
        });
      } else {
        defaultSectionMap.forEach(({ selector, color }) => {
          const el = document.querySelector(selector);
          if (el) {
            const rect = el.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const height = rect.height;
            const isSticky = selector.includes('projects');
            const startPoint = top;
            const endPoint = isSticky
              ? Math.max(top + 100, top + height - window.innerHeight)
              : top + height;

            sectionData.push({
              top,
              height,
              startPoint,
              endPoint,
              center: top + height / 2,
              color,
              isSticky
            });
          }
        });
      }

      if (sectionData.length === 0) return;

      // Sort sections by top position
      sectionData.sort((a, b) => a.top - b.top);

      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const viewportCenter = scrollY + window.innerHeight / 2;

      let currentColor = sectionData[0].color;

      // Force explicit end-stop if scrolled to bottom of document
      if (maxScroll > 0 && scrollY >= maxScroll - 20) {
        currentColor = sectionData[sectionData.length - 1].color || '#F5E1E2';
      } else if (viewportCenter <= sectionData[0].center) {
        currentColor = sectionData[0].color;
      } else if (viewportCenter >= sectionData[sectionData.length - 1].center) {
        currentColor = sectionData[sectionData.length - 1].color;
      } else {
        // Interpolate between sections based on viewport position
        for (let i = 0; i < sectionData.length - 1; i++) {
          const cur = sectionData[i];
          const next = sectionData[i + 1];

          // Effective boundary range for transition
          const lerpStart = cur.isSticky ? cur.endPoint : cur.center;
          const lerpEnd = next.isSticky ? next.startPoint : next.center;

          if (viewportCenter < lerpStart && i === 0) {
            currentColor = cur.color;
            break;
          }

          if (viewportCenter >= lerpStart && viewportCenter <= lerpEnd) {
            const range = lerpEnd - lerpStart;
            const progress = range > 0 ? (viewportCenter - lerpStart) / range : 0;
            currentColor = lerpColor(cur.color, next.color, progress);
            break;
          } else if (viewportCenter > lerpEnd && i === sectionData.length - 2) {
            currentColor = next.color;
          }
        }
      }

      bgRef.current.style.backgroundColor = currentColor;
    };

    // Ensure body background is transparent on homepage so fixed canvas is visible
    const originalBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'transparent';

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateColor);
      }
    };

    // Initial trigger
    updateColor();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateColor, { passive: true });
    window.addEventListener('load', updateColor);

    if (document.fonts) {
      document.fonts.ready.then(updateColor);
    }

    return () => {
      document.body.style.backgroundColor = originalBodyBg;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateColor);
      window.removeEventListener('load', updateColor);
    };
  }, []);

  return (
    <div
      ref={bgRef}
      id="scroll-bg-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        willChange: 'background-color',
        backgroundColor: '#660005',
        transition: 'background-color 0.1s linear',
      }}
    />
  );
}
