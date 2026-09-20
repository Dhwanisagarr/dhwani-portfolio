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

  const contentParagraphs = Array.isArray(post.content)
    ? post.content
    : typeof post.content === 'string'
    ? post.content.split('\n\n')
    : [];

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
            {post.author && (
              <>
                <span>•</span>
                <span className="author">By {post.author}</span>
              </>
            )}
          </div>

          <h1 className="article-title font-mono">{post.title}</h1>
        </div>
      </div>

      <div className="container section-padding">
        {post.coverImage && (
          <div className="article-cover-wrapper">
            <img src={post.coverImage} alt={post.title} className="article-cover-img" />
          </div>
        )}

        <div className="article-body">
          {post.summary && <p className="lead-paragraph">{post.summary}</p>}
          <div className="divider"></div>

          {contentParagraphs.map((para, idx) => {
            if (typeof para === 'string' && para.startsWith('## ')) {
              return (
                <h2 key={idx} className="article-subheading font-mono">
                  {para.replace(/^##\s*/, '')}
                </h2>
              );
            }
            return <p key={idx}>{para}</p>;
          })}
        </div>
      </div>

      <Footer />

      <style>{`
        .article-wrapper { padding-top: 100px; background: #080808; color: #fff; min-height: 100vh; }
        .article-header { padding: 4rem 0 3rem 0; background: #0d0d0d; border-bottom: 1px solid var(--border-subtle, rgba(255,255,255,0.1)); }
        .back-link { display: inline-block; font-size: 0.85rem; color: var(--accent-neon, #ccff00); text-decoration: none; margin-bottom: 1.5rem; }
        .back-link:hover { text-decoration: underline; }
        .meta-line { display: flex; gap: 0.5rem; font-size: 0.8rem; color: var(--text-muted, #888); margin-bottom: 1rem; flex-wrap: wrap; }
        .category { color: var(--accent-neon, #ccff00); }
        .author { color: #ddd; }
        .article-title { font-size: clamp(2.25rem, 5vw, 3.75rem); color: var(--text-primary, #fff); max-width: 850px; line-height: 1.2; }

        .article-cover-wrapper {
          max-width: 850px;
          margin: 0 auto 3rem auto;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .article-cover-img {
          width: 100%;
          height: auto;
          display: block;
        }

        .article-body {
          max-width: 750px;
          margin: 0 auto;
          font-size: 1.15rem;
          line-height: 1.85;
          color: var(--text-secondary, #ccc);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .lead-paragraph {
          font-size: 1.3rem;
          color: var(--text-primary, #fff);
          font-weight: 500;
          line-height: 1.6;
        }

        .article-subheading {
          font-size: 1.75rem;
          color: var(--accent-neon, #ccff00);
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .divider {
          height: 1px;
          background: var(--border-subtle, rgba(255,255,255,0.1));
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}
