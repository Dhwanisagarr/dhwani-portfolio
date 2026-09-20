'use client';

import { useState, useEffect, useRef } from 'react';
import { useProjectModal } from '../context/ProjectModalContext';

const WORK_ITEMS = [
  {
    num: '01',
    company: '4RinLabs Pvt. Ltd.',
    role: 'Freelancer',
    date: 'Present',
    location: 'Remote',
    side: 'left',
    bullets: [
      'Worked on product planning and feature definition, translating ideas and requirements into clear product directions.',
      'Collaborated across design and development workflows to prioritize features and improve product execution.',
      'Contributed to refining user workflows by identifying problems, exploring solutions, and validating product decisions.'
    ],
    skills: [
      'Product Management',
      'Product Strategy',
      'Product Planning',
      'User Flows',
      'Product Development'
    ]
  },
  {
    num: '02',
    company: 'FYERS',
    role: 'Apprentice',
    date: 'Jul 2025 – Dec 2025 · 6 mos',
    location: 'Bengaluru, Karnataka, India · On-site',
    side: 'right',
    bullets: [
      'Worked with product, engineering, and analytics teams on onboarding/signup workflows and related updates.',
      'Supported event tracking validation across Google Analytics, CleverTap, and AppsFlyer to ensure data was captured correctly.',
      'Performed API and workflow validation using Postman and cURL before release.'
    ],
    skills: [
      'Google Analytics',
      'CleverTap',
      'AppsFlyer',
      'PostgreSQL',
      'Postman',
      'cURL',
      'Golang',
      'Flutter',
      'JavaScript'
    ]
  },
  {
    num: '03',
    company: 'Zidio Development',
    role: 'Web Developer',
    date: 'Feb 2025 – May 2025 · 4 mos',
    location: 'Bengaluru, Karnataka, India · Remote',
    side: 'left',
    bullets: [
      'Supported end-to-end project execution by coordinating tasks, timelines, and team communication.',
      'Tracked feature progress and milestones to improve delivery efficiency.',
      'Collaborated with cross-functional teams to clarify requirements and reduce ambiguity during implementation.'
    ],
    skills: [
      'Project Management',
      'Git',
      'GitHub',
      'Web Development',
      'JavaScript',
      'HTML',
      'CSS'
    ]
  },
  {
    num: '04',
    company: 'Dinesh Information Technology Systems',
    role: 'Intern',
    date: 'Nov 2023 – Dec 2023 · 2 mos',
    location: 'Kannur, Kerala, India · On-site',
    side: 'right',
    bullets: [
      'Built foundational backend development skills using PHP and CodeIgniter with MVC architecture.',
      'Learned Git and collaborative development workflows.',
      'Gained experience translating requirements into structured backend logic.'
    ],
    skills: [
      'PHP',
      'CodeIgniter',
      'MVC',
      'Git',
      'Backend Development'
    ]
  },
  {
    num: '05',
    company: 'Salesforce',
    role: 'Salesforce Administrator',
    date: 'Oct 2023 – Nov 2023 · 2 mos',
    location: 'Remote',
    side: 'left',
    bullets: [
      'Completed a virtual Salesforce Administrator internship focused on business processes and workflows.',
      'Practiced workflow setup, documentation, and validation through guided project scenarios.',
      'Developed foundational skills in requirement interpretation and process mapping.'
    ],
    skills: [
      'Salesforce',
      'Salesforce Administration',
      'Workflow Management',
      'Process Mapping'
    ]
  }
];

export default function WorkEduSection() {
  const { openProject } = useProjectModal();
  const sectionRef = useRef(null);
  const spineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!spineRef.current) return;
      const rect = spineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress relative to spine element as it scrolls through viewport
      const totalDist = rect.height;
      const currentScroll = windowHeight * 0.5 - rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalDist));
      setScrollProgress(progress);

      // Thresholds for 5 items
      if (progress < 0.20) {
        setActiveIndex(0);
      } else if (progress < 0.40) {
        setActiveIndex(1);
      } else if (progress < 0.60) {
        setActiveIndex(2);
      } else if (progress < 0.80) {
        setActiveIndex(3);
      } else {
        setActiveIndex(4);
      }
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="work-edu-section">
      <div className="work-edu-container">
        {/* Header */}
        <div className="experience-header">
          <span className="eyebrow font-mono">THE EXPERIENCE</span>
          <h2 className="section-title font-mono">Work Experience</h2>
          <p className="section-subtitle font-sans">
            Building software, refining user workflows, and engineering digital products across teams.
          </p>
        </div>

        {/* Un-enclosed Open Timeline Section */}
        <div ref={spineRef} className="open-timeline-wrap">
          {/* Central Vertical Smooth Spine Line */}
          <div className="timeline-spine-line" aria-hidden="true">
            <div
              className="spine-progress-fill"
              style={{ height: `${scrollProgress * 100}%` }}
            />
            {/* Travelling Circular Avatar Image */}
            <div
              className="travelling-avatar-wrapper"
              style={{ top: `${Math.min(99, Math.max(1, scrollProgress * 100))}%` }}
            >
              <img
                src="/timeline_avatar.jpg"
                alt="Dhwani Sagar"
                className="travelling-avatar-img"
              />
            </div>
          </div>

          {/* Timeline Items Stack */}
          <div className="timeline-items-stack">
            {WORK_ITEMS.map((item, idx) => {
              const isActive = activeIndex === idx;
              const isLeft = item.side === 'left';

              return (
                <div
                  key={idx}
                  className={`timeline-entry-row ${isLeft ? 'entry-left' : 'entry-right'} ${isActive ? 'entry-active' : ''}`}
                >
                  {/* Experience Content Block (Directly on Page Canvas) */}
                  <div className="exp-content-block">
                    <div className="entry-header">
                      <span className="entry-num font-mono">{item.num}</span>
                      <span className="entry-date font-mono">{item.date}</span>
                    </div>

                    <h3 className="company-title font-sans">{item.company}</h3>

                    <div className="role-meta font-sans">
                      <span className="role-text">{item.role}</span>
                      <span className="meta-sep">•</span>
                      <span className="location-text">{item.location}</span>
                    </div>

                    <ul className="bullets-group font-sans">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>

                    {/* Technology / Skill Pills */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="skills-pills-wrap">
                        {item.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="skill-pill font-sans">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Spine Center Gap Spacer */}
                  <div className="spine-center-spacer" aria-hidden="true" />

                  {/* Opposite Column Spacer */}
                  <div className="opposite-column-space" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ACADEMIC JOURNEY / EDUCATION SECTION */}
        <div id="education" className="education-journey-wrap">
          {/* Header */}
          <div className="edu-section-header">
            <span className="eyebrow font-mono">THE ACADEMIC JOURNEY</span>
            <h2 className="section-title font-mono">Education</h2>
          </div>

          {/* 1. BACHELOR'S DEGREE */}
          <div className="edu-bachelors-block">
            <div className="bachelors-header-row">
              <span className="edu-badge-tag font-mono">BACHELOR'S DEGREE</span>
              <span className="bachelors-date font-mono">2021 – 2025</span>
            </div>
            <h3 className="bachelors-title font-sans">
              B.E. in Computer Science and Engineering (Honours)
            </h3>
            <p className="bachelors-school font-sans">
              Mangalore Institute of Technology and Engineering (MITE)
            </p>
            <div className="bachelors-meta font-mono">
              <span className="meta-cgpa">CGPA: 8.12</span>
            </div>
          </div>

          {/* 2. PROJECTS BUILT DURING COLLEGE */}
          <div className="college-projects-subsection">
            <h4 className="projects-subhead font-mono">
              PROJECTS BUILT DURING THIS CHAPTER
            </h4>

            <div className="projects-grid">
              {/* 01 — CEREBRAL PALSY SPEECH ENHANCEMENT (2025) */}
              <div 
                className="project-card"
                onClick={() => openProject('cp-speech-pain')}
                style={{ cursor: 'pointer' }}
              >
                <div className="project-card-top">
                  <div className="project-header-row font-mono">
                    <span className="project-num">01</span>
                    <span className="project-year">2025</span>
                  </div>
                  <h5 className="project-title font-sans">Cerebral Palsy Speech Enhancement</h5>
                  <p className="project-desc font-sans">
                    A major project exploring machine-learning approaches for improving speech recognition and accessibility for people affected by cerebral palsy.
                  </p>
                </div>
                <div className="project-card-bottom">
                  <div className="project-pills">
                    <span className="skill-pill font-sans">InceptionV3</span>
                    <span className="skill-pill font-sans">KNN</span>
                    <span className="skill-pill font-sans">Machine Learning</span>
                  </div>
                  <div className="project-footer">
                    <span className="team-text font-mono">Team of 4</span>
                    <button 
                      type="button" 
                      className="report-btn font-mono"
                      onClick={(e) => { e.stopPropagation(); openProject('cp-speech-pain'); }}
                    >
                      View Case Study ↗
                    </button>
                  </div>
                </div>
              </div>

              {/* 02 — TEXT SUMMARISER (2024) */}
              <div className="project-card">
                <div className="project-card-top">
                  <div className="project-header-row font-mono">
                    <span className="project-num">02</span>
                    <span className="project-year">2024</span>
                  </div>
                  <h5 className="project-title font-sans">Text Summariser</h5>
                  <p className="project-desc font-sans">
                    An NLP-based text summarisation tool designed to turn lengthy information into concise, useful insights for faster information processing and decision-making.
                  </p>
                </div>
                <div className="project-card-bottom">
                  <div className="project-pills">
                    <span className="skill-pill font-sans">NLP</span>
                    <span className="skill-pill font-sans">Python</span>
                    <span className="skill-pill font-sans">Machine Learning</span>
                    <span className="skill-pill font-sans">Hugging Face</span>
                  </div>
                  <div className="project-footer">
                    <span className="team-text font-mono">Team of 4</span>
                  </div>
                </div>
              </div>

              {/* 03 — CROP INVENTORY (2023) */}
              <div className="project-card">
                <div className="project-card-top">
                  <div className="project-header-row font-mono">
                    <span className="project-num">03</span>
                    <span className="project-year">2023</span>
                  </div>
                  <h5 className="project-title font-sans">Crop Inventory</h5>
                  <p className="project-desc font-sans">
                    A crop inventory management solution designed to organise and simplify the tracking of agricultural inventory through a simple web-based workflow.
                  </p>
                </div>
                <div className="project-card-bottom">
                  <div className="project-pills">
                    <span className="skill-pill font-sans">Python</span>
                    <span className="skill-pill font-sans">Database</span>
                    <span className="skill-pill font-sans">HTML</span>
                    <span className="skill-pill font-sans">CSS</span>
                  </div>
                  <div className="project-footer">
                    <span className="team-text font-mono">Team of 4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. 12TH & 5. 10TH STANDARD */}
          <div className="schooling-timeline">
            {/* 12TH STANDARD */}
            <div className="school-entry entry-12th">
              <div className="school-header font-mono">
                <span className="school-tag">12TH STANDARD</span>
                <span className="school-date">Jun 2019 – Mar 2021</span>
              </div>
              <h4 className="school-name font-sans">
                Sree Narayana Vidya Mandir Senior Secondary School
              </h4>
              <p className="school-stream font-sans">High School, Computer Science / CBSE</p>
              <span className="school-grade font-mono">Grade: 83.4%</span>
            </div>

            {/* 10TH STANDARD */}
            <div className="school-entry entry-10th">
              <div className="school-header font-mono">
                <span className="school-tag">10TH STANDARD</span>
                <span className="school-date">2018–2019</span>
              </div>
              <h4 className="school-name font-sans">
                Ursuline Senior Secondary School
              </h4>
              <p className="school-stream font-sans">10th Standard / CBSE</p>
              <span className="school-grade font-mono">Grade: 84.8%</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .work-edu-section {
          position: relative;
          background-color: #F2D9DA;
          padding: 6rem 0 7rem 0;
          color: #660005;
          width: 100%;
          box-sizing: border-box;
        }

        .work-edu-container {
          position: relative;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 3.5rem;
          display: flex;
          flex-direction: column;
        }

        .experience-header {
          display: flex;
          flex-direction: column;
          max-width: 780px;
          margin-bottom: 4rem;
        }

        .eyebrow {
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          color: #660005;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }

        .section-title {
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          font-weight: 600;
          color: #660005;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          color: #660005;
          line-height: 1.55;
        }

        /* Open Un-enclosed Timeline Area */
        .open-timeline-wrap {
          position: relative;
          width: 100%;
          margin-bottom: 5rem;
        }

        /* Central Vertical Spine Line */
        .timeline-spine-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(102, 0, 5, 0.18);
          transform: translateX(-50%);
          z-index: 1;
        }

        .spine-progress-fill {
          width: 100%;
          background: #660005;
          transition: height 0.05s linear;
        }

        /* Travelling Circular Avatar Image attached to Spine */
        .travelling-avatar-wrapper {
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 3px solid #660005;
          background: #FAF4D4;
          box-shadow: 0 0 16px rgba(102, 0, 5, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 5;
          pointer-events: none;
          transition: top 0.08s ease-out;
          overflow: hidden;
          box-sizing: border-box;
        }

        .travelling-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 58% 25%;
          display: block;
        }

        /* Timeline Items Stack */
        .timeline-items-stack {
          display: flex;
          flex-direction: column;
          gap: 5rem;
          position: relative;
          z-index: 2;
        }

        .timeline-entry-row {
          display: grid;
          grid-template-columns: 1fr 50px 1fr;
          align-items: flex-start;
          opacity: 0.45;
          transform: translateY(12px);
          transition: opacity 0.45s ease, transform 0.45s ease;
        }

        .timeline-entry-row.entry-active {
          opacity: 1;
          transform: translateY(0);
        }

        .entry-left .exp-content-block {
          grid-column: 1;
          padding-right: 2.5rem;
          text-align: left;
        }

        .entry-left .spine-center-spacer {
          grid-column: 2;
        }

        .entry-left .opposite-column-space {
          grid-column: 3;
        }

        .entry-right .opposite-column-space {
          grid-column: 1;
        }

        .entry-right .spine-center-spacer {
          grid-column: 2;
        }

        .entry-right .exp-content-block {
          grid-column: 3;
          padding-left: 2.5rem;
          text-align: left;
        }

        /* Content Block (No card border/background box) */
        .exp-content-block {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .entry-header {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 0.5rem;
          justify-content: flex-start;
        }

        .entry-num {
          font-size: 0.9rem;
          font-weight: 700;
          color: #660005;
        }

        .entry-date {
          font-size: 0.82rem;
          font-weight: 600;
          color: #660005;
          background: rgba(102, 0, 5, 0.08);
          border: 1px solid rgba(102, 0, 5, 0.15);
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
          white-space: nowrap;
        }

        .company-title {
          font-size: 1.45rem;
          font-weight: 700;
          color: #660005;
          margin: 0 0 0.3rem 0;
          line-height: 1.25;
          letter-spacing: -0.01em;
          text-align: left;
        }

        .role-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #660005;
          margin-bottom: 0.85rem;
          flex-wrap: wrap;
          justify-content: flex-start;
        }

        .meta-sep {
          opacity: 0.4;
        }

        .location-text {
          color: #660005;
          font-weight: 500;
          font-size: 0.88rem;
        }

        .bullets-group {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          text-align: left;
        }

        .bullets-group li {
          font-size: 0.92rem;
          color: #660005;
          line-height: 1.55;
          margin: 0;
          position: relative;
          padding-left: 1.25rem;
        }

        .bullets-group li::before {
          content: '•';
          position: absolute;
          left: 0;
          top: 0;
          color: #660005;
          font-weight: 700;
        }

        /* Technology / Skill Pills */
        .skills-pills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem 0.55rem;
          margin-top: 1.25rem;
        }

        .skill-pill {
          font-size: 0.78rem;
          font-weight: 500;
          color: #660005;
          background: rgba(102, 0, 5, 0.07);
          border: 1px solid rgba(102, 0, 5, 0.18);
          padding: 0.28rem 0.75rem;
          border-radius: 9999px;
          line-height: 1.35;
          white-space: nowrap;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .skill-pill:hover {
          background: rgba(102, 0, 5, 0.12);
          border-color: rgba(102, 0, 5, 0.28);
        }

        .spine-center-connection {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 0.4rem;
        }

        .node-connector {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #F2D9DA;
          border: 2px solid #660005;
          transition: background 0.35s ease, transform 0.35s ease;
        }

        .connector-active {
          background: #660005;
          transform: scale(1.35);
          box-shadow: 0 0 10px rgba(102, 0, 5, 0.4);
        }

        /* Education Journey Section */
        .education-journey-wrap {
          margin-top: 5rem;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
          padding-top: 4.5rem;
        }

        .edu-section-header {
          display: flex;
          flex-direction: column;
        }

        /* 1. Bachelor's Degree Block */
        .edu-bachelors-block {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          background: #FAF4D4;
          border: 1px solid rgba(102, 0, 5, 0.18);
          border-radius: 14px;
          padding: 2.25rem 2.5rem;
          box-shadow: 0 4px 16px rgba(102, 0, 5, 0.05);
        }

        .bachelors-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .edu-badge-tag {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          background: #660005;
          color: #FAF4D4;
          padding: 0.3rem 0.75rem;
          border-radius: 4px;
        }

        .bachelors-date {
          font-size: 0.88rem;
          font-weight: 600;
          color: #660005;
        }

        .bachelors-title {
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 700;
          color: #660005;
          letter-spacing: -0.01em;
          margin: 0.25rem 0 0 0;
          line-height: 1.25;
        }

        .bachelors-school {
          font-size: 1.05rem;
          font-weight: 600;
          color: #660005;
          margin: 0;
        }

        .bachelors-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.92rem;
          font-weight: 600;
          color: #660005;
          margin-top: 0.25rem;
        }

        .meta-cgpa {
          font-size: 0.92rem;
          font-weight: 700;
          color: #660005;
        }

        /* 2. College Projects Subsection */
        .college-projects-subsection {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .projects-subhead {
          font-size: 0.82rem;
          letter-spacing: 0.15em;
          color: #660005;
          font-weight: 700;
          margin: 0;
          text-transform: uppercase;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .project-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #FAF4D4;
          border: 1px solid rgba(102, 0, 5, 0.16);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 16px rgba(102, 0, 5, 0.05);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .project-card:hover {
          transform: translateY(-3px);
          border-color: rgba(102, 0, 5, 0.35);
          box-shadow: 0 8px 24px rgba(102, 0, 5, 0.1);
        }

        .project-card-top {
          display: flex;
          flex-direction: column;
        }

        .project-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .project-num {
          font-size: 0.85rem;
          font-weight: 700;
          color: #660005;
        }

        .project-year {
          font-size: 0.78rem;
          font-weight: 600;
          color: #660005;
          background: rgba(102, 0, 5, 0.08);
          border: 1px solid rgba(102, 0, 5, 0.15);
          padding: 0.15rem 0.55rem;
          border-radius: 999px;
        }

        .project-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #660005;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }

        .project-desc {
          font-size: 0.88rem;
          color: #660005;
          line-height: 1.5;
          margin: 0 0 1.25rem 0;
        }

        .project-card-bottom {
          display: flex;
          flex-direction: column;
          margin-top: auto;
        }

        .project-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem 0.5rem;
          margin-bottom: 1.25rem;
        }

        .project-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(102, 0, 5, 0.12);
          padding-top: 0.85rem;
          margin-top: auto;
        }

        .team-text {
          font-size: 0.78rem;
          font-weight: 600;
          color: #660005;
          opacity: 0.85;
        }

        .report-btn {
          font-size: 0.78rem;
          font-weight: 600;
          color: #660005;
          background: rgba(102, 0, 5, 0.06);
          border: 1px solid rgba(102, 0, 5, 0.2);
          padding: 0.3rem 0.7rem;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .report-btn:hover {
          background: rgba(102, 0, 5, 0.12);
          border-color: rgba(102, 0, 5, 0.35);
        }

        /* Schooling Timeline (12th & 10th) */
        .schooling-timeline {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .school-entry {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background: #FAF4D4;
          border: 1px solid rgba(102, 0, 5, 0.16);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          box-shadow: 0 4px 16px rgba(102, 0, 5, 0.05);
        }

        .school-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .school-tag {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #660005;
        }

        .school-date {
          font-size: 0.78rem;
          font-weight: 600;
          color: #660005;
          opacity: 0.8;
        }

        .school-name {
          font-size: 1.02rem;
          font-weight: 700;
          color: #660005;
          margin: 0;
        }

        .school-stream {
          font-size: 0.88rem;
          color: #660005;
          margin: 0;
          font-weight: 500;
        }

        .school-grade {
          font-size: 0.85rem;
          font-weight: 700;
          color: #660005;
          margin-top: 0.2rem;
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .schooling-timeline {
            grid-template-columns: 1fr;
          }

          .edu-bachelors-block {
            padding: 1.5rem 1.75rem;
          }
        }

        @media (max-width: 860px) {
          .work-edu-section {
            padding: 4rem 0 5rem 0;
          }

          .work-edu-container {
            padding: 0 1.5rem;
          }

          .experience-header {
            margin-bottom: 3rem;
          }

          .timeline-spine-line {
            left: 18px;
            transform: none;
          }

          .travelling-node-dot {
            display: none;
          }

          .timeline-items-stack {
            gap: 3.5rem;
          }

          .timeline-entry-row {
            grid-template-columns: 1fr;
            opacity: 1 !important;
            transform: none !important;
          }

          .entry-left .exp-content-block,
          .entry-right .exp-content-block {
            grid-column: 1;
            text-align: left;
            padding-left: 2.5rem !important;
            padding-right: 0 !important;
          }

          .entry-left .entry-header,
          .entry-right .entry-header,
          .entry-left .role-meta,
          .entry-right .role-meta {
            justify-content: flex-start;
          }

          .entry-left .bullets-group li {
            padding-right: 0;
            padding-left: 1.25rem;
          }

          .entry-left .bullets-group li::after {
            display: none;
          }

          .entry-left .bullets-group li::before {
            content: '•';
            position: absolute;
            left: 0;
            top: 0;
            color: #660005;
            font-weight: 700;
          }

          .spine-center-connection,
          .opposite-column-space {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
