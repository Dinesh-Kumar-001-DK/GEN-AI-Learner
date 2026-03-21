const Badge = ({ children, variant = 'cyan' }) => {
  const variantClass = `badge-${variant}`;
  
  return (
    <span className={`badge-item ${variantClass}`}>
      {children}

      <style>{`
        .badge-item {
          display: inline-flex;
          align-items: center;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          padding: 3px 10px;
          border-radius: 20px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .badge-cyan {
          background: var(--cyan-dim);
          color: var(--cyan);
        }

        .badge-teal {
          background: rgba(0, 255, 200, 0.15);
          color: var(--teal);
        }

        .badge-amber {
          background: rgba(255, 184, 0, 0.15);
          color: var(--amber);
        }

        .badge-red {
          background: rgba(255, 78, 106, 0.15);
          color: var(--red);
        }

        .badge-default {
          background: var(--border);
          color: var(--muted);
        }
      `}</style>
    </span>
  );
};

export default Badge;
