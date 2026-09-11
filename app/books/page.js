import booksData from '../../data/books.json';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Bookshelf & Reading List — Dhwani Sagar',
  description: 'Curated bookshelf, reading list, and notes on design, psychology, and software by Dhwani Sagar.',
};

export default function BooksPage() {
  return (
    <div className="subpage-wrapper">
      <div className="subpage-header">
        <div className="container">
          <span className="eyebrow">READING & REFLECTIONS</span>
          <h1 className="subpage-title font-mono">Bookshelf</h1>
          <p className="subpage-lead">
            A curated list of books that have influenced my thinking across design, product philosophy, engineering, and human psychology.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="books-grid">
          {booksData.map((book) => (
            <div key={book.id} className="book-card glass-panel">
              <div className="book-top">
                <span className="book-category font-mono">{book.category}</span>
                <span className={`status-badge font-mono ${book.status.toLowerCase()}`}>
                  {book.status}
                </span>
              </div>

              <h2 className="book-title font-mono">{book.title}</h2>
              <span className="book-author">by {book.author}</span>

              <div className="rating-row font-mono">
                <span className="rating-label">RATING:</span>
                <span className="rating-val">{book.rating}</span>
              </div>

              <p className="book-notes">“{book.notes}”</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      <style>{`
        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .book-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .book-card:hover {
          transform: translateY(-3px);
          border-color: rgba(204, 255, 0, 0.3);
        }

        .book-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .book-category {
          font-size: 0.75rem;
          color: var(--accent-neon);
        }

        .status-badge {
          font-size: 0.7rem;
          padding: 0.25rem 0.6rem;
          border-radius: 100px;
          border: 1px solid var(--border-subtle);
        }

        .status-badge.read {
          background: rgba(204, 255, 0, 0.08);
          color: var(--accent-neon);
          border-color: rgba(204, 255, 0, 0.3);
        }

        .status-badge.reading {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .book-title {
          font-size: 1.35rem;
          color: var(--text-primary);
        }

        .book-author {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
        }

        .rating-label { color: var(--text-muted); }
        .rating-val { color: var(--accent-neon); font-weight: 600; }

        .book-notes {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          font-style: italic;
        }

        @media (max-width: 768px) {
          .books-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
