'use client';

import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const optionsTime = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };

      const optionsDate = {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      };

      setTimeString(now.toLocaleTimeString('en-US', optionsTime));
      setDateString(now.toLocaleDateString('en-US', optionsDate));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock-widget font-mono">
      <div className="clock-row">
        <span className="clock-label">LOCATION</span>
        <span className="clock-val font-mono">India 🇮🇳</span>
      </div>

      <div className="clock-row">
        <span className="clock-label">LOCAL DATE</span>
        <span className="clock-val font-mono">{dateString || 'Loading...'}</span>
      </div>

      <div className="clock-row highlight">
        <span className="clock-label">LOCAL TIME</span>
        <span className="clock-time">
          <span className="time-text font-mono">{timeString || '00:00:00 AM'}</span>
          <span className="ist-tag">IST</span>
        </span>
      </div>

      <div className="clock-row">
        <span className="clock-label">TIMEZONE</span>
        <span className="clock-val font-mono">IST / GMT +5:30</span>
      </div>

      <div className="clock-row">
        <span className="clock-label">AVAILABILITY</span>
        <span className="avail-badge">
          <span className="dot" />
          <span>Open to opportunities</span>
        </span>
      </div>

      <style jsx>{`
        .clock-widget {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding: 1.5rem 1.75rem;
          background: rgba(18, 18, 24, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
        }

        .clock-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .clock-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .clock-label {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: #808085;
        }

        .clock-val {
          font-size: 0.88rem;
          color: #ffffff;
        }

        .clock-row.highlight {
          padding: 0.65rem 0.85rem;
          background: rgba(239, 255, 0, 0.05);
          border: 1px solid rgba(239, 255, 0, 0.2);
          border-radius: 8px;
          margin: 0.15rem 0;
        }

        .clock-time {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .time-text {
          font-size: 1rem;
          font-weight: 600;
          color: #efff00;
        }

        .ist-tag {
          font-size: 0.68rem;
          padding: 0.15rem 0.4rem;
          background: #efff00;
          color: #000000;
          font-weight: 700;
          border-radius: 4px;
        }

        .avail-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: #efff00;
        }

        .dot {
          width: 7px;
          height: 7px;
          background: #efff00;
          border-radius: 50%;
          box-shadow: 0 0 8px #efff00;
          animation: pulseGlow 2s infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}

