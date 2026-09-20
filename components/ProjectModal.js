'use client';

import { useState, useRef } from 'react';

const TABS = [
  { id: 'brief', label: 'Brief', num: '01' },
  { id: 'problem', label: 'Problem', num: '02' },
  { id: 'thinking', label: 'Thinking', num: '03' },
  { id: 'design', label: 'Design', num: '04' },
  { id: 'demo', label: 'Demo', num: '05' },
  { id: 'learnings', label: 'Learnings', num: '06' }
];

// Color Theme mapping per section requirement (Alternating RED and LIGHT PINK):
// BRIEF (RED) -> PROBLEM (LIGHT PINK) -> THINKING (RED) -> DESIGN (LIGHT PINK) -> DEMO (RED) -> LEARNINGS (LIGHT PINK)
const THEMES = {
  brief: {
    bg: '#660005',            // Primary Red Modal Background
    text: '#FEFEFC',          // Creamish White (for Section Heading outside boxes)
    subText: '#F2D9DA',        // Soft Pink (for subtitle outside boxes)
    cardBg: '#660005',        // Deep Red Card Container
    cardBorder: 'rgba(254, 254, 252, 0.25)',
    boxBg: '#FEFEFC',          // Creamy Box Background
    boxText: '#2B0608',        // Rich Dark Red text inside cream boxes
    boxSubText: '#660005',     // Primary Red labels inside cream boxes
    boxBorder: 'rgba(102, 0, 5, 0.15)',
    badgeBg: '#FEFEFC',
    badgeText: '#660005',
    closeBg: '#FEFEFC',
    closeText: '#660005'
  },
  problem: {
    bg: '#E3BDBE',            // Light Pink
    text: '#660005',          // Primary Red
    subText: '#660005',        // Deep Red
    cardBg: '#FEFEFC',        // Creamish White Card Container
    cardBorder: 'rgba(102, 0, 5, 0.2)',
    boxBg: '#F2D9DA',         // Soft Pink Boxes
    boxText: '#660005',
    boxSubText: '#660005',
    boxBorder: 'rgba(102, 0, 5, 0.15)',
    badgeBg: '#660005',
    badgeText: '#FEFEFC',
    closeBg: '#660005',
    closeText: '#FEFEFC'
  },
  thinking: {
    bg: '#660005',            // Primary Red Modal Background
    text: '#FEFEFC',          // Creamish White
    subText: '#F2D9DA',        // Soft Pink
    cardBg: '#660005',        // Deep Red Card Container
    cardBorder: 'rgba(254, 254, 252, 0.25)',
    boxBg: '#FEFEFC',          // Creamy Box Background
    boxText: '#2B0608',        // Rich Dark Red text inside cream boxes
    boxSubText: '#660005',     // Primary Red labels inside cream boxes
    boxBorder: 'rgba(102, 0, 5, 0.15)',
    badgeBg: '#FEFEFC',
    badgeText: '#660005',
    closeBg: '#FEFEFC',
    closeText: '#660005'
  },
  design: {
    bg: '#E3BDBE',            // Light Pink
    text: '#660005',          // Primary Red
    subText: '#660005',        // Deep Red
    cardBg: '#FEFEFC',        // Creamish White Card Container
    cardBorder: 'rgba(102, 0, 5, 0.2)',
    boxBg: '#F2D9DA',         // Soft Pink Boxes
    boxText: '#660005',
    boxSubText: '#660005',
    boxBorder: 'rgba(102, 0, 5, 0.15)',
    badgeBg: '#660005',
    badgeText: '#FEFEFC',
    closeBg: '#660005',
    closeText: '#FEFEFC'
  },
  demo: {
    bg: '#660005',            // Primary Red Modal Background
    text: '#FEFEFC',          // Creamish White
    subText: '#F2D9DA',        // Soft Pink
    cardBg: '#660005',        // Deep Red Card Container
    cardBorder: 'rgba(254, 254, 252, 0.25)',
    boxBg: '#FEFEFC',          // Creamy Box Background
    boxText: '#2B0608',        // Rich Dark Red text inside cream boxes
    boxSubText: '#660005',     // Primary Red labels inside cream boxes
    boxBorder: 'rgba(102, 0, 5, 0.15)',
    badgeBg: '#FEFEFC',
    badgeText: '#660005',
    closeBg: '#FEFEFC',
    closeText: '#660005'
  },
  learnings: {
    bg: '#E3BDBE',            // Light Pink
    text: '#660005',          // Primary Red
    subText: '#660005',        // Deep Red
    cardBg: '#FEFEFC',        // Creamish White Card Container
    cardBorder: 'rgba(102, 0, 5, 0.2)',
    boxBg: '#F2D9DA',         // Soft Pink Boxes
    boxText: '#660005',
    boxSubText: '#660005',
    boxBorder: 'rgba(102, 0, 5, 0.15)',
    badgeBg: '#660005',
    badgeText: '#FEFEFC',
    closeBg: '#660005',
    closeText: '#FEFEFC'
  }
};

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('brief');
  const scrollContainerRef = useRef(null);

  // Switch visible section content inside the modal
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!project) return null;

  const currentTheme = THEMES[activeTab] || THEMES.brief;
  const isProductThinking = project.id === 'product-thinking-teardowns' || project.slug === 'product-thinking-teardowns' || (project.title && project.title.toLowerCase().includes('teardowns'));
  const isSignalDesk = project.id === 'signaldesk' || project.slug === 'signaldesk' || (project.title && project.title.toLowerCase().includes('signal'));
  const isDahlia = project.id === 'dahlia' || project.slug === 'dahlia' || (project.title && project.title.toLowerCase().includes('dahlia')) || project.id === 'text-summariser' || project.slug === 'text-summariser';
  const isStreakUp = project.id === 'streakup' || project.slug === 'streakup' || (project.title && project.title.toLowerCase().includes('streak'));
  const isSpeechPain = project.id === 'cp-speech-pain' || project.slug === 'cp-speech-pain' || (project.title && (project.title.toLowerCase().includes('speech') || project.title.toLowerCase().includes('cerebral') || project.title.toLowerCase().includes('pain')));
  const isTogether = project.id === 'together' || project.slug === 'together' || (project.title && (project.title.toLowerCase().includes('together') || project.title.toLowerCase().includes('fintech')));

  if (isProductThinking) {
    return (
      <div className="project-modal-backdrop" onClick={onClose}>
        <div 
          className="project-modal-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          {/* SINGLE HEADER FOR PRODUCT TEARDOWNS */}
          <div className="modal-tab-header">
            <div className="tab-buttons-row">
              <span className="modal-folder-tab font-mono tab-active" style={{ background: '#660005', color: '#FEFEFC' }}>
                NOTION KNOWLEDGE BASE
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="modal-close-btn font-mono"
              aria-label="Close Case Study"
            >
              ✕
            </button>
          </div>

          <div 
            className="project-modal-dialog" 
            style={{
              background: '#660005',
              color: '#FEFEFC',
              borderColor: 'rgba(254, 254, 252, 0.25)'
            }}
          >
            <div className="modal-body-scroll font-sans" style={{ padding: '2rem' }}>
              <div 
                className="clean-card"
                style={{
                  background: '#660005',
                  borderColor: 'rgba(254, 254, 252, 0.25)',
                  color: '#FEFEFC'
                }}
              >
                <h2 className="clean-main-title font-serif" style={{ fontSize: '2rem', color: '#FEFEFC', marginBottom: '1rem' }}>
                  Product Thinking &amp; Teardowns
                </h2>
                <p className="clean-lead font-sans" style={{ fontSize: '1.1rem', color: '#F2D9DA', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  A collection of product analyses and case studies exploring how existing digital products can be improved through user-focused thinking, feature analysis, and product strategy. Includes teardowns and improvement ideas for products such as Google, CRED, Slice, Stripe, and Groww.
                </p>

                <div style={{ marginBottom: '2rem' }}>
                  <a
                    href="https://pickled-chair-247.notion.site/Product-Thinking-Teardowns-3e0900d91be98010a138e2571183e521"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-pill font-mono"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#FEFEFC',
                      color: '#660005',
                      textDecoration: 'none',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      padding: '0.85rem 1.6rem',
                      borderRadius: '999px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
                    }}
                  >
                    🚀 Open Full Notion Documentation ↗
                  </a>
                </div>

                <div className="clean-box" style={{ background: '#FEFEFC', color: '#2B0608', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem' }}>
                  <h4 className="clean-label font-mono" style={{ color: '#660005', fontWeight: 800, marginBottom: '0.5rem' }}>Published Teardowns</h4>
                  <ul className="clean-bullets font-sans" style={{ color: '#2B0608', lineHeight: 1.6, margin: 0, paddingLeft: '1.2rem' }}>
                    <li>• Google: Search &amp; Discovery Friction Audit</li>
                    <li>• CRED: Payment Funnel &amp; Gamification Teardown</li>
                    <li>• Slice: Credit Card Onboarding &amp; UX Breakdown</li>
                    <li>• Stripe: Developer Portal &amp; Integration UX Analysis</li>
                    <li>• Groww: Investment Onboarding &amp; Retention Strategy</li>
                  </ul>
                </div>

                <div className="clean-box" style={{ background: '#FEFEFC', color: '#2B0608', borderRadius: '12px', padding: '1.25rem' }}>
                  <h4 className="clean-label font-mono" style={{ color: '#660005', fontWeight: 800, marginBottom: '0.5rem' }}>Core Methodology</h4>
                  <p className="clean-text" style={{ color: '#2B0608', margin: 0, lineHeight: 1.6 }}>
                    Every teardown evaluates 5 core dimensions: Onboarding Velocity, Core Value Loop, Growth/Retention Levers, UX Friction Points, and Strategic Product Opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div 
        className="project-modal-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP TAB BAR NAVIGATION (Folder index tabs sitting directly above card) */}
        <div className="modal-tab-header">
          <div className="tab-buttons-row">
            {TABS.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              // Alternating tab colors: Red, Light Pink, Red, Light Pink, Red, Light Pink
              const isRedTab = idx % 2 === 0;
              const tabBg = isRedTab ? '#660005' : '#F2D9DA';
              const tabColor = isRedTab ? '#FEFEFC' : '#660005';

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab.id)}
                  className={`modal-folder-tab font-sans ${isActive ? 'tab-active' : ''}`}
                  style={{
                    background: tabBg,
                    color: tabColor,
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={onClose}
            className="modal-close-btn font-mono"
            aria-label="Close Case Study"
          >
            ✕
          </button>
        </div>

        {/* MAIN MODAL CARD BODY (Directly connected to the folder tabs above) */}
        <div 
          className="project-modal-dialog" 
          style={{
            background: currentTheme.bg,
            color: currentTheme.text,
            borderColor: currentTheme.cardBorder
          }}
        >
          {/* MODAL SCROLLABLE BODY CANVAS */}
          <div ref={scrollContainerRef} className="modal-body-scroll font-sans">

            {/* ACTIVE TAB SECTION DISPLAY */}
            <div className="active-section-container">
              {/* SECTION 01 — BRIEF */}
              {activeTab === 'brief' && (
                <section id="modal-section-brief" className="modal-case-section">
                  <div className="section-badge-header font-mono">
                    <span 
                      className="badge-num"
                      style={{ background: currentTheme.badgeBg, color: currentTheme.badgeText }}
                    >
                      01
                    </span>
                    <span className="badge-title" style={{ color: currentTheme.text }}>BRIEF</span>
                  </div>

                  {isSignalDesk ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h2 className="clean-main-title font-serif">SignalDesk</h2>
                      <p className="clean-lead font-sans">
                        A Voice-of-Customer tool that turns messy customer feedback into prioritized product issues backed by evidence.
                      </p>

                      <div style={{ marginBottom: '1.25rem' }}>
                        <a
                          href="https://signaldesk.streamlit.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-pill font-mono"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            background: currentTheme.boxBg,
                            borderColor: currentTheme.boxBorder || currentTheme.cardBorder,
                            color: currentTheme.boxText || currentTheme.text,
                            textDecoration: 'none',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '999px'
                          }}
                        >
                          🚀 Launch Live App: signaldesk.streamlit.app ↗
                        </a>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Goal</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Help PMs move from “What are customers saying?” to “What should we fix?”
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Built with</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Python · Streamlit · SQLite · Pandas · Scikit-learn · Pytest
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Context</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Built in 2 weeks as a solo MVP during Singula’s 4PM program. This is a concept project (not deployed to production). Target users: PMs and founders in B2B SaaS who juggle feedback across tickets, surveys, and reviews.
                        </p>
                      </div>
                    </div>
                  ) : isDahlia ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h2 className="clean-main-title font-serif">DAHLIA — A Personal Memory Garden</h2>
                      <p className="clean-lead font-sans">
                        DAHLIA turns everyday photos into a quiet, visual record of the year—one memory per day, one growing garden.
                      </p>

                      <div style={{ marginBottom: '1.25rem' }}>
                        <a
                          href="https://mydahlia.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-pill font-mono"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            background: currentTheme.boxBg,
                            borderColor: currentTheme.boxBorder || currentTheme.cardBorder,
                            color: currentTheme.boxText || currentTheme.text,
                            textDecoration: 'none',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '999px'
                          }}
                        >
                          🚀 Launch Live App: mydahlia.vercel.app ↗
                        </a>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Why This Exists</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Camera rolls are full, but memories feel invisible. Journals and productivity trackers add pressure: streaks, consistency, “perform your life.”
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>DAHLIA is designed to be</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Calm instead of productive</li>
                          <li>• Private instead of public</li>
                          <li>• For ordinary days, not highlight reels</li>
                        </ul>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Target User</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Someone who wants to document life through photos without maintaining a detailed journal or feeding a social feed.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Built with</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Next.js · React · JavaScript · CSS · IndexedDB / browser storage · Vercel
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Context &amp; Build Notes</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Timeline: 2 weeks, solo (product + design + front-end).<br />
                          Constraints: concept prototype, no real users yet; memories stored locally (no cross-device sync); scope limited to core flow.
                        </p>
                      </div>
                    </div>
                  ) : isStreakUp ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h2 className="clean-main-title font-serif">StreakUp — Challenge-Based Habit Tracker</h2>
                      <p className="clean-lead font-sans">
                        StreakUp is a challenge-based habit tracker built around showing progress, not just checking boxes.
                      </p>

                      <div style={{ marginBottom: '1.25rem' }}>
                        <a
                          href="https://streak-up-streakup.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-pill font-mono"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            background: currentTheme.boxBg,
                            borderColor: currentTheme.boxBorder || currentTheme.cardBorder,
                            color: currentTheme.boxText || currentTheme.text,
                            textDecoration: 'none',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '999px'
                          }}
                        >
                          🚀 Launch Live App: streak-up-streakup.vercel.app ↗
                        </a>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Backstory</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          I wanted a simpler way to stay consistent with things I actually care about, without turning them into another boring habit list.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Goal</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Make consistency feel visible, flexible, and motivating.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Technologies</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          React · JavaScript · Local Storage · CSS
                        </p>
                      </div>
                    </div>
                  ) : isSpeechPain ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h2 className="clean-main-title font-serif">Speech &amp; Pain Assessment ML for Cerebral Palsy</h2>
                      <p className="clean-lead font-sans">
                        A machine-learning application for speech clarity assessment and facial-expression-based pain detection for individuals with cerebral palsy.
                      </p>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Goal</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Explore how ML can analyse speech patterns and facial expressions to provide useful assessment results.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Technologies</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Next.js · React · TypeScript · FastAPI · Python · TensorFlow · InceptionV3 · KNN · MFCC · Librosa
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Context</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Originally developed as a college project. Since the original application was no longer available, I recreated it from the original project report and rebuilt it as a working web application.
                        </p>
                      </div>
                    </div>
                  ) : isTogether ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h2 className="clean-main-title font-serif">together. — AI Fintech Stack Optimizer</h2>
                      <p className="clean-lead font-sans">
                        An AI-powered fintech stack optimizer that helps users build and improve their financial app setup.
                      </p>

                      <div style={{ marginBottom: '1.25rem' }}>
                        <a
                          href="https://fintech-stack-nine.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-pill font-mono"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            background: currentTheme.boxBg,
                            borderColor: currentTheme.boxBorder || currentTheme.cardBorder,
                            color: currentTheme.boxText || currentTheme.text,
                            textDecoration: 'none',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '999px'
                          }}
                        >
                          🚀 Launch Live App: fintech-stack-nine.vercel.app ↗
                        </a>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Goal</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Help beginners understand what they use, what they need, and what they can simplify.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Technologies</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Next.js · React · TypeScript · Tailwind CSS · Framer Motion · Supabase · AI/LLM
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Context</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          As a beginner, I struggled to understand which fintech apps I actually needed and how they should work together. I created this to make that decision simpler.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="section-content-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="section-heading font-serif" style={{ color: currentTheme.text }}>
                        {project.title}
                      </h3>
                      <p className="body-text" style={{ color: currentTheme.subText }}>
                        {project.brief?.overview || project.description}
                      </p>
                    </div>
                  )}
                </section>
              )}

              {/* SECTION 02 — PROBLEM */}
              {activeTab === 'problem' && (
                <section id="modal-section-problem" className="modal-case-section">
                  <div className="section-badge-header font-mono">
                    <span 
                      className="badge-num"
                      style={{ background: currentTheme.badgeBg, color: currentTheme.badgeText }}
                    >
                      02
                    </span>
                    <span className="badge-title" style={{ color: currentTheme.text }}>PROBLEM</span>
                  </div>

                  {isSignalDesk ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">
                        Customer feedback is everywhere. Product insight isn’t.
                      </h3>

                      <p className="clean-body">
                        PMs collect feedback in support tickets, NPS surveys, app reviews, and sales calls—but recurring problems and important signals are hard to spot manually. Patterns drown in noise, and prioritization becomes gut-feel.
                      </p>

                      <div className="clean-tag-pill font-mono" style={{ background: currentTheme.boxBg, color: currentTheme.boxText || currentTheme.text, border: `1px solid ${currentTheme.boxBorder || currentTheme.cardBorder}` }}>
                        Users: PMs &amp; Founders
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>The challenge:</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Find what matters</li>
                          <li>• Understand why it matters</li>
                          <li>• Prove it with customer evidence</li>
                        </ul>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Constraints:</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• No access to production data; used synthetic + sample feedback datasets.</li>
                          <li>• Single-builder MVP in 2 weeks; scope limited to text feedback only.</li>
                          <li>• Avoided LLMs in v1 to keep results predictable, testable, and explainable.</li>
                          <li>• Concept project: not deployed to real teams; metrics are planned, not observed.</li>
                        </ul>
                      </div>
                    </div>
                  ) : isDahlia ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">
                        Camera rolls are full, but memories feel invisible.
                      </h3>

                      <p className="clean-body">
                        Journals and productivity trackers add pressure: streaks, consistency, “perform your life.” DAHLIA is designed to document ordinary days without the pressure of highlight reels or social feeds.
                      </p>

                      <div className="workflow-pill-bar font-mono" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <span className="pill-head" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>How It Works:</span>
                        <span style={{ color: currentTheme.boxText || currentTheme.text, fontWeight: 700 }}>
                          Pick a date → add one photo → a flower appears in your garden.
                        </span>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>MVP scope:</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Add a photo memory to a specific day</li>
                          <li>• Calendar navigation across months/years</li>
                          <li>• Search, personalise (themes/colours), year overview, simple export</li>
                        </ul>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Out of scope (on purpose):</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Streaks, likes, followers, public feeds, productivity metrics.
                        </p>
                      </div>
                    </div>
                  ) : isStreakUp ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">
                        Most habit trackers focus on individual tasks, but don't make longer-term progress feel meaningful.
                      </h3>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Target User</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          People trying to build consistency around personal goals.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Pain Points</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Hard to see progress over time</li>
                          <li>• Missing one day can feel discouraging</li>
                          <li>• Habit lists can become repetitive</li>
                        </ul>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Why It Matters</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Consistency is easier to maintain when progress is visible.
                        </p>
                      </div>
                    </div>
                  ) : isSpeechPain ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">
                        Individuals with cerebral palsy may experience difficulty with speech clarity and communicating discomfort. This project explores how ML can help interpret speech and facial cues.
                      </h3>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Target User</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Individuals with cerebral palsy and their caregivers/supporters.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Pain Points</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Difficulty communicating clearly</li>
                          <li>• Difficulty expressing discomfort</li>
                          <li>• Limited digital support for interpreting these signals</li>
                        </ul>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Why It Matters</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Interpreting speech and facial cues could provide additional information to support communication and caregiver understanding.
                        </p>
                      </div>
                    </div>
                  ) : isTogether ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">
                        With so many fintech apps available, beginners struggle to know which products actually fit their needs.
                      </h3>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Target User</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Beginners and young adults starting to manage their finances.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Pain Points</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Too many choices</li>
                          <li>• Confusing comparisons</li>
                          <li>• Overlapping apps</li>
                          <li>• Generic recommendations</li>
                        </ul>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Why It Matters</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Users need a financial setup that works for them, not just more apps.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="section-content-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="section-heading font-serif" style={{ color: currentTheme.text }}>
                        {project.problem?.statement || 'Problem Statement'}
                      </h3>
                      <p className="body-text" style={{ color: currentTheme.subText }}>
                        {project.problem?.userContext}
                      </p>
                    </div>
                  )}
                </section>
              )}

              {/* SECTION 03 — THINKING */}
              {activeTab === 'thinking' && (
                <section id="modal-section-thinking" className="modal-case-section">
                  <div className="section-badge-header font-mono">
                    <span 
                      className="badge-num"
                      style={{ background: currentTheme.badgeBg, color: currentTheme.badgeText }}
                    >
                      03
                    </span>
                    <span className="badge-title" style={{ color: currentTheme.text }}>
                      THINKING
                    </span>
                  </div>

                  {isSignalDesk ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">
                        I designed the workflow around the product decision.
                      </h3>

                      <div className="workflow-pill-bar font-mono" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <span className="pill-head" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Workflow:</span>
                        <span style={{ color: currentTheme.boxText || currentTheme.text, fontWeight: 700 }}>
                          Import → Analyze → Prioritize → Investigate → Review → Share
                        </span>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Key decisions:</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Evidence alongside every issue – no insight without raw quotes.</li>
                          <li>• Explainable prioritization – scores based on frequency, recency, and impact signals, not black-box magic.</li>
                          <li>• PII masked by default – privacy built into the analysis layer.</li>
                          <li>• Human review before sharing – PMs validate before exporting to stakeholders.</li>
                        </ul>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Trade-off:</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Started with deterministic analysis instead of an LLM to keep results predictable, testable, and explainable. This made it easier to debug, evaluate, and trust in early testing.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Intended success metrics (if piloted):</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Reduce time to identify top issues from ~2 hours of manual tagging to &lt;10 minutes.</li>
                          <li>• ≥80% of pilot PMs say the evidence view changes their prioritization.</li>
                          <li>• Exported insights used in at least one roadmap decision per pilot user.</li>
                        </ul>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>How I would measure this:</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Time-on-task in a short usability test (identify top 3 issues in a sample dataset).</li>
                          <li>• Post-task survey: “Did the evidence view change how you would prioritize?” (Yes/No + comment).</li>
                          <li>• Follow-up check: whether exported insights appear in a roadmap doc or ticket within 1 week.</li>
                        </ul>
                      </div>
                    </div>
                  ) : isDahlia ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">Shaping the Experience</h3>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Calendar as backbone</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Memories stay tied to exact days, giving time structure without feeling like a task list.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Flowers as memories</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Each memory becomes part of a living garden; time passing is visible as it grows.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Calm, private, minimal</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Soft colours, botanical illustrations, organic shapes, editorial typography, minimal controls, light/dark themes.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Forgiving by design</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          No “you’re behind,” no completion percentage. Missing days is normal; there are no streaks or scores.
                        </p>
                      </div>
                    </div>
                  ) : isStreakUp ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">
                        Turn habits into time-bound challenges with visible progress.
                      </h3>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Research / Observations</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Consistency isn't always perfect. A system should allow flexibility without losing momentum.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Product Decisions</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• 21, 30, 66, 90-day challenges</li>
                          <li>• Flexible daily completion</li>
                          <li>• Streaks and progress calendar</li>
                          <li>• Notes and challenge templates</li>
                        </ul>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Prioritisation</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Focused first on the daily check-in and progress experience.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Trade-offs</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Kept it login-free and local-first, making it simple to use but limiting cross-device syncing.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Reasoning</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          The product should feel lightweight enough to actually use every day.
                        </p>
                      </div>
                    </div>
                  ) : isSpeechPain ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">
                        Split the problem into two ML workflows: speech clarity analysis and facial-expression-based pain detection.
                      </h3>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Research / Observations</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Revisited the original project report, its architecture, ML methods, implementation and testing, then recreated the system based on those findings.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Product Decisions</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Keep speech and pain analysis as separate flows</li>
                          <li>• Keep the interaction simple: upload/capture → analyse → result</li>
                          <li>• Rebuild it as a web application for easier access and demonstration</li>
                        </ul>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Prioritisation</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Focused on the two core analysis workflows, clear results, real-time image capture and a simple user experience.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Trade-offs</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          The original concept was Android-based, so I adapted it into a web application while keeping the core ML workflows.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Reasoning</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          A simple flow makes the ML functionality easier to understand without adding unnecessary complexity.
                        </p>
                      </div>
                    </div>
                  ) : isTogether ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">Shifted the question from “Which app is best?” to “What works best for me?”</h3>

                      <div className="workflow-pill-bar font-mono" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <span className="pill-head" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Approach:</span>
                        <span style={{ color: currentTheme.boxText || currentTheme.text, fontWeight: 700 }}>
                          Understand user → analyse stack → identify gaps/overlaps → recommend improvements
                        </span>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Research / Observations</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Beginners think in goals like saving, investing, spending, and simplifying rather than fintech categories.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Product Decisions</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Personalised recommendations, stack analysis, app comparison, and conversational AI.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>How the Mapping Works</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          AI/LLM extracts the user's needs and goals → a structured fintech database maps apps to relevant categories and features → a recommendation engine scores them against the user's profile → gaps, overlaps, and unnecessary tools are identified → an optimised stack is generated.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Prioritisation</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Focused first on onboarding, stack analysis, recommendations, comparison, and Stack Advisor.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Trade-offs &amp; Reasoning</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Kept the experience simple while balancing AI flexibility with financial accuracy.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="section-content-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="section-heading font-serif" style={{ color: currentTheme.text }}>
                        Product Strategy &amp; Decision Approach
                      </h3>
                      <p className="body-text" style={{ color: currentTheme.subText }}>
                        {project.thinking?.approach}
                      </p>
                    </div>
                  )}
                </section>
              )}

              {/* SECTION 04 — DESIGN */}
              {activeTab === 'design' && (
                <section id="modal-section-design" className="modal-case-section">
                  <div className="section-badge-header font-mono">
                    <span 
                      className="badge-num"
                      style={{ background: currentTheme.badgeBg, color: currentTheme.badgeText }}
                    >
                      04
                    </span>
                    <span className="badge-title" style={{ color: currentTheme.text }}>
                      DESIGN
                    </span>
                  </div>

                  {isSignalDesk ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">From technical dashboard → PM workspace</h3>
                      <p className="clean-body">
                        The first version focused too much on analysis. I redesigned it around the question:<br />
                        <strong>“What problem deserves my attention?”</strong>
                      </p>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Design principles:</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Issue-first – start with problems, not charts.</li>
                          <li>• Evidence-led – every issue shows supporting customer quotes.</li>
                          <li>• Progressive disclosure – show simple summaries first; let users drill into details.</li>
                          <li>• Technical details secondary – keep models and parameters out of the main flow.</li>
                        </ul>
                      </div>

                      <div className="workflow-pill-bar font-mono" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <span className="pill-head" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Final flow:</span>
                        <span style={{ color: currentTheme.boxText || currentTheme.text, fontWeight: 700 }}>
                          Import → Workspace → Evidence → Review → Export
                        </span>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Validation (what I actually did):</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Walked through the flow myself with multiple sample datasets to ensure end-to-end usability.</li>
                          <li>• Shared the prototype with 3 peers for informal feedback on clarity of issues and evidence.</li>
                          <li>• Iterated on labels, ordering, and export format based on that feedback.</li>
                        </ul>
                      </div>
                    </div>
                  ) : isDahlia ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">Designing a Restrained Botanical System</h3>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Build Notes &amp; Process:</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Timeline: 2 weeks, solo (product + design + front-end).<br />
                          Stack: Next.js, React, JavaScript, CSS, IndexedDB / browser storage, Vercel.<br />
                          Constraints: concept prototype, no real users yet; memories stored locally (no cross-device sync); scope limited to core flow.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Validation so far:</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Walked through the full flow with multiple test datasets.</li>
                          <li>• Shared the prototype with 3 peers for informal feedback.</li>
                          <li>• Iterated on flower density, colour contrast, and navigation based on feedback.</li>
                        </ul>
                      </div>
                    </div>
                  ) : isStreakUp ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">A responsive challenge tracker designed to feel simple, personal, and motivating.</h3>

                      <div className="workflow-pill-bar font-mono" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <span className="pill-head" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>User Flow:</span>
                        <span style={{ color: currentTheme.boxText || currentTheme.text, fontWeight: 700 }}>
                          Create challenge → Set habits → Check in → Complete day → Track progress
                        </span>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Wireframes</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Started with the core daily check-in and progress flow before building the full interface.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>UI / Interface</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Warm, minimal interface with strong visual feedback and simple navigation.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Design Decisions</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Progress should be visible at a glance, while daily actions stay simple.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Iterations</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Refined the desktop, mobile, readability, navigation, and progress experience.
                        </p>
                      </div>
                    </div>
                  ) : isSpeechPain ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">A clean web interface connecting users directly to the speech and facial-expression analysis workflows.</h3>

                      <div className="workflow-pill-bar font-mono" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <span className="pill-head" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>User Flow:</span>
                        <span style={{ color: currentTheme.boxText || currentTheme.text, fontWeight: 700 }}>
                          Choose analysis → Upload/capture input → Analyse → View result
                        </span>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Wireframes</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Mapped the core screens and analysis flow before building the final interface.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>UI / Interface</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Separate speech and pain analysis experiences with simple inputs, clear actions and result states.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Design Decisions</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Minimal steps, clear CTAs, visible loading states and easy-to-understand results.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Iterations</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Refined the layout, interaction flow, loading states and result presentation while rebuilding the original concept.
                        </p>
                      </div>
                    </div>
                  ) : isTogether ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">A simple, personalised experience for building and improving a fintech stack.</h3>

                      <div className="workflow-pill-bar font-mono" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <span className="pill-head" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>User Flow:</span>
                        <span style={{ color: currentTheme.boxText || currentTheme.text, fontWeight: 700 }}>
                          Discover → Onboard → Build Stack → Analyse → Recommend → Optimise
                        </span>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Wireframes</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Explored onboarding, stack analysis, results, and Stack Advisor.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>UI / Interface</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Dark fintech aesthetic with glassmorphism, grids, cards, and motion.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Design Decisions</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Reduce cognitive load, progressively reveal information, and make recommendations easy to understand.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Iterations</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Command-based AI → guided experience → natural-language Stack Advisor.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="section-content-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="section-heading font-serif" style={{ color: currentTheme.text }}>
                        User Flow &amp; Interface Exploration
                      </h3>
                      <p className="body-text" style={{ color: currentTheme.subText }}>
                        {project.design?.userFlow}
                      </p>
                    </div>
                  )}
                </section>
              )}

              {/* SECTION 05 — DEMO */}
              {activeTab === 'demo' && (
                <section id="modal-section-demo" className="modal-case-section">
                  <div className="section-badge-header font-mono">
                    <span 
                      className="badge-num"
                      style={{ background: currentTheme.badgeBg, color: currentTheme.badgeText }}
                    >
                      05
                    </span>
                    <span className="badge-title" style={{ color: currentTheme.text }}>
                      DEMO
                    </span>
                  </div>

                  {isSignalDesk ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">See SignalDesk in action.</h3>

                      <div className="workflow-pill-bar font-mono" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <span className="pill-head" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Working Prototype:</span>
                        <span style={{ color: currentTheme.boxText || currentTheme.text, fontWeight: 700 }}>
                          Upload feedback → discover issues → inspect evidence → prioritize → export.
                        </span>
                      </div>

                      <div className="demo-links-row font-mono">
                        <a 
                          href="https://signaldesk.streamlit.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-pill" 
                          style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder, color: currentTheme.boxText || currentTheme.text, textDecoration: 'none' }}
                        >
                          View Prototype: <span style={{ textDecoration: 'underline', fontWeight: 600 }}>signaldesk.streamlit.app ↗</span>
                        </a>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>How to use:</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Upload a CSV of customer feedback (text + optional metadata).</li>
                          <li>• Review auto-detected issues and their supporting quotes.</li>
                          <li>• Adjust priorities and export a summary for your team or roadmap doc.</li>
                        </ul>
                      </div>

                      <p className="clean-note font-mono" style={{ opacity: 0.85 }}>
                        Note: This is a concept prototype built for portfolio purposes, not a production tool.
                      </p>
                    </div>
                  ) : isDahlia ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">See It Live</h3>

                      <div className="workflow-pill-bar font-mono" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <span className="pill-head" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Working Web Prototype:</span>
                        <span style={{ color: currentTheme.boxText || currentTheme.text, fontWeight: 700 }}>
                          Add memories → navigate months/years → search → personalise → view year overview → watch the garden grow.
                        </span>
                      </div>

                      <div className="demo-links-row font-mono">
                        <a
                          href="https://mydahlia.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-pill" 
                          style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder, color: currentTheme.boxText || currentTheme.text, textDecoration: 'none' }}
                        >
                          Launch Live App: <span style={{ textDecoration: 'underline', fontWeight: 600 }}>mydahlia.vercel.app ↗</span>
                        </a>
                      </div>

                      <p className="clean-note font-mono" style={{ opacity: 0.85 }}>
                        Concept prototype for portfolio purposes. Memories are stored locally in your browser.
                      </p>
                    </div>
                  ) : isStreakUp ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">Working Prototype</h3>
                      <p className="clean-lead font-sans">
                        Explore the full StreakUp experience.
                      </p>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What you can explore</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Create challenges, add habits, check in daily, track streaks, view progress, and manage notes.
                        </p>
                      </div>

                      <div className="demo-links-row font-mono">
                        <a
                          href="https://streak-up-streakup.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-pill" 
                          style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder, color: currentTheme.boxText || currentTheme.text, textDecoration: 'none' }}
                        >
                          Launch Live App: <span style={{ textDecoration: 'underline', fontWeight: 600 }}>streak-up-streakup.vercel.app ↗</span>
                        </a>
                      </div>
                    </div>
                  ) : isSpeechPain ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">Working Prototype</h3>
                      <p className="clean-lead font-sans">
                        A working web application using the actual Speech KNN and InceptionV3 models.
                      </p>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What can be explored</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Upload audio to analyse speech clarity, or use image capture/upload to explore the facial-expression-based pain indicator.
                        </p>
                      </div>
                    </div>
                  ) : isTogether ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">Working Prototype</h3>
                      <p className="clean-lead font-sans">
                        Interactive web prototype.
                      </p>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Explore</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Onboarding, stack analysis, recommendations, comparisons, and Stack Advisor.
                        </p>
                      </div>

                      <div className="demo-links-row font-mono">
                        <a
                          href="https://fintech-stack-nine.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-pill" 
                          style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder, color: currentTheme.boxText || currentTheme.text, textDecoration: 'none' }}
                        >
                          Launch Live App: <span style={{ textDecoration: 'underline', fontWeight: 600 }}>fintech-stack-nine.vercel.app ↗</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="section-content-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="section-heading font-serif" style={{ color: currentTheme.text }}>
                        Live Demo &amp; Prototype
                      </h3>
                    </div>
                  )}
                </section>
              )}

              {/* SECTION 06 — LEARNINGS */}
              {activeTab === 'learnings' && (
                <section id="modal-section-learnings" className="modal-case-section">
                  <div className="section-badge-header font-mono">
                    <span 
                      className="badge-num"
                      style={{ background: currentTheme.badgeBg, color: currentTheme.badgeText }}
                    >
                      06
                    </span>
                    <span className="badge-title" style={{ color: currentTheme.text }}>LEARNINGS</span>
                  </div>

                  {isSignalDesk ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">
                        Building the analysis was only half the problem. The bigger challenge was turning analysis into something a PM could act on.
                      </h3>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What worked:</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Evidence-backed issues made discussions more concrete during walkthroughs.</li>
                          <li>• Explainable prioritization helped justify why certain issues ranked higher.</li>
                          <li>• Human review step prevented over-trusting the model.</li>
                        </ul>
                      </div>

                      <div className="clean-quote-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What I learned:</h4>
                        <p className="clean-lead font-serif" style={{ fontSize: '1.2rem', margin: '0.4rem 0 0 0', lineHeight: 1.4, color: currentTheme.boxText || currentTheme.text }}>
                          Good product analytics shouldn’t just show what happened.<br />
                          It should make the next decision easier.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What I’d do differently:</h4>
                        <ul className="clean-bullets font-sans" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          <li>• Add lightweight topic clustering to reduce manual grouping of similar issues.</li>
                          <li>• Introduce a “confidence score” per issue so PMs know when to trust the signal.</li>
                          <li>• Integrate with one real source (e.g., Intercom/Zendesk export) and run a small pilot with 2–3 PMs to validate time saved and decision quality.</li>
                        </ul>
                      </div>
                    </div>
                  ) : isDahlia ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">What This Taught Me</h3>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Visual Restraint</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Early visuals were too busy; large flowers and many colours overwhelmed the garden. Moving to a more restrained botanical system made the experience feel calmer and clearer.
                        </p>
                      </div>

                      <div className="clean-quote-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Key learning</h4>
                        <p className="clean-lead font-serif" style={{ fontSize: '1.2rem', margin: '0.4rem 0 0 0', lineHeight: 1.4, color: currentTheme.boxText || currentTheme.text }}>
                          The strongest version of DAHLIA came from deciding what not to include.<br />
                          Product decisions, visual design, and technical constraints all shaped each other over the 2 weeks.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>If this became real</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          I’d add optional cloud sync, improve long-term organisation (multi-year views, filters), explore shared/private gardens, and test with real users to validate emotional impact and usage patterns.
                        </p>
                      </div>
                    </div>
                  ) : isStreakUp ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">Built a working end-to-end prototype from idea to product.</h3>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What Worked</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Keeping the core loop simple: challenge → check in → progress.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What Didn't</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Some early versions felt more like a habit checklist than a challenge experience.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What I Learned</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Small product decisions around flexibility and feedback can significantly change how a product feels.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Limitations</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          No accounts, backend, or cross-device syncing.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What I'd Improve</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Add cloud sync, deeper progress insights, and more personalised motivation.
                        </p>
                      </div>
                    </div>
                  ) : isSpeechPain ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">Recreated the original college project as a working full-stack ML web application.</h3>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What Worked</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Separating the problem into two workflows, keeping the experience simple, and connecting real ML models to the product.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What Didn't</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          The original application was unavailable, so the product experience had to be reconstructed from the project documentation.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What I Learned</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Working with ML models in a product, connecting frontend and backend systems, handling deployment constraints, and turning an academic project into a usable product.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Limitations</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Limited dataset and real-world validation. The system is not a medical diagnostic tool; pain results should be treated only as potential indicators.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What I'd Improve</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Larger and more diverse datasets, stronger ML models, better real-world validation, multimodal speech + facial analysis, and more personalised feedback.
                        </p>
                      </div>
                    </div>
                  ) : isTogether ? (
                    <div 
                      className="clean-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="clean-heading font-serif">Outcome / Result</h3>
                      <p className="clean-lead font-sans">
                        Built and iterated a working AI-powered fintech product.
                      </p>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What Worked</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          User-first thinking, stack-based recommendations, and conversational UX.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What Didn't</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          The first AI experience was too technical and complex.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What I Learned</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          AI still needs simple UX, structured data, and trust.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>Limitations</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          Prototype-level product with limited real-user validation.
                        </p>
                      </div>

                      <div className="clean-box" style={{ background: currentTheme.boxBg, borderColor: currentTheme.boxBorder || currentTheme.cardBorder }}>
                        <h4 className="clean-label font-mono" style={{ color: currentTheme.boxSubText || currentTheme.subText }}>What I'd Improve</h4>
                        <p className="clean-text" style={{ color: currentTheme.boxText || currentTheme.text }}>
                          User testing, recommendation accuracy, source transparency, and real-world validation.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="section-content-card"
                      style={{
                        background: currentTheme.cardBg,
                        borderColor: currentTheme.cardBorder,
                        color: currentTheme.text
                      }}
                    >
                      <h3 className="section-heading font-serif" style={{ color: currentTheme.text }}>
                        Key Takeaways
                      </h3>
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div 
              className="modal-footer font-mono"
              style={{
                borderTopColor: 'rgba(254, 254, 252, 0.2)',
                color: currentTheme.subText
              }}
            >
              <span>DHWANISAGAR — CASE STUDY</span>
              <button 
                type="button" 
                onClick={onClose} 
                className="footer-close-btn"
                style={{
                  background: currentTheme.closeBg,
                  color: currentTheme.closeText
                }}
              >
                Close Case Study ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Full-Screen Backdrop Overlay */
        .project-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(12, 10, 12, 0.78);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          box-sizing: border-box;
          animation: modalFadeIn 0.25s ease-out forwards;
        }

        /* Modal Wrapper Container holding Tabs + Card Body */
        .project-modal-wrapper {
          position: relative;
          width: 100%;
          max-width: 940px;
          height: 88vh;
          max-height: 880px;
          display: flex;
          flex-direction: column;
          animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* TOP FOLDER TAB HEADER (Folder index tabs sitting directly above card) */
        .modal-tab-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-left: 0.25rem;
          padding-right: 0.25rem;
          margin-bottom: -1px;
          z-index: 2;
          flex-shrink: 0;
        }

        .tab-buttons-row {
          display: flex;
          align-items: flex-end;
          gap: 0.45rem;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .tab-buttons-row::-webkit-scrollbar {
          display: none;
        }

        /* Physical Folder Tab styling matching reference image */
        .modal-folder-tab {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.65rem 1.6rem;
          border-radius: 20px 20px 0 0;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          border: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.08);
          position: relative;
        }

        .modal-folder-tab:hover {
          transform: translateY(-2px);
        }

        .modal-folder-tab.tab-active {
          font-weight: 700;
          transform: translateY(0);
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
          z-index: 5;
        }

        /* Close Button */
        .modal-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FEFEFC;
          color: #660005;
          border: none;
          font-size: 1.1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-bottom: 0.35rem;
          transition: transform 0.2s ease, background 0.2s ease;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .modal-close-btn:hover {
          transform: scale(1.1) rotate(90deg);
          background: #660005;
          color: #FEFEFC;
        }

        /* Modal Outer Container / Card Frame */
        .project-modal-dialog {
          position: relative;
          width: 100%;
          flex-grow: 1;
          border-radius: 0 24px 24px 24px;
          border-width: 1px;
          border-style: solid;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(102, 0, 5, 0.15);
          overflow: hidden;
          transition: background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease;
        }

        /* MODAL SCROLLABLE BODY */
        .modal-body-scroll {
          flex-grow: 1;
          overflow-y: auto;
          padding: 2.25rem 2.75rem;
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(102, 0, 5, 0.3) transparent;
        }

        .modal-body-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .modal-body-scroll::-webkit-scrollbar-thumb {
          background: rgba(102, 0, 5, 0.3);
          border-radius: 3px;
        }

        /* CLEAN EDITORIAL CASE STUDY CARD */
        .clean-card {
          border-width: 1px;
          border-style: solid;
          border-radius: 18px;
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .clean-main-title {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 700;
          line-height: 1.1;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .clean-lead {
          font-size: 1.12rem;
          line-height: 1.55;
          margin: 0;
          opacity: 0.95;
        }

        .clean-heading {
          font-size: 1.45rem;
          font-weight: 700;
          line-height: 1.35;
          margin: 0;
        }

        .clean-body {
          font-size: 1rem;
          line-height: 1.65;
          margin: 0;
          opacity: 0.92;
        }

        .clean-tag-pill {
          display: inline-block;
          align-self: flex-start;
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .clean-box, .clean-quote-box {
          border-width: 1px;
          border-style: solid;
          border-radius: 12px;
          padding: 1.25rem 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .clean-label {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0;
        }

        .clean-text {
          font-size: 0.96rem;
          line-height: 1.6;
          margin: 0;
        }

        .clean-bullets {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .clean-bullets li {
          font-size: 0.95rem;
          line-height: 1.55;
        }

        .workflow-pill-bar {
          border-width: 1px;
          border-style: solid;
          border-radius: 12px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.88rem;
          flex-wrap: wrap;
        }

        .pill-head {
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 0.76rem;
        }

        .demo-links-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
        }

        .link-pill {
          border-width: 1px;
          border-style: solid;
          border-radius: 10px;
          padding: 0.75rem 1.1rem;
          font-size: 0.88rem;
          font-weight: 600;
        }

        .clean-note {
          font-size: 0.82rem;
          margin: 0;
          line-height: 1.5;
        }

        /* ACTIVE SECTION DISPLAY CONTAINER */
        .active-section-container {
          animation: sectionFade 0.25s ease-out forwards;
        }

        /* CASE STUDY SECTIONS */
        .modal-case-section {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .section-badge-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .badge-num {
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          font-weight: 800;
        }

        .section-content-card {
          border-width: 1px;
          border-style: solid;
          border-radius: 16px;
          padding: 1.85rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .section-heading {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.3;
        }

        .body-text {
          font-size: 0.95rem;
          line-height: 1.65;
          margin: 0;
          white-space: pre-line;
        }

        /* FOOTER */
        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top-width: 1px;
          border-top-style: solid;
          padding-top: 1.5rem;
          font-size: 0.8rem;
        }

        .footer-close-btn {
          border: none;
          padding: 0.45rem 1rem;
          border-radius: 6px;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .footer-close-btn:hover {
          transform: scale(1.03);
          opacity: 0.9;
        }

        /* ANIMATION KEYFRAMES */
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes sectionFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* RESPONSIVE STYLES */
        @media (max-width: 768px) {
          .project-modal-backdrop {
            padding: 0.75rem;
          }

          .project-modal-wrapper {
            height: 92vh;
          }

          .project-modal-dialog {
            border-radius: 0 18px 18px 18px;
          }

          .modal-body-scroll {
            padding: 1.5rem 1.25rem;
            gap: 1.75rem;
          }

          .clean-card {
            padding: 1.5rem;
          }

          .modal-folder-tab {
            padding: 0.5rem 1.1rem;
            font-size: 0.82rem;
            border-radius: 14px 14px 0 0;
          }
        }
      `}</style>
    </div>
  );
}
