'use client';

import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';

export default function AdminPage() {
  const [activeType, setActiveType] = useState('projects');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  // Form state for creating new project
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Design & Frontend',
    tagline: '',
    description: '',
    role: 'Product Designer & Developer',
    timeline: '2026',
    tools: 'React, Figma, JavaScript',
    metrics: '99+ Performance Score',
    slug: ''
  });

  const loadData = async (type) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cms?type=${type}`);
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(activeType);
  }, [activeType]);

  const handleAddProject = async (e) => {
    e.preventDefault();
    setStatus('Saving project...');

    const payload = {
      ...newProject,
      tools: newProject.tools.split(',').map(t => t.trim()),
      slug: newProject.slug || newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };

    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'projects', item: payload })
      });

      if (res.ok) {
        setStatus('Project added successfully to data store!');
        setNewProject({
          title: '', category: 'Design & Frontend', tagline: '', description: '',
          role: 'Product Designer & Developer', timeline: '2026', tools: 'React, Figma', metrics: '', slug: ''
        });
        loadData('projects');
      } else {
        setStatus('Error adding project.');
      }
    } catch (e) {
      setStatus('Failed to connect to CMS route.');
    }
  };

  return (
    <div className="subpage-wrapper">
      <div className="subpage-header">
        <div className="container">
          <span className="eyebrow">PORTFOLIO CMS CONTROL PANEL</span>
          <h1 className="subpage-title font-mono">Admin Dashboard</h1>
          <p className="subpage-lead">
            Manage portfolio content, add project case studies, publish articles, and view guest notes.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        {/* Content Type Selector Tabs */}
        <div className="cms-tabs">
          {['projects', 'blogs', 'books', 'epigraphs', 'guest-notes'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`cms-tab font-mono ${activeType === t ? 'active' : ''}`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="admin-grid">
          {/* Form Area */}
          <div className="cms-form-card glass-panel">
            <h2 className="card-title font-mono">Add New {activeType.toUpperCase().slice(0, -1)}</h2>

            {status && <div className="status font-mono">{status}</div>}

            {activeType === 'projects' && (
              <form onSubmit={handleAddProject} className="cms-form">
                <div className="form-group">
                  <label className="form-label font-mono">PROJECT TITLE</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NeoVibe Dashboard"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label font-mono">CATEGORY</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="form-input"
                  >
                    <option>Design & Frontend</option>
                    <option>Product & Analytics</option>
                    <option>Development</option>
                    <option>Product Thinking</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label font-mono">TAGLINE</label>
                  <input
                    type="text"
                    required
                    placeholder="Short punchy summary..."
                    value={newProject.tagline}
                    onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label font-mono">DESCRIPTION</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Full project description..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="form-input textarea"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label font-mono">TOOLS (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    placeholder="Figma, React, Python, SQL"
                    value={newProject.tools}
                    onChange={(e) => setNewProject({ ...newProject, tools: e.target.value })}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn-primary full-width">
                  <span>Publish to Portfolio</span>
                  <span className="btn-icon">→</span>
                </button>
              </form>
            )}

            {activeType !== 'projects' && (
              <p className="hint-text font-mono">
                CMS management interface ready for {activeType}. Submissions post directly to local JSON models via <code>/api/cms</code>.
              </p>
            )}
          </div>

          {/* List Area */}
          <div className="cms-list-card glass-panel">
            <h2 className="card-title font-mono">Existing Items ({items.length})</h2>

            {loading ? (
              <p className="loading font-mono">Loading data...</p>
            ) : (
              <div className="items-list">
                {items.map((item, idx) => (
                  <div key={item.id || idx} className="item-row">
                    <span className="item-num font-mono">0{idx + 1}</span>
                    <div className="item-info">
                      <h3 className="item-name font-mono">{item.title || item.name || item.quote}</h3>
                      <span className="item-sub font-mono">{item.category || item.author || item.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .subpage-wrapper { padding-top: 100px; background: #080808; }
        .subpage-header { padding: 4rem 0 3rem 0; background: #0d0d0d; border-bottom: 1px solid var(--border-subtle); }
        .subpage-title { font-size: clamp(3rem, 6vw, 5rem); color: var(--text-primary); margin-bottom: 0.5rem; }
        .subpage-lead { font-size: 1.25rem; color: var(--text-secondary); max-width: 600px; }

        .cms-tabs {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .cms-tab {
          font-size: 0.85rem;
          padding: 0.6rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .cms-tab.active {
          background: rgba(204, 255, 0, 0.1);
          border-color: var(--accent-neon);
          color: var(--accent-neon);
        }

        .admin-grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .cms-form-card, .cms-list-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .card-title {
          font-size: 1.25rem;
          color: var(--text-primary);
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .status {
          font-size: 0.85rem;
          color: var(--accent-neon);
          padding: 0.6rem;
          background: rgba(204, 255, 0, 0.1);
          border: 1px solid var(--accent-neon);
          border-radius: 4px;
        }

        .cms-form {
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

        .form-input:focus { border-color: var(--accent-neon); }
        .textarea { resize: vertical; }
        .full-width { width: 100%; }

        .hint-text { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; }

        .items-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .item-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
        }

        .item-num {
          font-size: 0.75rem;
          color: var(--accent-neon);
        }

        .item-name {
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .item-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 992px) {
          .admin-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
