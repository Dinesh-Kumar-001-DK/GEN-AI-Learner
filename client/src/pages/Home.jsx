import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import Gauge from '../components/Gauge';
import ProgressBar from '../components/ProgressBar';

const Home = () => {
  return (
    <>
      <Navbar />
      
      <main className="home-page">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-tag">
              AI-Powered Learning Co-Pilot
            </div>
            <h1>
              Navigate Your<br/>
              <em>Learning Journey</em>
            </h1>
            <p className="hero-sub">
              Aileraner adapts to your pace, detects your blind spots, and charts your fastest route to mastery — like an aileron steering your flight through knowledge.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">Start Free →</Link>
              <Link to="/courses" className="btn btn-outline btn-lg">Browse Courses</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="cockpit">
              <div className="cockpit-header">
                <span className="cockpit-title">Flight Dashboard</span>
                <div className="status-dot">
                  <span className="status-dot-inner"></span>
                  <span>AI Active</span>
                </div>
              </div>
              <div className="gauge-row">
                <Gauge value="94%" label="Focus" delay={0.1} />
                <Gauge value="3.2x" label="Speed" color="var(--teal)" delay={0.2} />
                <Gauge value="47" label="Streak" color="var(--amber)" delay={0.3} />
              </div>
              <div className="progress-list">
                <div className="prog-item">
                  <div className="prog-head">
                    <span>Machine Learning</span>
                    <span className="mono">82%</span>
                  </div>
                  <ProgressBar percent={82} showLabel={false} />
                </div>
                <div className="prog-item">
                  <div className="prog-head">
                    <span>Neural Networks</span>
                    <span className="mono">61%</span>
                  </div>
                  <ProgressBar percent={61} showLabel={false} />
                </div>
                <div className="prog-item">
                  <div className="prog-head">
                    <span>Data Structures</span>
                    <span className="mono">93%</span>
                  </div>
                  <ProgressBar percent={93} showLabel={false} />
                </div>
                <div className="prog-item">
                  <div className="prog-head">
                    <span>System Design</span>
                    <span className="mono">38%</span>
                  </div>
                  <ProgressBar percent={38} showLabel={false} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <p className="section-label">// capabilities</p>
          <h2 className="section-title">Everything you need to fly faster</h2>
          <p className="section-sub">
            Aileraner gives you an AI co-pilot that watches, adapts, and guides — turning scattered studying into precision learning.
          </p>

          <div className="features-grid">
            <FeatureCard
              icon="🧠"
              title="Adaptive AI Tutor"
              description="Real-time difficulty adjustment based on your responses, hesitation, and patterns — no more one-size-fits-all lessons."
              href="/ai-tutor"
              delay={0}
            />
            <FeatureCard
              icon="🗺️"
              title="Smart Roadmaps"
              description="AI-generated, personalized learning paths that connect your current skills to your goal — updated as you grow."
              href="/progress"
              delay={0.1}
            />
            <FeatureCard
              icon="📝"
              title="Note Intelligence"
              description="Paste your raw notes and get structured summaries, flashcards, and quizzes generated instantly."
              href="/note-intelligence"
              delay={0.2}
            />
            <FeatureCard
              icon="📡"
              title="Flight Analytics"
              description="Deep insights into your study patterns, retention rates, and weak areas — visualized in your personal cockpit."
              href="/flight-analytics"
              delay={0.3}
            />
            <FeatureCard
              icon="🧭"
              title="Career Navigator"
              description="Map your skills against industry needs and get AI guidance on the exact gaps to close for your dream role."
              href="/career-navigator"
              delay={0.4}
            />
            <FeatureCard
              icon="🛰️"
              title="Co-Pilot Network"
              description="Connect with learners on similar paths, share notes, and tackle challenges together in live sessions."
              href="/courses"
              delay={0.5}
            />
          </div>
        </section>

        <section id="pricing" className="pricing-section">
          <p className="section-label">// pricing</p>
          <h2 className="section-title">Choose your altitude</h2>
          <p className="section-sub">Start free and scale as you grow. No hidden fees, cancel anytime.</p>

          <div className="plans-grid">
            <div className="plan-card">
              <p className="plan-name">Glider</p>
              <p className="plan-price"><sup>$</sup>0 <span>/ mo</span></p>
              <p className="plan-tagline">Get off the ground</p>
              <ul className="plan-features">
                <li>5 AI sessions / month</li>
                <li>Basic roadmap</li>
                <li>Note summarizer</li>
                <li>Community access</li>
              </ul>
              <Link to="/register" className="plan-btn outline">Start Free</Link>
            </div>

            <div className="plan-card featured">
              <div className="plan-badge">Most Popular</div>
              <p className="plan-name">Co-Pilot</p>
              <p className="plan-price"><sup>$</sup>19 <span>/ mo</span></p>
              <p className="plan-tagline">Full autopilot mode</p>
              <ul className="plan-features">
                <li>Unlimited AI sessions</li>
                <li>Smart adaptive roadmaps</li>
                <li>Flashcards & quizzes</li>
                <li>Flight analytics dashboard</li>
                <li>Career navigator</li>
              </ul>
              <Link to="/register" className="plan-btn solid">Get Co-Pilot →</Link>
            </div>

            <div className="plan-card">
              <p className="plan-name">Squadron</p>
              <p className="plan-price"><sup>$</sup>49 <span>/ mo</span></p>
              <p className="plan-tagline">For teams & orgs</p>
              <ul className="plan-features">
                <li>Everything in Co-Pilot</li>
                <li>Team analytics</li>
                <li>Custom curriculum builder</li>
                <li>SSO & admin controls</li>
                <li>Dedicated support</li>
              </ul>
              <Link to="/contact" className="plan-btn outline">Contact Sales</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .home-page {
          padding-top: 68px;
        }

        .hero {
          min-height: calc(100vh - 68px);
          display: flex;
          align-items: center;
          padding: 4rem 1.5rem;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-content {
          flex: 1;
          max-width: 560px;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: var(--cyan);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid var(--cyan-dim);
          padding: 6px 14px;
          border-radius: 2px;
          margin-bottom: 2rem;
          animation: fadeUp 0.6s ease both;
        }

        .hero-tag::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cyan);
          animation: blink 1.4s step-start infinite;
        }

        .hero h1 {
          font-size: clamp(2.6rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 1.4rem;
          animation: fadeUp 0.7s 0.1s ease both;
        }

        .hero h1 em {
          font-style: normal;
          color: var(--cyan);
          display: block;
        }

        .hero-sub {
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--muted);
          margin-bottom: 2.4rem;
          font-weight: 400;
          animation: fadeUp 0.7s 0.2s ease both;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          animation: fadeUp 0.7s 0.3s ease both;
        }

        .hero-visual {
          flex: 1;
          max-width: 480px;
          animation: fadeUp 0.8s 0.4s ease both;
        }

        .cockpit {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.8rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 60px rgba(0, 212, 255, 0.08);
        }

        .cockpit::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          animation: scan 3s ease-in-out infinite;
        }

        .cockpit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.4rem;
        }

        .cockpit-title {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: var(--muted);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .status-dot {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          color: var(--teal);
        }

        .status-dot-inner {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--teal);
          animation: blink 1.4s step-start infinite;
        }

        .gauge-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.8rem;
          margin-bottom: 1.2rem;
        }

        .progress-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .prog-item {
          animation: fadeUp 0.6s ease both;
        }

        .prog-head {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--text);
          margin-bottom: 6px;
          font-weight: 600;
        }

        .features-section,
        .pricing-section {
          padding: 100px 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .pricing-section {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          max-width: none;
        }

        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: var(--cyan);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800;
          color: #fff;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .section-sub {
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.7;
          max-width: 480px;
          margin-bottom: 3.5rem;
          font-weight: 400;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.2rem;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .plan-card {
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
          background: var(--panel);
          position: relative;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .plan-card:hover {
          transform: translateY(-4px);
        }

        .plan-card.featured {
          border-color: var(--cyan);
          box-shadow: 0 0 32px rgba(0, 212, 255, 0.12);
        }

        .plan-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--cyan);
          color: #050a12;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 14px;
          border-radius: 20px;
        }

        .plan-name {
          font-size: 0.75rem;
          font-family: 'DM Mono', monospace;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 0.6rem;
        }

        .plan-price {
          font-size: 2.4rem;
          font-weight: 800;
          color: #fff;
          line-height: 1;
          margin-bottom: 0.3rem;
        }

        .plan-price sup {
          font-size: 1rem;
          vertical-align: super;
        }

        .plan-price span {
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--muted);
        }

        .plan-tagline {
          font-size: 0.82rem;
          color: var(--muted);
          margin-bottom: 1.6rem;
          font-weight: 400;
        }

        .plan-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          margin-bottom: 2rem;
        }

        .plan-features li {
          font-size: 0.85rem;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 400;
        }

        .plan-features li::before {
          content: '✓';
          color: var(--teal);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .plan-btn {
          display: block;
          text-align: center;
          padding: 12px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.85rem;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: all 0.2s;
        }

        .plan-btn.outline {
          border: 1px solid var(--border);
          color: var(--text);
        }

        .plan-btn.outline:hover {
          border-color: var(--cyan);
          color: var(--cyan);
        }

        .plan-btn.solid {
          background: var(--cyan);
          color: #050a12;
        }

        .plan-btn.solid:hover {
          box-shadow: var(--glow);
        }

        @media (max-width: 900px) {
          .hero {
            flex-direction: column;
            padding: 80px 1.5rem 60px;
            text-align: center;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-visual {
            max-width: 100%;
          }

          .features-section,
          .pricing-section {
            padding: 70px 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 80px 1rem 50px;
            gap: 2.5rem;
          }

          .hero-tag {
            font-size: 0.68rem;
            padding: 5px 12px;
            margin-bottom: 1.5rem;
          }

          .hero h1 {
            font-size: 2.2rem;
          }

          .hero-sub {
            font-size: 0.95rem;
            margin-bottom: 1.8rem;
          }

          .hero-actions {
            flex-direction: column;
            gap: 0.75rem;
          }

          .hero-actions .btn {
            width: 100%;
          }

          .cockpit {
            padding: 1.2rem;
          }

          .gauge-row {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 0.5rem;
          }

          .features-section,
          .pricing-section {
            padding: 50px 1rem;
          }

          .section-title {
            margin-bottom: 0.75rem;
          }

          .section-sub {
            font-size: 0.9rem;
            margin-bottom: 2.5rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .plans-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .plan-card {
            padding: 1.5rem;
          }

          .plan-price {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero {
            padding: 70px 0.875rem 40px;
          }

          .hero h1 {
            font-size: 1.8rem;
          }

          .cockpit {
            padding: 1rem;
            border-radius: 12px;
          }

          .gauge-row {
            grid-template-columns: 1fr 1fr;
          }

          .gauge-row > *:last-child {
            grid-column: span 2;
          }

          .features-section,
          .pricing-section {
            padding: 40px 0.875rem;
          }

          .plan-card {
            padding: 1.25rem;
          }
        }

        @media (max-width: 320px) {
          .hero h1 {
            font-size: 1.6rem;
          }

          .btn-lg {
            padding: 10px 14px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
