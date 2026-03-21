const StatusDot = ({ label, color = 'var(--teal)', pulse = true }) => {
  return (
    <div className="status-dot-wrapper">
      <span 
        className="dot" 
        style={{ background: color, ...(pulse && { animation: 'blink 1.4s step-start infinite' }) }}
      ></span>
      <span className="dot-label mono">{label}</span>

      <style>{`
        .status-dot-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot-label {
          font-size: 0.72rem;
          color: var(--muted);
        }
      `}</style>
    </div>
  );
};

export default StatusDot;
