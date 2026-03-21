import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, href, delay = 0 }) => {
  const CardWrapper = href ? Link : 'div';
  const cardProps = href ? { to: href } : {};

  return (
    <CardWrapper {...cardProps} className="feature-card">
      <div className="feat-icon">{icon}</div>
      <h3 className="feat-title">{title}</h3>
      <p className="feat-desc">{description}</p>
      {href && <span className="feat-link">Explore →</span>}

      <style>{`
        .feature-card {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.8rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s;
          display: block;
          color: inherit;
          animation: fadeUp 0.6s ease both;
          animation-delay: ${delay}s;
        }

        .feature-card:hover {
          border-color: var(--cyan);
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0, 212, 255, 0.12);
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feat-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--cyan-dim);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          margin-bottom: 1.2rem;
        }

        .feat-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.6rem;
        }

        .feat-desc {
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.65;
          font-weight: 400;
        }

        .feat-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 1rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--cyan);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: gap 0.2s;
        }

        .feature-card:hover .feat-link {
          gap: 10px;
        }
      `}</style>
    </CardWrapper>
  );
};

export default FeatureCard;
