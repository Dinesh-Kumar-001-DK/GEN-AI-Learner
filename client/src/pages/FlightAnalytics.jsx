import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTag from '../components/PageTag';

const FlightAnalytics = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const data = Array(28).fill(0).map(() => Math.random());
    setHeatmapData(data);
  }, []);

  const getHeatColor = (value) => {
    if (value > 0.7) return 'rgba(0, 212, 255, 0.9)';
    if (value > 0.4) return 'rgba(0, 212, 255, 0.5)';
    if (value > 0.1) return 'rgba(0, 212, 255, 0.25)';
    return 'rgba(0, 212, 255, 0.1)';
  };

  return (
    <>
      <Navbar showBack backTo="/" />
      
      <main className="page">
        <div className="container">
          <PageTag label="Feature 04" emoji="📡" />
          <h1>Flight <em style={{color: 'var(--cyan)'}}>Analytics</em></h1>
          <p className="lead" style={{color: 'var(--muted)', marginBottom: '2rem'}}>
            Your personal learning cockpit. Deep visibility into study patterns, retention curves, and weak zones.
          </p>

          <div className="kpi-row">
            <div className="kpi">
              <div className="kpi-val" style={{color: 'var(--cyan)'}}>47</div>
              <div className="kpi-label">Day Streak</div>
              <div className="kpi-change" style={{color: 'var(--teal)'}}>↑ +3 this week</div>
            </div>
            <div className="kpi">
              <div className="kpi-val" style={{color: 'var(--teal)'}}>94%</div>
              <div className="kpi-label">Retention Rate</div>
              <div className="kpi-change" style={{color: 'var(--teal)'}}>↑ +6% vs last month</div>
            </div>
            <div className="kpi">
              <div className="kpi-val" style={{color: 'var(--amber)'}}>3.2h</div>
              <div className="kpi-label">Avg. Daily Study</div>
              <div className="kpi-change" style={{color: 'var(--teal)'}}>↑ +0.4h this week</div>
            </div>
            <div className="kpi">
              <div className="kpi-val" style={{color: 'var(--red)'}}>38%</div>
              <div className="kpi-label">Weak Zone</div>
              <div className="kpi-change" style={{color: 'var(--red)'}}>System Design</div>
            </div>
          </div>

          <div className="charts-row">
            <div className="chart-card">
              <div className="chart-header">
                <span className="chart-title">Weekly Study Hours</span>
                <span style={{color: 'var(--teal)', fontFamily: 'DM Mono', fontSize: '0.65rem'}}>↑ Trending up</span>
              </div>
              <div className="chart-body">
                <div className="bar-chart">
                  {['55%', '80%', '45%', '95%', '70%', '60%', '30%'].map((h, i) => (
                    <div key={i} className="bar-col">
                      <div className="bar" style={{height: h, background: i >= 5 ? 'linear-gradient(180deg, var(--amber), rgba(255,184,0,0.3))' : 'linear-gradient(180deg, var(--cyan), rgba(0,212,255,0.3))'}}></div>
                      <div className="bar-label">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <span className="chart-title">Topic Coverage</span>
              </div>
              <div className="chart-body">
                <div className="donut-wrap">
                  <svg className="donut" width="90" height="90" viewBox="0 0 90 90">
                    <circle cx="45" cy="45" r="35" fill="none" stroke="#1a3550" strokeWidth="14"/>
                    <circle cx="45" cy="45" r="35" fill="none" stroke="#00d4ff" strokeWidth="14" strokeDasharray="82 138" strokeDashoffset="0" strokeLinecap="round"/>
                    <circle cx="45" cy="45" r="35" fill="none" stroke="#00ffc8" strokeWidth="14" strokeDasharray="50 170" strokeDashoffset="-82" strokeLinecap="round"/>
                    <circle cx="45" cy="45" r="35" fill="none" stroke="#ffb800" strokeWidth="14" strokeDasharray="26 194" strokeDashoffset="-132" strokeLinecap="round"/>
                  </svg>
                  <div className="legend">
                    <div className="leg-item"><div className="leg-dot" style={{background: 'var(--cyan)'}}></div><div><div className="leg-label">ML Basics</div><div className="leg-val">37%</div></div></div>
                    <div className="leg-item"><div className="leg-dot" style={{background: 'var(--teal)'}}></div><div><div className="leg-label">Math</div><div className="leg-val">23%</div></div></div>
                    <div className="leg-item"><div className="leg-dot" style={{background: 'var(--amber)'}}></div><div><div className="leg-label">Python</div><div className="leg-val">12%</div></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="charts-row">
            <div className="chart-card">
              <div className="chart-header">
                <span className="chart-title">Activity Heatmap — Last 4 Weeks</span>
              </div>
              <div className="chart-body">
                <div className="heatmap-labels">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <div key={i} className="heat-lbl">{d}</div>
                  ))}
                </div>
                <div className="heatmap">
                  {heatmapData.map((v, i) => (
                    <div key={i} className="heat-cell" style={{background: getHeatColor(v)}} title={`${Math.round(v*4)}h studied`}></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-title">🤖 AI Insights</div>
              <div className="insight-list">
                <div className="insight-item">
                  <span className="insight-icon">🎯</span>
                  <div className="insight-text">Your <strong>peak focus window</strong> is 8–10 AM. Schedule hard topics here.</div>
                </div>
                <div className="insight-item">
                  <span className="insight-icon">⚠️</span>
                  <div className="insight-text"><strong>System Design</strong> is your weakest area. Ailer recommends 2 sessions this week.</div>
                </div>
                <div className="insight-item">
                  <span className="insight-icon">🔥</span>
                  <div className="insight-text">You've studied <strong>47 days straight</strong> — top 3% of learners.</div>
                </div>
                <div className="insight-item">
                  <span className="insight-icon">📈</span>
                  <div className="insight-text">Retention improved <strong>+6%</strong> after switching to spaced repetition.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .kpi {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.2rem;
        }
        .kpi-val {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1;
        }
        .kpi-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          color: var(--muted);
          text-transform: uppercase;
          margin-top: 4px;
        }
        .kpi-change {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          margin-top: 6px;
        }
        .charts-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.2rem;
          margin-bottom: 1.2rem;
        }
        .chart-card {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
        }
        .chart-header {
          background: var(--surface);
          padding: 1rem 1.4rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chart-title {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: var(--muted);
          text-transform: uppercase;
        }
        .chart-body { padding: 1.4rem; }
        .bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 120px;
        }
        .bar-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .bar {
          width: 100%;
          border-radius: 3px 3px 0 0;
          transition: filter 0.2s;
        }
        .bar:hover { filter: brightness(1.3); }
        .bar-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          color: var(--muted);
        }
        .donut-wrap { display: flex; align-items: center; gap: 1.2rem; }
        .legend { display: flex; flex-direction: column; gap: 0.5rem; }
        .leg-item { display: flex; align-items: center; gap: 8px; }
        .leg-dot { width: 8px; height: 8px; border-radius: 50%; }
        .leg-label { font-weight: 600; font-size: 0.78rem; }
        .leg-val { color: var(--muted); font-size: 0.72rem; }
        .heatmap { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
        .heat-cell { height: 18px; border-radius: 3px; }
        .heatmap-labels { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-bottom: 4px; }
        .heat-lbl { font-family: 'DM Mono', monospace; font-size: 0.55rem; color: var(--muted); text-align: center; }
        .insight-card {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.4rem;
        }
        .insight-title {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: var(--muted);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .insight-list { display: flex; flex-direction: column; gap: 0.8rem; }
        .insight-item { display: flex; align-items: flex-start; gap: 10px; font-size: 0.82rem; }
        .insight-icon { font-size: 1rem; }
        .insight-text strong { color: var(--cyan); }
        @media (max-width: 900px) {
          .kpi-row { grid-template-columns: 1fr 1fr; }
          .charts-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default FlightAnalytics;
