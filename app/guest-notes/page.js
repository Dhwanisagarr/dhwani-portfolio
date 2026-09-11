'use client';

import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';

export default function GuestNotesPage() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ name: '', role: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('Note signed successfully!');
        setFormData({ name: '', role: '', message: '' });
        fetchNotes();
      } else {
        setStatus('Failed to sign note. Please try again.');
      }
    } catch (err) {
      setStatus('Error connecting to guestbook server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="subpage-wrapper">
      <div className="subpage-header">
        <div className="container">
          <span className="eyebrow">COMMUNITY & VISITOR MESSAGES</span>
          <h1 className="subpage-title font-mono">Guest Notes</h1>
          <p className="subpage-lead">
            Leave a note, share feedback, or say hello. A public guestbook for fellow builders and friends.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="guest-grid">
          {/* Sign Guestbook Form */}
          <div className="sign-form-card glass-panel">
            <h2 className="form-heading font-mono">Sign the Guestbook</h2>
            
            {status && <div className="status-msg font-mono">{status}</div>}

            <form onSubmit={handleSubmit} className="guest-form">
              <div className="form-group">
                <label className="form-label font-mono">NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label font-mono">ROLE / TITLE (OPTIONAL)</label>
                <input
                  type="text"
                  placeholder="e.g. Designer / Developer"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label font-mono">MESSAGE</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write a message for Dhwani..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input textarea"
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary full-width">
                <span>{isSubmitting ? 'Signing...' : 'Post Guest Note'}</span>
                <span className="btn-icon">→</span>
              </button>
            </form>
          </div>

          {/* Guest Notes Timeline */}
          <div className="notes-timeline">
            <h2 className="timeline-title font-mono">ALL NOTES ({notes.length})</h2>

            <div className="notes-list">
              {notes.map((note) => (
                <div key={note.id} className="note-card glass-panel">
                  <div className="note-top">
                    <div>
                      <h3 className="author-name font-mono">{note.name}</h3>
                      <span className="author-role font-mono">{note.role}</span>
                    </div>
                    <span className="note-date font-mono">{note.date}</span>
                  </div>

                  <p className="note-message">“{note.message}”</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .subpage-wrapper { padding-top: 100px; background: #080808; }
        .subpage-header { padding: 4rem 0 3rem 0; background: #0d0d0d; border-bottom: 1px solid var(--border-subtle); }
        .subpage-title { font-size: clamp(3rem, 6vw, 5rem); color: var(--text-primary); margin-bottom: 0.5rem; }
        .subpage-lead { font-size: 1.25rem; color: var(--text-secondary); max-width: 600px; }

        .guest-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3.5rem;
          align-items: start;
        }

        .sign-form-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-heading {
          font-size: 1.35rem;
          color: var(--text-primary);
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .status-msg {
          font-size: 0.85rem;
          color: var(--accent-neon);
          padding: 0.6rem;
          background: rgba(204, 255, 0, 0.1);
          border: 1px solid var(--accent-neon);
          border-radius: 4px;
        }

        .guest-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .form-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 0.75rem 1rem;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          outline: none;
        }

        .form-input:focus {
          border-color: var(--accent-neon);
        }

        .textarea { resize: vertical; }
        .full-width { width: 100%; }

        .timeline-title {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          letter-spacing: 0.05em;
        }

        .notes-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .note-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .note-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .author-name {
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .author-role {
          font-size: 0.8rem;
          color: var(--accent-neon);
          display: block;
        }

        .note-date {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .note-message {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-secondary);
          font-style: italic;
        }

        @media (max-width: 992px) {
          .guest-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
