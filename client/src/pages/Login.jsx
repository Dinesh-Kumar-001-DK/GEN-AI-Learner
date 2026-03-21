import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setFormData({ email: 'demo@aileraner.com', password: 'demo123' });
    setError('');
    setLoading(true);

    try {
      await login('demo@aileraner.com', 'demo123');
      navigate('/dashboard');
    } catch (err) {
      setError('Demo login failed. Please register a new account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon"></div>
          <span className="logo-text">Ailer<span>aner</span></span>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to continue your learning journey</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="pilot@aileraner.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <button 
          type="button" 
          className="btn btn-outline btn-lg auth-demo-btn" 
          onClick={handleDemoLogin}
          disabled={loading}
        >
          Try Demo Account
        </button>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2.5rem;
        }

        .auth-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2rem;
          justify-content: center;
        }

        .logo-icon {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, var(--cyan), var(--teal));
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        }

        .logo-text {
          font-size: 1.3rem;
          font-weight: 800;
          color: #fff;
        }

        .logo-text span {
          color: var(--cyan);
        }

        .auth-title {
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .auth-sub {
          text-align: center;
          color: var(--muted);
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }

        .auth-error {
          background: rgba(255, 78, 106, 0.1);
          border: 1px solid var(--red);
          color: var(--red);
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }

        .auth-submit {
          width: 100%;
          margin-top: 1rem;
        }

        .auth-demo-btn {
          width: calc(100%);
          margin-top: 0.75rem;
        }

        .auth-footer {
          text-align: center;
          margin-top: 1.5rem;
          color: var(--muted);
          font-size: 0.85rem;
        }

        .auth-footer a {
          color: var(--cyan);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Login;
