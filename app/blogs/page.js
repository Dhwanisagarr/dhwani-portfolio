import Link from 'next/link';
import blogsData from '../../data/blogs.json';
import Footer from '../../components/Footer';
import BackgroundWatermark from '../../components/BackgroundWatermark';

export const metadata = {
  title: 'Blogs & Essays — Dhwani Sagar',
  description: 'Articles, essays, and notes on design systems, engineering, and product thinking.',
};

export default function BlogsPage() {
  const renderBlogCard = (post) => {
    return (
      <Link
        key={post.id}
        href={`/blogs/${post.slug}`}
        className="b-card-light-pink"
      >
        {/* Cover Image Area */}
        <div 
          className="b-card-cover"
          style={{ 
            background: 'linear-gradient(135deg, #1b1220 0%, #0d0812 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {post.coverImage ? (
            <img 
              src={post.coverImage} 
              alt={post.title} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }} 
            />
          ) : (
            <div className="b-cover-watermark font-mono" aria-hidden="true">
              {post.category ? post.category.toUpperCase() : 'ESSAY'}
            </div>
          )}

          <div className="b-cover-top font-mono" style={{ zIndex: 2 }}>
            <span className="b-category-badge">{post.category}</span>
            <div className="b-framer-arrow-circle font-sans">
              <span className="b-framer-arrow-icon">↗</span>
            </div>
          </div>
        </div>

        {/* Card Body Content */}
        <div className="b-card-body">
          <div>
            <div className="b-card-meta font-mono">
              <span>{post.date}</span>
              <span className="b-meta-dot">•</span>
              <span>{post.readTime}</span>
            </div>

            <h2 className="b-card-title font-mono">{post.title}</h2>

            <p className="b-card-excerpt font-sans">{post.summary}</p>
          </div>

          <div className="b-card-cta-row">
            <span className="b-card-read-btn font-mono">
              <span>Read article</span>
              <span className="b-card-arrow">↗</span>
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="b-page-wrapper">
      <BackgroundWatermark word="BLOGS" color="rgba(102, 0, 5, 0.095)" />
      <div className="b-bg-grid-overlay" aria-hidden="true" />

      <div className="b-page-container">
        {/* EDITORIAL HERO HEADER */}
        <header className="b-hero-header">
          <span className="b-eyebrow font-mono">WRITING & ESSAYS</span>
          <h1 className="b-hero-title font-mono">BLOG</h1>
          <p className="b-hero-lead font-sans">
            Personal notes, reflections, and thoughts on product thinking, design systems, and software craft.
          </p>
        </header>

        {/* UNIFORM EQUAL-HEIGHT GRID FOR ALL BLOG CARDS */}
        <div className="b-blogs-grid">
          {blogsData.map((post) => renderBlogCard(post))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
