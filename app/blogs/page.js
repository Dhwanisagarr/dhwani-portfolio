import Link from 'next/link';
import blogsData from '../../data/blogs.json';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Blogs & Essays — Dhwani Sagar',
  description: 'Articles, essays, and notes on design systems, engineering, and product thinking.',
};

export default function BlogsPage() {
  return (
    <div className="subpage-wrapper">
      <div className="subpage-header">
        <div className="container">
          <span className="eyebrow">WRITING & ESSAYS</span>
          <h1 className="subpage-title font-mono">Blogs</h1>
          <p className="subpage-lead">
            Thoughts, reflections, and technical notes on product thinking, design tokens, and frontend engineering.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="blogs-list">
          {blogsData.map((post) => (
            <article key={post.id} className="blog-card glass-panel">
              <div className="card-meta font-mono">
                <span className="category-tag">{post.category}</span>
                <span className="read-time">• {post.readTime}</span>
                <span className="date-tag">• {post.date}</span>
              </div>

              <h2 className="blog-title font-mono">
                <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="blog-summary">{post.summary}</p>

              <Link href={`/blogs/${post.slug}`} className="read-link font-mono">
                <span>Read Full Article</span>
                <span>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <Footer />

      <style>{`
        .blogs-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .blog-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .blog-card:hover {
          transform: translateY(-3px);
          border-color: rgba(204, 255, 0, 0.3);
        }

        .card-meta {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: flex;
          gap: 0.5rem;
        }

        .category-tag {
          color: var(--accent-neon);
        }

        .blog-title {
          font-size: 1.75rem;
        }

        .blog-title a {
          color: var(--text-primary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .blog-title a:hover {
          color: var(--accent-neon);
        }

        .blog-summary {
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        .read-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--accent-neon);
          text-decoration: none;
          margin-top: 0.5rem;
        }

        .read-link:hover {
          gap: 0.8rem;
        }
      `}</style>
    </div>
  );
}
