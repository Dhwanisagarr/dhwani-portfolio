'use client';

import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        let tStr = '';
        let dStr = '';

        try {
          tStr = now.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          });
          dStr = now.toLocaleDateString('en-US', {
            timeZone: 'Asia/Kolkata',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });
        } catch (tzErr) {
          // Fallback to local browser timezone if Asia/Kolkata is unsupported on mobile browser engine
          tStr = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          });
          dStr = now.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });
        }

        if (tStr) setTimeString(tStr);
        if (dStr) setDateString(dStr);
      } catch (err) {
        console.error('LiveClock update error:', err);
      }
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
          background: #F2D9DA;
          border: 1px solid #E3BDBE;
          border-radius: 16px;
        }

        .clock-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid #E3BDBE;
        }

        .clock-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .clock-label {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: #660005;
          font-weight: 700;
        }

        .clock-val {
          font-size: 0.88rem;
          color: #660005;
          font-weight: 600;
        }

        .clock-row.highlight {
          padding: 0.65rem 0.85rem;
          background: #FAF4D4;
          border: 1px solid #E3BDBE;
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
          font-weight: 700;
          color: #660005;
        }

        .ist-tag {
          font-size: 0.68rem;
          padding: 0.15rem 0.4rem;
          background: #660005;
          color: #FAF4D4;
          font-weight: 700;
          border-radius: 4px;
        }

        .avail-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: #660005;
          font-weight: 600;
        }

        .dot {
          width: 7px;
          height: 7px;
          background: #660005;
          border-radius: 50%;
          box-shadow: 0 0 8px #660005;
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

