const Panel = ({ header, children, className = '' }) => {
  return (
    <div className={`panel ${className}`}>
      {header && <div className="panel-header">{header}</div>}
      <div className="panel-body">{children}</div>

      <style>{`
        .panel {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .panel-header {
          background: var(--surface);
          padding: 1rem 1.4rem;
          border-bottom: 1px solid var(--border);
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .panel-body {
          padding: 1.4rem;
        }
      `}</style>
    </div>
  );
};

export default Panel;
