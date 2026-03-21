const Gauge = ({ value, label, color = 'var(--cyan)', delay = 0 }) => {
  return (
    <div className="gauge" style={{ animationDelay: `${delay}s` }}>
      <span className="gauge-value" style={{ color }}>{value}</span>
      <span className="gauge-label">{label}</span>

      <style>{`
        .gauge {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.2rem 1rem;
          text-align: center;
          animation: fadeUp 0.6s ease both;
        }

        .gauge-value {
          font-size: 1.8rem;
          font-weight: 800;
          display: block;
          line-height: 1;
        }

        .gauge-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 6px;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default Gauge;
