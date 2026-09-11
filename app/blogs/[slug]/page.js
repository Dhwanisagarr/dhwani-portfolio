import Link from 'next/link';
import { notFound } from 'next/navigation';
import blogsData from '../../../data/blogs.json';
import Footer from '../../../components/Footer';

export async function generateStaticParams() {
  return blogsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = blogsData.find((b) => b.slug === resolvedParams.slug);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: `${post.title} — Dhwani Sagar Blog`,
    description: post.summary,
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const post = blogsData.find((b) => b.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="article-wrapper">
      <div className="article-header">
        <div className="container">
          <Link href="/blogs" className="back-link font-mono">
            ← Back to Articles
          </Link>

          <div className="meta-line font-mono">
            <span className="category">{post.category}</span>
            <span>•</span>
            <span className="date">{post.date}</span>
            <span>•</span>
            <span className="read-time">{post.readTime}</span>
          </div>

          <h1 className="article-title font-mono">{post.title}</h1>
        </div>
      </div>

      <div className="container section-padding">
        <div className="article-body">
          <p className="lead-paragraph">{post.summary}</p>
          <div className="divider"></div>
          <p>{post.content}</p>
          <p>
            When building complex software systems, design tokens provide a shared language between design and engineering. By structuring values into primitive, semantic, and component levels, teams eliminate friction during iteration.
          </p>
        </div>
      </div>

      <Footer />

      <style>{`
        .article-wrapper { padding-top: 100px; background: #080808; }
        .article-header { padding: 4rem 0 3rem 0; background: #0d0d0d; border-bottom: 1px solid var(--border-subtle); }
        .back-link { display: inline-block; font-size: 0.85rem; color: var(--accent-neon); text-decoration: none; margin-bottom: 1.5rem; }
        .meta-line { display: flex; gap: 0.5rem; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem; }
        .category { color: var(--accent-neon); }
        .article-title { font-size: clamp(2.25rem, 5vw, 3.75rem); color: var(--text-primary); max-width: 850px; }

        .article-body {
          max-width: 750px;
          margin: 0 auto;
          font-size: 1.15rem;
          line-height: 1.85;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .lead-paragraph {
          font-size: 1.3rem;
          color: var(--text-primary);
        }

        .divider {
          height: 1px;
          background: var(--border-subtle);
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}
