const PageTag = ({ label, emoji }) => {
  return (
    <div className="page-tag">
      {emoji && <span className="tag-emoji">{emoji}</span>}
      <span>{label}</span>

      <style>{`
        .page-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: var(--cyan);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid var(--cyan-dim);
          padding: 6px 14px;
          border-radius: 2px;
          margin-bottom: 1.5rem;
        }

        .page-tag::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cyan);
          animation: blink 1.4s step-start infinite;
        }

        .tag-emoji {
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default PageTag;
