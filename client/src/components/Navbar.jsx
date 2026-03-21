import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ showBack = false, backTo = '/' }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-icon"></div>
          <span className="logo-text">Ailer<span>aner</span></span>
        </Link>

        {showBack && (
          <Link to={backTo} className="back-btn">
            ← Back
          </Link>
        )}

        <div className="nav-links">
          <Link to="/#features">Features</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/#pricing">Pricing</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/ai-tutor" className="nav-link-ai">AI Tutor</Link>
              <div className="nav-user">
                <span className="user-name">{user?.name?.split(' ')[0]}</span>
                <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-cta">Get Started</Link>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: 68px;
          background: rgba(5, 10, 18, 0.9);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, var(--cyan), var(--teal));
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
          animation: pulse-logo 3s ease-in-out infinite;
        }

        .logo-text {
          font-size: 1.2rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.04em;
        }

        .logo-text span {
          color: var(--cyan);
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--muted);
          font-size: 0.85rem;
          font-weight: 600;
          transition: color 0.2s;
        }

        .back-btn:hover {
          color: var(--cyan);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-links a {
          color: var(--muted);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: color 0.2s;
          position: relative;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--cyan);
          transition: width 0.2s;
        }

        .nav-links a:hover {
          color: var(--cyan);
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-cta {
          background: var(--cyan);
          color: #050a12 !important;
          padding: 8px 20px;
          border-radius: 4px;
          font-weight: 700 !important;
          transition: box-shadow 0.2s, transform 0.15s !important;
        }

        .nav-cta:hover {
          box-shadow: var(--glow);
          transform: translateY(-1px);
          color: #050a12 !important;
        }

        .nav-cta::after {
          display: none !important;
        }

        .nav-link-ai {
          color: var(--teal) !important;
        }

        .nav-user {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-name {
          font-weight: 600;
          color: var(--text);
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
