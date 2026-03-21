const ProgressBar = ({ percent, showLabel = true, className = '' }) => {
  return (
    <div className={`progress-bar-wrapper ${className}`}>
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        ></div>
      </div>
      {showLabel && (
        <span className="progress-label mono">{percent}%</span>
      )}

      <style>{`
        .progress-bar-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .progress-track {
          flex: 1;
          height: 6px;
          background: var(--border);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, var(--cyan), var(--teal));
          animation: grow 1.2s ease both;
          transform-origin: left;
        }

        .progress-label {
          font-size: 0.72rem;
          color: var(--cyan);
          min-width: 36px;
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
