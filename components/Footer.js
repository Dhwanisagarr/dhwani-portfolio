'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAboutPage = pathname === '/about';
  const footerBgColor = isAboutPage ? '#F2D9DA' : '#F5E1E2';
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="site-footer" 
      data-color={footerBgColor}
      style={{ backgroundColor: isHomePage ? 'transparent' : footerBgColor }}
    >
      <div className="container">
        <div className="footer-top">
          {/* Brand Signature */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo font-mono">
              <span className="brand-dot"></span>
              <span>DHWANI SAGAR</span>
            </Link>

            <p className="footer-tagline font-sans">
              Crafting thoughtful digital experiences at the intersection of product thinking, design, and technology.
            </p>

            <a 
              href="mailto:dhwanisagar17@gmail.com" 
              className="footer-email-link font-mono"
            >
              dhwanisagar17@gmail.com
            </a>
          </div>

          {/* Navigation Links */}
          <div className="footer-nav">
            <div className="nav-col">
              <span className="col-heading font-mono">PAGES</span>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/4rinlabs">4RinLabs</Link>
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
              <a href="mailto:dhwanisagar17@gmail.com">Email</a>
              <a href="https://www.linkedin.com/in/dhwanisagar/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/Dhwanisagarr" target="_blank" rel="noopener noreferrer">GitHub</a>
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
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background-color: transparent;
          border-top: 1px solid rgba(102, 0, 5, 0.15);
          padding: 4.5rem 0 2.5rem 0;
          color: #660005;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.25fr 2fr;
          gap: 4rem;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid rgba(102, 0, 5, 0.15);
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
          color: #660005;
          text-decoration: none;
          letter-spacing: 0.1em;
          font-weight: 700;
        }

        .brand-dot {
          width: 8px;
          height: 8px;
          background: #660005;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(102, 0, 5, 0.3);
        }

        .footer-tagline {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #660005;
          max-width: 320px;
        }

        .footer-email-link {
          font-size: 0.9rem;
          color: #660005;
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 0.02em;
          display: inline-block;
          margin-top: -0.25rem;
          transition: opacity 0.2s ease;
        }

        .footer-email-link:hover {
          opacity: 0.8;
          text-decoration: underline;
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
          color: #660005;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .nav-col :global(a) {
          font-size: 0.9rem;
          color: #660005;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nav-col :global(a:hover) {
          color: #660005;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          font-size: 0.8rem;
          color: #660005;
          opacity: 0.95;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .accent-dot {
          color: #660005;
        }

        .admin-btn {
          color: #660005;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .admin-btn:hover {
          color: #660005;
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
