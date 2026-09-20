'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../../components/Footer';

const TABS = [
  { id: 'certifications', label: 'Certificates' },
  { id: 'books', label: 'Books' },
  { id: 'epigraphs', label: 'Epigraphs' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'projects', label: 'Projects' },
  { id: 'guest-notes', label: 'Guest Notes Moderation' },
  { id: 'contact-messages', label: 'Contact Messages' }
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('certifications');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [fetchingBook, setFetchingBook] = useState(false);

  // Form states for each content type
  const [certForm, setCertForm] = useState({
    title: '', category: 'Financial Markets', readTime: 'SEBI Certified • 2026', issuer: '',
    year: '2026', badge: 'Certified', description: '', verifyUrl: '#', imageUrl: ''
  });

  const [bookForm, setBookForm] = useState({
    title: '', author: '', status: 'Read', pages: '', year: '', coverUrl: '', avgRating: ''
  });

  const [epiForm, setEpiForm] = useState({
    quote: '', author: '', source: '', type: 'DESIGN'
  });

  const [blogForm, setBlogForm] = useState({
    title: '', slug: '', date: new Date().toISOString().split('T')[0], readTime: '5 min read',
    category: 'Design Systems', summary: '', content: ''
  });

  const [projForm, setProjForm] = useState({
    title: '', category: 'Product Management', tagline: '', description: '', role: 'Solo PM & Builder',
    timeline: '2026', tools: 'React, Next.js, Python', metrics: '2-Week MVP', featured: true,
    slug: '', image: '', liveUrl: ''
  });

  const fetchItems = async (type) => {
    setLoading(true);
    setStatus('');
    try {
      const res = await fetch(`/api/admin/crud?type=${type}`);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setStatus('Failed to load items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(activeTab);
    resetForms();
  }, [activeTab]);

  const resetForms = () => {
    setEditingId(null);
    setCertForm({ title: '', category: 'Financial Markets', readTime: 'SEBI Certified • 2026', issuer: '', year: '2026', badge: 'Certified', description: '', verifyUrl: '#', imageUrl: '' });
    setBookForm({ title: '', author: '', status: 'Read', pages: '', year: '', coverUrl: '', avgRating: '' });
    setEpiForm({ quote: '', author: '', source: '', type: 'DESIGN' });
    setBlogForm({ title: '', slug: '', date: new Date().toISOString().split('T')[0], readTime: '5 min read', category: 'Design Systems', summary: '', content: '' });
    setProjForm({ title: '', category: 'Product Management', tagline: '', description: '', role: 'Solo PM & Builder', timeline: '2026', tools: 'React, Next.js, Python', metrics: '2-Week MVP', featured: true, slug: '', image: '', liveUrl: '' });
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // Google Books Auto-Fetch
  const handleFetchBookCover = async () => {
    if (!bookForm.title) {
      setStatus('Please enter a book title first.');
      return;
    }
    setFetchingBook(true);
    setStatus('Fetching details from Google Books API...');
    try {
      const queryParams = new URLSearchParams({ title: bookForm.title, author: bookForm.author || '' });
      const res = await fetch(`/api/admin/google-books?${queryParams.toString()}`);
      const data = await res.json();

      if (data.coverUrl || data.pages) {
        setBookForm(prev => ({
          ...prev,
          coverUrl: data.coverUrl || prev.coverUrl,
          pages: data.pages ? String(data.pages) : prev.pages,
          year: data.year ? String(data.year) : prev.year,
          title: data.title || prev.title,
          author: data.author || prev.author
        }));
        setStatus('Book details auto-populated from Google Books!');
      } else {
        setStatus('No Google Books match found. You can enter details manually.');
      }
    } catch (e) {
      setStatus('Error calling Google Books API.');
    } finally {
      setFetchingBook(false);
    }
  };

  // Submit Handler (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving...');

    let payload = {};
    if (activeTab === 'certifications') payload = { ...certForm };
    else if (activeTab === 'books') {
      payload = {
        ...bookForm,
        pages: bookForm.pages ? Number(bookForm.pages) : null,
        year: bookForm.year ? Number(bookForm.year) : null,
        avgRating: bookForm.avgRating ? Number(bookForm.avgRating) : null
      };
    } else if (activeTab === 'epigraphs') payload = { ...epiForm };
    else if (activeTab === 'blogs') {
      payload = {
        ...blogForm,
        slug: blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };
    } else if (activeTab === 'projects') {
      payload = {
        ...projForm,
        tools: typeof projForm.tools === 'string' ? projForm.tools.split(',').map(t => t.trim()).filter(Boolean) : projForm.tools,
        slug: projForm.slug || projForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };
    }

    if (editingId) payload.id = editingId;

    const method = editingId ? 'PUT' : 'POST';
    try {
      const res = await fetch('/api/admin/crud', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTab, item: payload })
      });

      if (res.ok) {
        setStatus(editingId ? 'Item updated successfully!' : 'New item appended to the END of the list!');
        resetForms();
        fetchItems(activeTab);
      } else {
        const err = await res.json();
        setStatus(`Error: ${err.error || 'Failed to save'}`);
      }
    } catch (e) {
      setStatus('Network failure while saving.');
    }
  };

  // Edit Click Handler
  const handleEdit = (item) => {
    setEditingId(item.id);
    if (activeTab === 'certifications') setCertForm({ ...item });
    else if (activeTab === 'books') setBookForm({ ...item, pages: item.pages || '', year: item.year || '', avgRating: item.avgRating || '' });
    else if (activeTab === 'epigraphs') setEpiForm({ ...item });
    else if (activeTab === 'blogs') setBlogForm({ ...item });
    else if (activeTab === 'projects') setProjForm({ ...item, tools: Array.isArray(item.tools) ? item.tools.join(', ') : (item.tools || '') });
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  // Delete Click Handler
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/admin/crud?type=${activeTab}&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStatus('Item deleted.');
        fetchItems(activeTab);
      } else {
        setStatus('Failed to delete item.');
      }
    } catch (e) {
      setStatus('Network error deleting item.');
    }
  };

  // Guest Note Moderation Handlers
  const handleApproveNote = async (note) => {
    try {
      const updatedNote = { ...note, status: 'approved' };
      const res = await fetch('/api/admin/crud', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'guest-notes', item: updatedNote })
      });
      if (res.ok) {
        setStatus(`Note by ${note.name} approved!`);
        fetchItems('guest-notes');
      }
    } catch (e) {
      setStatus('Failed to approve note.');
    }
  };

  const handleRejectNote = async (id) => {
    if (!confirm('Reject and delete this note?')) return;
    try {
      const res = await fetch(`/api/admin/crud?type=guest-notes&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStatus('Note rejected and removed.');
        fetchItems('guest-notes');
      }
    } catch (e) {
      setStatus('Failed to reject note.');
    }
  };

  return (
    <div className="admin-wrapper">
      {/* Admin Header */}
      <div className="admin-header">
        <div className="container header-inner">
          <div>
            <span className="eyebrow">PORTFOLIO CONTROL CENTER</span>
            <h1 className="admin-title font-mono">Admin Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="btn-logout font-mono">
            LOGOUT ↵
          </button>
        </div>
      </div>

      <div className="container section-padding">
        {/* Navigation Tabs */}
        <div className="cms-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cms-tab font-mono ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label.toUpperCase()}
              {tab.id === 'guest-notes' && (
                <span className="badge-count">
                  {items.filter(i => i.status === 'pending').length}
                </span>
              )}
              {tab.id === 'contact-messages' && (
                <span className="badge-count">
                  {items.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {status && <div className="status-banner font-mono">{status}</div>}

        {/* Content Area */}
        {activeTab === 'contact-messages' ? (
          /* CONTACT MESSAGES PANEL */
          <div className="moderation-panel glass-panel">
            <h2 className="panel-title font-mono">Contact Form Submissions</h2>
            <p className="panel-subtitle">
              Messages submitted by visitors through the contact form on your website.
            </p>

            <div className="notes-list">
              {loading ? (
                <p className="loading font-mono">Loading messages...</p>
              ) : items.length === 0 ? (
                <p className="empty font-mono">No contact messages received yet.</p>
              ) : (
                items.map((msg) => (
                  <div key={msg.id} className="note-card approved" style={{ borderLeft: '4px solid #660005' }}>
                    <div className="note-header">
                      <div>
                        <strong className="note-name font-mono">{msg.name}</strong>
                        <span className="note-role font-mono"> • {msg.email}</span>
                        <span className="note-date font-mono"> ({msg.date ? new Date(msg.date).toLocaleString() : 'Recent'})</span>
                      </div>
                      <span className="status-badge font-mono approved">
                        {msg.subject || 'INQUIRY'}
                      </span>
                    </div>

                    <p className="note-message" style={{ marginTop: '0.75rem', fontWeight: 600 }}>
                      Subject: {msg.subject}
                    </p>
                    <p className="note-message" style={{ whiteSpace: 'pre-wrap' }}>
                      {msg.message}
                    </p>

                    <div className="note-actions" style={{ marginTop: '1rem' }}>
                      <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || '')}`} className="btn-approve font-mono" style={{ textDecoration: 'none' }}>
                        ✉ Reply via Email
                      </a>
                      <button onClick={() => handleDelete(msg.id)} className="btn-reject font-mono">
                        ✕ Delete Message
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : activeTab === 'guest-notes' ? (
          /* GUEST NOTES MODERATION PANEL */
          <div className="moderation-panel glass-panel">
            <h2 className="panel-title font-mono">Guest Notes Moderation</h2>
            <p className="panel-subtitle">
              Public visitor notes require your approval before appearing on the live <code>/guest-notes</code> page.
            </p>

            <div className="notes-list">
              {loading ? (
                <p className="loading font-mono">Loading notes...</p>
              ) : items.length === 0 ? (
                <p className="empty font-mono">No guest notes found.</p>
              ) : (
                items.map((note) => (
                  <div key={note.id} className={`note-card ${note.status || 'approved'}`}>
                    <div className="note-header">
                      <div>
                        <strong className="note-name font-mono">{note.name}</strong>
                        <span className="note-role font-mono"> • {note.role || 'Visitor'}</span>
                        <span className="note-date font-mono"> ({note.date})</span>
                      </div>
                      <span className={`status-badge font-mono ${note.status === 'pending' ? 'pending' : 'approved'}`}>
                        {note.status ? note.status.toUpperCase() : 'APPROVED'}
                      </span>
                    </div>

                    <p className="note-message">"{note.message}"</p>

                    <div className="note-actions">
                      {note.status === 'pending' && (
                        <button onClick={() => handleApproveNote(note)} className="btn-approve font-mono">
                          ✓ Approve & Publish
                        </button>
                      )}
                      <button onClick={() => handleRejectNote(note.id)} className="btn-reject font-mono">
                        ✕ Reject & Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* STANDARD CONTENT CRUD PANEL (Certificates, Books, Epigraphs, Blogs, Projects) */
          <div className="admin-grid">
            {/* Form Section */}
            <div className="cms-form-card glass-panel">
              <div className="form-card-header">
                <h2 className="panel-title font-mono">
                  {editingId ? `Edit ${activeTab.slice(0, -1).toUpperCase()}` : `Add New ${activeTab.slice(0, -1).toUpperCase()}`}
                </h2>
                {editingId && (
                  <button onClick={resetForms} className="btn-cancel font-mono">
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="cms-form">
                {/* CERTIFICATES FORM */}
                {activeTab === 'certifications' && (
                  <>
                    <div className="form-group">
                      <label className="form-label font-mono">TITLE</label>
                      <input type="text" required value={certForm.title} onChange={e => setCertForm({ ...certForm, title: e.target.value })} className="form-input" placeholder="e.g. NISM Series VIII" />
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">ISSUER</label>
                      <input type="text" required value={certForm.issuer} onChange={e => setCertForm({ ...certForm, issuer: e.target.value })} className="form-input" placeholder="e.g. NISM / AWS / Google" />
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label font-mono">CATEGORY</label>
                        <input type="text" value={certForm.category} onChange={e => setCertForm({ ...certForm, category: e.target.value })} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label font-mono">YEAR</label>
                        <input type="text" value={certForm.year} onChange={e => setCertForm({ ...certForm, year: e.target.value })} className="form-input" />
                      </div>
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label font-mono">READ TIME / SUBTITLE</label>
                        <input type="text" value={certForm.readTime} onChange={e => setCertForm({ ...certForm, readTime: e.target.value })} className="form-input" placeholder="e.g. SEBI Certified • Nov 2025" />
                      </div>
                      <div className="form-group">
                        <label className="form-label font-mono">BADGE</label>
                        <input type="text" value={certForm.badge} onChange={e => setCertForm({ ...certForm, badge: e.target.value })} className="form-input" placeholder="NISM / SILVER / etc." />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">VERIFY URL</label>
                      <input type="text" value={certForm.verifyUrl} onChange={e => setCertForm({ ...certForm, verifyUrl: e.target.value })} className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">IMAGE / COVER URL</label>
                      <input type="text" value={certForm.imageUrl} onChange={e => setCertForm({ ...certForm, imageUrl: e.target.value })} className="form-input" placeholder="/images/certifications/name.jpg" />
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">DESCRIPTION</label>
                      <textarea rows={3} value={certForm.description} onChange={e => setCertForm({ ...certForm, description: e.target.value })} className="form-input textarea" />
                    </div>
                  </>
                )}

                {/* BOOKS FORM */}
                {activeTab === 'books' && (
                  <>
                    <div className="form-group">
                      <label className="form-label font-mono">BOOK TITLE</label>
                      <div className="input-with-btn">
                        <input type="text" required value={bookForm.title} onChange={e => setBookForm({ ...bookForm, title: e.target.value })} className="form-input" placeholder="e.g. Atomic Habits" />
                        <button type="button" onClick={handleFetchBookCover} disabled={fetchingBook} className="btn-auto-fetch font-mono">
                          {fetchingBook ? 'FETCHING...' : '⚡ AUTO COVER'}
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">AUTHOR</label>
                      <input type="text" required value={bookForm.author} onChange={e => setBookForm({ ...bookForm, author: e.target.value })} className="form-input" placeholder="e.g. James Clear" />
                    </div>
                    <div className="grid-3">
                      <div className="form-group">
                        <label className="form-label font-mono">STATUS</label>
                        <select value={bookForm.status} onChange={e => setBookForm({ ...bookForm, status: e.target.value })} className="form-input">
                          <option>Read</option>
                          <option>Currently Reading</option>
                          <option>Want to Read</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label font-mono">PAGES</label>
                        <input type="number" value={bookForm.pages} onChange={e => setBookForm({ ...bookForm, pages: e.target.value })} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label font-mono">YEAR</label>
                        <input type="number" value={bookForm.year} onChange={e => setBookForm({ ...bookForm, year: e.target.value })} className="form-input" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">COVER IMAGE URL</label>
                      <input type="text" value={bookForm.coverUrl} onChange={e => setBookForm({ ...bookForm, coverUrl: e.target.value })} className="form-input" placeholder="https://..." />
                    </div>
                  </>
                )}

                {/* EPIGRAPHS FORM */}
                {activeTab === 'epigraphs' && (
                  <>
                    <div className="form-group">
                      <label className="form-label font-mono">QUOTE</label>
                      <textarea required rows={3} value={epiForm.quote} onChange={e => setEpiForm({ ...epiForm, quote: e.target.value })} className="form-input textarea" placeholder="Enter memorable quote..." />
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label font-mono">AUTHOR</label>
                        <input type="text" required value={epiForm.author} onChange={e => setEpiForm({ ...epiForm, author: e.target.value })} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label font-mono">TYPE</label>
                        <input type="text" value={epiForm.type} onChange={e => setEpiForm({ ...epiForm, type: e.target.value })} className="form-input" placeholder="BOOK / DESIGN / FILM" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">SOURCE WORK</label>
                      <input type="text" value={epiForm.source} onChange={e => setEpiForm({ ...epiForm, source: e.target.value })} className="form-input" placeholder="e.g. The Laws of Simplicity" />
                    </div>
                  </>
                )}

                {/* BLOGS FORM */}
                {activeTab === 'blogs' && (
                  <>
                    <div className="form-group">
                      <label className="form-label font-mono">BLOG TITLE</label>
                      <input type="text" required value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} className="form-input" />
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label font-mono">CATEGORY</label>
                        <input type="text" value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value })} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label font-mono">READ TIME</label>
                        <input type="text" value={blogForm.readTime} onChange={e => setBlogForm({ ...blogForm, readTime: e.target.value })} className="form-input" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">SUMMARY</label>
                      <textarea rows={2} value={blogForm.summary} onChange={e => setBlogForm({ ...blogForm, summary: e.target.value })} className="form-input textarea" />
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">FULL CONTENT</label>
                      <textarea rows={5} value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} className="form-input textarea" />
                    </div>
                  </>
                )}

                {/* PROJECTS FORM */}
                {activeTab === 'projects' && (
                  <>
                    <div className="form-group">
                      <label className="form-label font-mono">PROJECT TITLE</label>
                      <input type="text" required value={projForm.title} onChange={e => setProjForm({ ...projForm, title: e.target.value })} className="form-input" />
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label font-mono">CATEGORY</label>
                        <input type="text" value={projForm.category} onChange={e => setProjForm({ ...projForm, category: e.target.value })} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label font-mono">TIMELINE / YEAR</label>
                        <input type="text" value={projForm.timeline} onChange={e => setProjForm({ ...projForm, timeline: e.target.value })} className="form-input" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">TAGLINE</label>
                      <input type="text" value={projForm.tagline} onChange={e => setProjForm({ ...projForm, tagline: e.target.value })} className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">DESCRIPTION</label>
                      <textarea rows={3} value={projForm.description} onChange={e => setProjForm({ ...projForm, description: e.target.value })} className="form-input textarea" />
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">LIVE URL</label>
                      <input type="text" value={projForm.liveUrl} onChange={e => setProjForm({ ...projForm, liveUrl: e.target.value })} className="form-input" placeholder="https://..." />
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">COVER IMAGE PATH</label>
                      <input type="text" value={projForm.image} onChange={e => setProjForm({ ...projForm, image: e.target.value })} className="form-input" placeholder="/images/projects/name.png" />
                    </div>
                    <div className="form-group">
                      <label className="form-label font-mono">TOOLS (COMMA SEPARATED)</label>
                      <input type="text" value={projForm.tools} onChange={e => setProjForm({ ...projForm, tools: e.target.value })} className="form-input" />
                    </div>
                  </>
                )}

                <button type="submit" className="btn-save font-mono">
                  {editingId ? 'UPDATE ITEM ↵' : 'APPEND TO END OF LIST ↵'}
                </button>
              </form>
            </div>

            {/* List Section */}
            <div className="cms-list-card glass-panel">
              <h2 className="panel-title font-mono">
                Existing Items ({items.length})
              </h2>

              {loading ? (
                <p className="loading font-mono">Loading data...</p>
              ) : items.length === 0 ? (
                <p className="empty font-mono">No items found.</p>
              ) : (
                <div className="items-list">
                  {items.map((item, idx) => (
                    <div key={item.id || idx} className="item-row">
                      <span className="item-num font-mono">#{idx + 1}</span>
                      <div className="item-info">
                        <h3 className="item-name font-mono">{item.title || item.name || item.quote}</h3>
                        <span className="item-sub font-mono">
                          {item.author || item.issuer || item.category || item.source}
                        </span>
                      </div>
                      <div className="item-controls">
                        <button onClick={() => handleEdit(item)} className="btn-edit font-mono">EDIT</button>
                        <button onClick={() => handleDelete(item.id)} className="btn-delete font-mono">DEL</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />

      <style jsx>{`
        .admin-wrapper { padding-top: 80px; background: #080808; min-height: 100vh; color: #fff; }
        .admin-header { padding: 3rem 0; background: #0d0d0d; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .header-inner { display: flex; justify-content: space-between; align-items: center; }
        .admin-title { font-size: 2.5rem; margin-top: 0.25rem; }
        .btn-logout { background: rgba(255, 68, 68, 0.1); border: 1px solid rgba(255, 68, 68, 0.3); color: #ff4444; padding: 0.6rem 1.25rem; border-radius: 4px; cursor: pointer; }
        .btn-logout:hover { background: rgba(255, 68, 68, 0.2); }

        .cms-tabs { display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .cms-tab { padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; color: #888; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
        .cms-tab.active { background: rgba(204, 255, 0, 0.08); border-color: var(--accent-neon, #ccff00); color: var(--accent-neon, #ccff00); }
        .badge-count { background: var(--accent-neon, #ccff00); color: #000; padding: 0.1rem 0.4rem; border-radius: 10px; font-size: 0.75rem; font-weight: bold; }

        .status-banner { padding: 0.75rem 1rem; background: rgba(204, 255, 0, 0.1); border: 1px solid var(--accent-neon, #ccff00); color: var(--accent-neon, #ccff00); margin-bottom: 2rem; border-radius: 4px; font-size: 0.85rem; }

        .admin-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 2.5rem; align-items: start; }
        .cms-form-card, .cms-list-card, .moderation-panel { padding: 2rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; }

        .form-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.75rem; }
        .panel-title { font-size: 1.25rem; }
        .panel-subtitle { color: #888; margin-bottom: 1.5rem; font-size: 0.9rem; }
        .btn-cancel { background: transparent; border: none; color: #ff6666; cursor: pointer; text-decoration: underline; font-size: 0.8rem; }

        .cms-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
        .form-label { font-size: 0.7rem; color: #888; letter-spacing: 0.08em; }
        .form-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 4px; padding: 0.7rem 0.9rem; color: #fff; font-size: 0.9rem; outline: none; }
        .form-input:focus { border-color: var(--accent-neon, #ccff00); }
        .textarea { resize: vertical; }

        .input-with-btn { display: flex; gap: 0.5rem; }
        .btn-auto-fetch { background: rgba(204, 255, 0, 0.15); border: 1px solid var(--accent-neon, #ccff00); color: var(--accent-neon, #ccff00); padding: 0 0.8rem; white-space: nowrap; font-size: 0.75rem; border-radius: 4px; cursor: pointer; }
        .btn-auto-fetch:hover { background: rgba(204, 255, 0, 0.25); }

        .btn-save { margin-top: 1rem; padding: 0.9rem; background: var(--accent-neon, #ccff00); border: none; color: #000; font-weight: bold; font-size: 0.9rem; border-radius: 4px; cursor: pointer; }
        .btn-save:hover { opacity: 0.9; }

        .items-list { display: flex; flex-direction: column; gap: 0.75rem; max-height: 650px; overflow-y: auto; padding-right: 0.25rem; }
        .item-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.8rem 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; }
        .item-num { font-size: 0.75rem; color: var(--accent-neon, #ccff00); min-width: 30px; }
        .item-info { flex: 1; min-width: 0; }
        .item-name { font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .item-sub { font-size: 0.75rem; color: #777; display: block; }
        .item-controls { display: flex; gap: 0.4rem; }
        .btn-edit, .btn-delete { padding: 0.3rem 0.6rem; font-size: 0.7rem; border-radius: 3px; cursor: pointer; }
        .btn-edit { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; }
        .btn-delete { background: rgba(255,68,68,0.1); border: 1px solid rgba(255,68,68,0.3); color: #ff6666; }

        /* Moderation Panel Styles */
        .notes-list { display: flex; flex-direction: column; gap: 1rem; }
        .note-card { padding: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; }
        .note-card.pending { border-color: rgba(204, 255, 0, 0.4); background: rgba(204, 255, 0, 0.02); }
        .note-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
        .note-name { font-size: 1rem; color: #fff; }
        .note-role, .note-date { color: #888; font-size: 0.8rem; }
        .status-badge { font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 3px; }
        .status-badge.pending { background: rgba(204, 255, 0, 0.2); color: var(--accent-neon, #ccff00); border: 1px solid var(--accent-neon, #ccff00); }
        .status-badge.approved { background: rgba(255,255,255,0.1); color: #aaa; }
        .note-message { font-style: italic; color: #ddd; margin-bottom: 1rem; line-height: 1.5; font-size: 0.95rem; }
        .note-actions { display: flex; gap: 0.75rem; }
        .btn-approve { background: var(--accent-neon, #ccff00); color: #000; font-weight: bold; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem; }
        .btn-reject { background: rgba(255,68,68,0.1); border: 1px solid rgba(255,68,68,0.3); color: #ff6666; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem; }

        @media (max-width: 900px) {
          .admin-grid { grid-template-columns: 1fr; }
          .grid-2, .grid-3 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
