'use client';

import { useState, useEffect } from 'react';
import Footer from './Footer';
import BackgroundWatermark from './BackgroundWatermark';

export default function GuestNotesClient() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ name: '', role: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const MAX_CHARS = 280;

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
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setStatus('');

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('⏳ Note submitted! It will appear once approved by admin.');
        setFormData({ name: '', role: '', message: '' });
        fetchNotes();
      } else {
        setStatus('Failed to submit note. Please try again.');
      }
    } catch (err) {
      setStatus('Error connecting to guestbook server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const charCount = formData.message.length;
  const isFormValid = formData.name.trim().length > 0 && formData.message.trim().length > 0 && charCount <= MAX_CHARS;

  // Distribute approved notes across Column 2 and Column 3 for desktop masonry
  const col2Notes = notes.filter((_, idx) => idx % 2 === 0);
  const col3Notes = notes.filter((_, idx) => idx % 2 === 1);

  const getInitial = (name) => {
    if (!name) return 'V';
    return name.trim().charAt(0).toUpperCase();
  };

  const renderNoteCard = (note) => (
    <article key={note.id} className="gn-card-light-pink">
      <div className="gn-quote-mark font-serif">“</div>
      
      <p className="gn-note-message">{note.message}</p>

      <div className="gn-note-divider" />

      <div className="gn-note-meta">
        <div className="gn-author-info">
          <div className="gn-avatar-circle">
            {getInitial(note.name)}
          </div>
          <div className="gn-author-text">
            <span className="gn-author-name">{note.name}</span>
            {note.role && <span className="gn-author-role">{note.role}</span>}
          </div>
        </div>

        <span className="gn-note-date">{note.date}</span>
      </div>
    </article>
  );

  const renderFormCard = () => (
    <div className="gn-card-light-pink">
      <h2 className="gn-form-title font-mono">Leave a Note</h2>

      {status && <div className="gn-status-msg">{status}</div>}

      <form onSubmit={handleSubmit}>
        <div className="gn-form-group">
          <div className="gn-label-row">
            <label htmlFor="guest-name">YOUR NAME</label>
          </div>
          <input
            id="guest-name"
            type="text"
            required
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="gn-input"
          />
        </div>

        <div className="gn-form-group">
          <div className="gn-label-row">
            <label htmlFor="guest-role">ROLE / TITLE (OPTIONAL)</label>
          </div>
          <input
            id="guest-role"
            type="text"
            placeholder="e.g. Designer / Developer"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="gn-input"
          />
        </div>

        <div className="gn-form-group">
          <div className="gn-label-row">
            <label htmlFor="guest-message">YOUR MESSAGE</label>
            <span className="gn-char-count font-mono">{charCount}/{MAX_CHARS}</span>
          </div>
          <textarea
            id="guest-message"
            required
            rows={4}
            maxLength={MAX_CHARS}
            placeholder="Write a message or say hello..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="gn-input gn-textarea"
          />
        </div>

        <button 
          type="submit" 
          disabled={!isFormValid || isSubmitting} 
          className="gn-submit-btn font-mono"
        >
          <span>{isSubmitting ? 'Submitting...' : 'Submit →'}</span>
        </button>
      </form>
    </div>
  );

  return (
    <div className="gn-page-wrapper">
      <BackgroundWatermark word="GUEST NOTES" color="rgba(102, 0, 5, 0.095)" />
      <div className="gn-bg-grid-overlay" aria-hidden="true" />

      <div className="gn-container">
        {/* HERO SECTION */}
        <header className="gn-hero-header">
          <span className="gn-eyebrow font-mono">COMMUNITY WALL</span>
          <h1 className="gn-hero-title font-mono">GUEST NOTES</h1>
          <p className="gn-hero-lead font-sans">
            Leave a thought, message, or hello. A public space for visitors, fellow builders, and friends.
          </p>
        </header>

        {/* THIN DIVIDER & NOTE COUNT */}
        <div className="gn-divider-bar">
          <span>PUBLIC MESSAGES</span>
          <span className="gn-count-pill">{notes.length} NOTES RECORDED</span>
        </div>

        {/* DESKTOP 3-COLUMN MASONRY GRID */}
        <div className="gn-masonry-desktop">
          {/* COLUMN 1: Form Card */}
          <div className="gn-column">
            {renderFormCard()}
          </div>

          {/* COLUMN 2: Note Cards */}
          <div className="gn-column">
            {col2Notes.map((note) => renderNoteCard(note))}
          </div>

          {/* COLUMN 3: Note Cards */}
          <div className="gn-column">
            {col3Notes.map((note) => renderNoteCard(note))}
          </div>
        </div>

        {/* TABLET 2-COLUMN GRID */}
        <div className="gn-masonry-tablet">
          <div className="gn-column">
            {renderFormCard()}
          </div>
          <div className="gn-column">
            {notes.map((note) => renderNoteCard(note))}
          </div>
        </div>

        {/* MOBILE 1-COLUMN GRID (Form Card FIRST) */}
        <div className="gn-masonry-mobile">
          {renderFormCard()}
          {notes.map((note) => renderNoteCard(note))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
