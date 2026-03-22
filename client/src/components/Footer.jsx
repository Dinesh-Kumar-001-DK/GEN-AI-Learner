const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon"></div>
            <span className="logo-text">Ailer<span>aner</span></span>
          </div>
          <p className="footer-tagline">AI-Powered Learning Co-Pilot</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Product</h4>
            <a href="/#features">Features</a>
            <a href="/courses">Courses</a>
            <a href="/ai-tutor">AI Tutor</a>
            <a href="/#pricing">Pricing</a>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a href="#docs">Documentation</a>
            <a href="#blog">Blog</a>
            <a href="#tutorials">Tutorials</a>
            <a href="#community">Community</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
            <a href="#press">Press</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#security">Security</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Aileraner. All rights reserved.</span>
        <div className="footer-status">
          <span className="status-dot"></span>
          <span className="mono">All systems operational</span>
        </div>
      </div>

      <style>{`
        .footer {
          position: relative;
          z-index: 1;
          background: var(--surface);
          border-top: 1px solid var(--border);
          padding: 4rem 1.5rem 2rem;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
        }

        .footer-tagline {
          color: var(--muted);
          font-size: 0.85rem;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .footer-col h4 {
          font-size: 0.75rem;
          font-family: 'DM Mono', monospace;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }

        .footer-col a {
          display: block;
          color: var(--muted);
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
          transition: color 0.2s;
        }

        .footer-col a:hover {
          color: var(--cyan);
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 3rem auto 0;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-copy {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: var(--muted);
        }

        .footer-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: var(--teal);
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--teal);
          animation: blink 1.4s step-start infinite;
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .footer {
            padding: 3rem 1rem 1.5rem;
          }

          .footer-links {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .footer-col {
            border-bottom: 1px solid var(--border);
            padding-bottom: 1rem;
          }

          .footer-col:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .footer-col h4 {
            margin-bottom: 0.75rem;
          }

          .footer-col a {
            padding: 0.3rem 0;
            margin-bottom: 0.3rem;
          }

          .footer-bottom {
            margin-top: 2rem;
            padding-top: 1.5rem;
          }

          .footer-copy,
          .footer-status {
            font-size: 0.65rem;
          }
        }

        @media (max-width: 320px) {
          .footer {
            padding: 2.5rem 0.875rem 1.25rem;
          }

          .footer-tagline {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
