import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ showBack = false, backTo = '/' }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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

        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <Link to="/#features" onClick={closeMobileMenu}>Features</Link>
        <Link to="/courses" onClick={closeMobileMenu}>Courses</Link>
        <Link to="/#pricing" onClick={closeMobileMenu}>Pricing</Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link>
            <Link to="/ai-tutor" onClick={closeMobileMenu} className="nav-link-ai">AI Tutor</Link>
            <div className="mobile-user">
              <span className="user-name">{user?.name?.split(' ')[0]}</span>
            </div>
            <button onClick={handleLogout} className="btn btn-outline btn-sm mobile-logout">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="mobile-cta" onClick={closeMobileMenu}>Get Started</Link>
        )}
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: 68px;
          background: rgba(5, 10, 18, 0.95);
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
          z-index: 101;
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
          z-index: 101;
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

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 18px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 101;
        }

        .mobile-menu-btn span {
          display: block;
          width: 100%;
          height: 2px;
          background: var(--text);
          transition: all 0.3s ease;
        }

        .mobile-menu-btn.active span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .mobile-menu-btn.active span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          background: rgba(5, 10, 18, 0.98);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
          padding: 1.5rem;
          flex-direction: column;
          gap: 0.5rem;
          transform: translateY(-100%);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 99;
        }

        .mobile-menu.active {
          transform: translateY(0);
          opacity: 1;
        }

        .mobile-menu a,
        .mobile-menu button {
          display: block;
          padding: 0.75rem 1rem;
          color: var(--muted);
          font-size: 0.95rem;
          font-weight: 600;
          text-align: left;
          background: none;
          border: none;
          border-radius: 8px;
          transition: all 0.2s;
          width: 100%;
        }

        .mobile-menu a:hover,
        .mobile-menu button:hover {
          background: var(--surface);
          color: var(--cyan);
        }

        .mobile-menu .nav-link-ai {
          color: var(--teal) !important;
        }

        .mobile-user {
          padding: 0.5rem 1rem;
          color: var(--text);
          font-weight: 600;
        }

        .mobile-logout {
          margin-top: 0.5rem;
          border-color: var(--red);
          color: var(--red);
        }

        .mobile-cta {
          background: var(--cyan);
          color: #050a12 !important;
          text-align: center;
          font-weight: 700 !important;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .mobile-menu {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0 1rem;
          }

          .logo-text {
            font-size: 1.1rem;
          }

          .logo-icon {
            width: 26px;
            height: 26px;
          }

          .mobile-menu {
            padding: 1rem;
          }

          .mobile-menu a,
          .mobile-menu button {
            padding: 0.6rem 0.875rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
