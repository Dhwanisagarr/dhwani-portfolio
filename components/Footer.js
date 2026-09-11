'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Signature */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo font-mono">
              <span className="brand-dot"></span>
              <span>DHWANI SAGAR</span>
            </Link>

            <p className="footer-tagline">
              Crafting thoughtful digital experiences at the intersection of product thinking, design, and technology.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-nav">
            <div className="nav-col">
              <span className="col-heading font-mono">PAGES</span>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/certifications">Certifications</Link>
            </div>

            <div className="nav-col">
              <span className="col-heading font-mono">EXPLORE</span>
              <Link href="/guest-notes">Guest Notes</Link>
              <Link href="/blogs">Blogs</Link>
              <Link href="/books">Books</Link>
              <Link href="/epigraphs">Epigraphs</Link>
            </div>

            <div className="nav-col">
              <span className="col-heading font-mono">CONNECT</span>
              <a href="mailto:dhwani.sagar@example.com">Email</a>
              <a href="https://linkedin.com/in/dhwanisagar" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/dhwanisagar" target="_blank" rel="noopener noreferrer">GitHub</a>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright font-mono">
            © {currentYear} Dhwani Sagar. All rights reserved.
          </div>

          <div className="footer-meta font-mono">
            <span>DESIGNED & BUILT WITH INTENT</span>
            <span className="accent-dot">•</span>
            <Link href="/admin" className="admin-btn">CMS ADMIN</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background: #050505;
          border-top: 1px solid var(--border-subtle);
          padding: 4.5rem 0 2.5rem 0;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.25fr 2fr;
          gap: 4rem;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.1rem;
          color: var(--text-primary);
          text-decoration: none;
          letter-spacing: 0.1em;
        }

        .brand-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-neon);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-neon);
        }

        .footer-tagline {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text-secondary);
          max-width: 320px;
        }

        .footer-nav {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .nav-col {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .col-heading {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: var(--accent-neon);
          margin-bottom: 0.5rem;
        }

        .nav-col :global(a) {
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nav-col :global(a:hover) {
          color: var(--text-primary);
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .accent-dot {
          color: var(--accent-neon);
        }

        .admin-btn {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .admin-btn:hover {
          color: var(--accent-neon);
        }

        @media (max-width: 992px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 576px) {
          .footer-nav {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </footer>
  );
}
