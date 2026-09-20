'use client';

import { useState, useMemo } from 'react';
import booksData from '../data/books.json';
import Footer from './Footer';
import BackgroundWatermark from './BackgroundWatermark';
import Framer3DBook from './Framer3DBook';

export default function BooksClient() {
  const [activeTab, setActiveTab] = useState('Read');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic stats calculation with flexible status matching
  const stats = useMemo(() => {
    const readBooks = booksData.filter((b) => b.status?.toLowerCase() === 'read');
    const readingBooks = booksData.filter((b) =>
      b.status?.toLowerCase() === 'reading' || b.status?.toLowerCase() === 'currently reading'
    );
    const wantBooks = booksData.filter((b) => b.status?.toLowerCase() === 'want to read');

    const totalPagesRead = readBooks.reduce((sum, b) => sum + (b.pages || 0), 0);

    return {
      readCount: readBooks.length,
      readingCount: readingBooks.length,
      wantCount: wantBooks.length,
      pagesRead: totalPagesRead.toLocaleString('en-US'),
    };
  }, []);

  // Filter books based on activeTab and searchQuery
  const filteredBooks = useMemo(() => {
    return booksData.filter((book) => {
      const s = book.status?.toLowerCase();
      const tab = activeTab.toLowerCase();

      let matchesTab = activeTab === 'All';
      if (tab === 'read') matchesTab = s === 'read';
      else if (tab === 'reading') matchesTab = s === 'reading' || s === 'currently reading';
      else if (tab === 'want to read') matchesTab = s === 'want to read';

      const matchesSearch =
        searchQuery.trim() === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.category && book.category.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  // Helper to render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.4;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="bk-star-filled">★</span>);
      } else if (i === fullStars && hasHalf) {
        stars.push(<span key={i} className="bk-star-filled">★</span>);
      } else {
        stars.push(<span key={i} className="bk-star-empty">★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="bk-page-wrapper">
      <BackgroundWatermark word="BOOKS" color="rgba(102, 0, 5, 0.095)" />
      <div className="b-bg-grid-overlay" aria-hidden="true" />

      <div className="bk-page-container">
        {/* HERO HEADER WITH OVERSIZED WATERMARK */}
        <header className="bk-hero-header">
          <div className="bk-hero-content">
            <span className="bk-eyebrow font-mono">— BOOKS — 001</span>
            <h1 className="bk-hero-title font-mono">Books</h1>
            <p className="bk-hero-lead font-sans">
              A personal collection of books, notes, and ideas that have shaped how I think, design, and build.
            </p>
          </div>
        </header>

        {/* READING STATS SECTION */}
        <section className="bk-stats-section">
          <div className="bk-section-header font-mono">— READING STATS</div>
          <div className="bk-stats-grid">
            <div className="bk-stat-card">
              <span className="bk-stat-label font-mono">BOOKS READ</span>
              <span className="bk-stat-value font-mono">{stats.readCount}</span>
            </div>
            <div className="bk-stat-card">
              <span className="bk-stat-label font-mono">CURRENTLY READING</span>
              <span className="bk-stat-value font-mono">{stats.readingCount}</span>
            </div>
            <div className="bk-stat-card">
              <span className="bk-stat-label font-mono">WANT TO READ</span>
              <span className="bk-stat-value font-mono">{stats.wantCount}</span>
            </div>
            <div className="bk-stat-card">
              <span className="bk-stat-label font-mono">PAGES READ</span>
              <span className="bk-stat-value font-mono">{stats.pagesRead}</span>
            </div>
          </div>
        </section>

        {/* FILTER & SEARCH BAR */}
        <div className="bk-controls-bar">
          {/* TABS */}
          <div className="bk-tabs-bar font-mono">
            {['Read', 'Reading', 'Want to Read', 'All'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`bk-tab-btn ${activeTab === tab ? 'active' : ''}`}
              >
                <span>{tab.toUpperCase()}</span>
                {tab === 'Read' && <span className="bk-tab-count">({stats.readCount})</span>}
                {tab === 'Reading' && <span className="bk-tab-count">({stats.readingCount})</span>}
                {tab === 'Want to Read' && <span className="bk-tab-count">({stats.wantCount})</span>}
                {tab === 'All' && <span className="bk-tab-count">({booksData.length})</span>}
              </button>
            ))}
          </div>

          {/* SEARCH INPUT */}
          <div className="bk-search-wrapper">
            <svg className="bk-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by title, author, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bk-search-input font-mono"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="bk-clear-btn font-mono">✕</button>
            )}
          </div>
        </div>

        {/* BOOKS GRID */}
        {filteredBooks.length === 0 ? (
          <div className="bk-empty-state font-mono">
            <p>No books found matching your query.</p>
          </div>
        ) : (
          <div className="bk-books-grid">
            {filteredBooks.map((book) => (
              <article key={book.id || book.title} className="bk-book-card">
                {/* 3D BOOK COVER COMPONENT */}
                <div className="bk-cover-column">
                  <Framer3DBook
                    title={book.title}
                    author={book.author}
                    coverUrl={book.coverUrl}
                    spineColor={book.spineColor || '#660005'}
                  />
                </div>

                {/* BOOK DETAILS CONTENT */}
                <div className="bk-info-column">
                  <div className="bk-card-header font-mono">
                    <span className="bk-category-badge">{book.category || 'Non-Fiction'}</span>
                    <span className="bk-status-badge">{book.status?.toUpperCase()}</span>
                  </div>

                  <h2 className="bk-title font-mono">{book.title}</h2>
                  <p className="bk-author font-sans">by {book.author}</p>

                  {book.avgRating && (
                    <div className="bk-rating-row" title={`Rating: ${book.avgRating}/5`}>
                      <div className="bk-stars">{renderStars(book.avgRating)}</div>
                      <span className="bk-rating-num font-mono">{book.avgRating}</span>
                    </div>
                  )}

                  {book.takeaway && (
                    <p className="bk-takeaway font-sans">&ldquo;{book.takeaway}&rdquo;</p>
                  )}

                  <div className="bk-card-footer font-mono">
                    {book.pages && <span>{book.pages} pages</span>}
                    {book.year && <span>Published {book.year}</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
