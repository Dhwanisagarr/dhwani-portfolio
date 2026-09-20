'use client';

import { useState } from 'react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = '/admin';
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper font-sans">
      <div className="login-card">
        <h1 className="login-title font-mono">ADMIN ACCESS</h1>
        {error && <div className="login-error font-mono">{error}</div>}
        
        <form onSubmit={handleLogin} className="login-form" autoComplete="off">
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Admin Password"
              className="login-input font-mono"
              required
              autoFocus
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-visibility-btn font-mono"
              title={showPassword ? "Hide password" : "Show password"}
            >
              i
            </button>
          </div>

          <button type="submit" className="login-btn font-mono" disabled={loading}>
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #080808;
          padding: 1.5rem;
          color: #fff;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          background: #0d0d0d;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2.5rem 2rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-title {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--accent-neon, #ccff00);
          margin-bottom: 1.75rem;
          text-align: center;
        }

        .login-error {
          width: 100%;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          font-size: 0.82rem;
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          margin-bottom: 1.25rem;
          text-align: center;
        }

        .login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .input-group {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .login-input {
          width: 100%;
          padding: 0.85rem 2.8rem 0.85rem 1rem;
          background: rgba(255, 255, 255, 0.04) !important;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          color: #fff !important;
          font-size: 0.95rem;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }

        .login-input:-webkit-autofill,
        .login-input:-webkit-autofill:hover,
        .login-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #fff !important;
          -webkit-box-shadow: 0 0 0px 1000px #0d0d0d inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }

        .login-input:focus {
          border-color: var(--accent-neon, #ccff00);
        }

        .toggle-visibility-btn {
          position: absolute;
          right: 0.75rem;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--accent-neon, #ccff00);
          font-weight: bold;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }

        .toggle-visibility-btn:hover {
          background: rgba(204, 255, 0, 0.2);
          border-color: var(--accent-neon, #ccff00);
          transform: scale(1.05);
        }

        .login-btn {
          width: 100%;
          padding: 0.85rem 1rem;
          background: var(--accent-neon, #ccff00);
          color: #000;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          opacity: 0.95;
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
