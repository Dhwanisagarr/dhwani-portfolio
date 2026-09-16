'use client';

import { useState } from 'react';
import LiveClock from './LiveClock';
import BackgroundWatermark from './BackgroundWatermark';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', msg: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', msg: 'Message sent successfully! I will get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: data.error || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Network error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section" data-color="#A90012">
      {/* Giant Tiled Background Typography Watermark */}
      <BackgroundWatermark word="CONNECT" color="rgba(250, 244, 212, 0.06)" />

      <div className="contact-container">
        {/* SECTION HEADER */}
        <div className="contact-header">
          <div className="eyebrow-row font-mono">
            <span className="eyebrow-dot" />
            <span className="eyebrow">GET IN TOUCH</span>
          </div>
          <h2 className="section-title font-mono">Let’s Connect</h2>
          <p className="section-subtitle font-sans">
            “Whether you have a project in mind, an opportunity to discuss, or just want to chat about product design and engineering — feel free to reach out.”
          </p>
        </div>

        {/* BALANCED TWO-COLUMN LAYOUT */}
        <div className="contact-grid">
          {/* LEFT COLUMN: COMPACT CONTACT FORM CARD */}
          <div className="form-card">
            <h3 className="card-title font-mono">Send a Message</h3>

            {status.msg && (
              <div className={`status-banner ${status.type} font-mono`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label font-mono">YOUR NAME</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="e.g. Alex Rivers"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label font-mono">EMAIL ADDRESS</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label font-mono">SUBJECT</label>
                <input
                  type="text"
                  id="subject"
                  required
                  placeholder="What would you like to discuss?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label font-mono">MESSAGE</label>
                <textarea
                  id="message"
                  required
                  rows={2}
                  placeholder="Tell me about your project, idea, or role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input textarea"
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="submit-btn font-mono">
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <span className="btn-arrow">→</span>
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: CONTACT INFORMATION CARDS */}
          <div className="info-panel">
            {/* Top Card: Location, Time & Metadata */}
            <LiveClock />

            {/* Minimal Direct Channels Index */}
            <div className="channels-section">
              <h4 className="channels-title font-mono">DIRECT CHANNELS</h4>
              <div className="channels-row">
                <a href="mailto:dhwanisagar.work@gmail.com" className="channel-item">
                  <svg className="channel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span className="channel-name font-sans">Email</span>
                </a>

                <a
                  href="https://linkedin.com/in/dhwanisagar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-item"
                >
                  <svg className="channel-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z"/>
                  </svg>
                  <span className="channel-name font-sans">LinkedIn</span>
                </a>

                <a
                  href="https://github.com/dhwanisagar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-item"
                >
                  <svg className="channel-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                  </svg>
                  <span className="channel-name font-sans">GitHub</span>
                </a>

                <a
                  href="https://instagram.com/dhwanisagar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-item"
                >
                  <svg className="channel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="channel-name font-sans">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          position: relative;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: transparent;
          padding: 5.5rem 0;
          color: #FAF4D4;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        .contact-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .contact-header {
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
          background-color: #FAF4D4;
          display: inline-block;
        }

        .eyebrow {
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          color: #F2D9DA;
          font-weight: 600;
        }

        .section-title {
          font-size: clamp(2.4rem, 4.2vw, 3.8rem);
          font-weight: 600;
          color: #FAF4D4;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          color: #F2D9DA;
          max-width: 620px;
          line-height: 1.5;
          font-style: italic;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 52% 48%;
          gap: 2.25rem;
          align-items: start;
        }

        .form-card {
          background: #F2D9DA;
          border: 1px solid #E3BDBE;
          border-radius: 16px;
          padding: 1.4rem 1.6rem;
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #CC2027;
          margin-bottom: 0.9rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid #E3BDBE;
        }

        .status-banner {
          padding: 0.6rem 0.85rem;
          border-radius: 6px;
          margin-bottom: 0.9rem;
          font-size: 0.8rem;
        }

        .status-banner.success {
          background: #FAF4D4;
          border: 1px solid #CC2027;
          color: #CC2027;
        }

        .status-banner.error {
          background: #FAF4D4;
          border: 1px solid #CC2027;
          color: #CC2027;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .form-label {
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: #CC2027;
          font-weight: 700;
        }

        .form-input {
          width: 100%;
          background: #FAF4D4;
          border: 1px solid #E3BDBE;
          border-radius: 6px;
          padding: 0.55rem 0.75rem;
          color: #CC2027;
          font-family: var(--font-sans);
          font-size: 0.86rem;
          transition: all 0.2s ease;
          outline: none;
        }

        .form-input::placeholder {
          color: #B91C23;
          opacity: 0.65;
        }

        .form-input:focus {
          border-color: #CC2027;
          background: #FFFFFF;
          box-shadow: 0 0 0 2px rgba(204, 32, 39, 0.15);
        }

        .textarea {
          resize: vertical;
          min-height: 60px;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.65rem;
          background: #CC2027;
          border: 1px solid #CC2027;
          border-radius: 6px;
          color: #FAF4D4;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          margin-top: 0.25rem;
          transition: all 0.25s ease;
        }

        .submit-btn:hover {
          background: #D5242B;
          border-color: #D5242B;
          color: #FEFEFC;
          transform: translateY(-1px);
        }

        .btn-arrow {
          font-size: 1rem;
          transition: transform 0.2s ease;
        }

        .submit-btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        .info-panel {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .channels-section {
          padding-top: 0.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .channels-title {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: #F5F0DF;
          margin-bottom: 0.15rem;
        }

        .channels-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.5rem;
        }

        .channel-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: #ffffff;
          transition: color 0.2s ease;
          position: relative;
          padding-bottom: 2px;
        }

        .channel-icon {
          width: 18px;
          height: 18px;
          color: #a0a0a5;
          transition: color 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
        }

        .channel-name {
          font-size: 0.88rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          transition: color 0.2s ease;
        }

        .channel-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1px;
          background-color: #F5F0DF;
          transition: width 0.25s ease;
        }

        .channel-item:hover {
          color: #F5F0DF;
        }

        .channel-item:hover .channel-icon {
          color: #F5F0DF;
          transform: translateY(-1px);
        }

        .channel-item:hover::after {
          width: 100%;
        }

        @media (max-height: 800px) and (min-width: 993px) {
          .contact-section {
            padding: 2rem 0;
          }
          .contact-header {
            margin-bottom: 1.25rem;
          }
          .form-card {
            padding: 1.25rem 1.4rem;
          }
          .contact-form {
            gap: 0.5rem;
          }
          .channels-section {
            padding-top: 0.15rem;
          }
          .channels-row {
            gap: 1.25rem;
          }
        }

        @media (max-width: 992px) {
          .contact-section {
            min-height: auto;
            padding: 5rem 0;
          }

          .contact-container {
            padding: 0 2rem;
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 640px) {
          .contact-container {
            padding: 0 1.5rem;
          }

          .form-card {
            padding: 1.25rem;
          }

          .channels-row {
            gap: 1.25rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
