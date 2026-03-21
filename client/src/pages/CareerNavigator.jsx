import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTag from '../components/PageTag';

const CareerNavigator = () => {
  const [selectedRole, setSelectedRole] = useState(0);

  const roles = [
    { title: 'ML Engineer', match: 78, salary: '$140k-$180k', companies: 'Google, Meta, OpenAI', location: 'Remote OK' },
    { title: 'Data Scientist', match: 85, salary: '$120k-$155k', companies: 'Stripe, Airbnb, Netflix', location: 'Hybrid' },
    { title: 'AI Research Engineer', match: 52, salary: '$160k-$220k', companies: 'Anthropic, DeepMind', location: 'On-site' }
  ];

  const skills = [
    { name: 'Python', current: 90, required: 80 },
    { name: 'PyTorch', current: 55, required: 85 },
    { name: 'MLOps', current: 30, required: 70 },
    { name: 'Sys Design', current: 38, required: 80 },
    { name: 'Statistics', current: 80, required: 75 }
  ];

  const actions = [
    { priority: 'High', action: 'Complete MLOps Module', desc: 'Docker, FastAPI, and model deployment fundamentals.', eta: '3 weeks' },
    { priority: 'High', action: 'System Design for ML', desc: 'Design scalable ML pipelines and data infrastructure.', eta: '4 weeks' },
    { priority: 'Medium', action: 'Build 2 Portfolio Projects', desc: 'End-to-end deployed ML apps to show recruiters.', eta: '6 weeks' }
  ];

  return (
    <>
      <Navbar showBack backTo="/" />
      
      <main className="page">
        <div className="container">
          <PageTag label="Feature 05" emoji="🧭" />
          <h1>Career <em style={{color: 'var(--cyan)'}}>Navigator</em></h1>
          <p className="lead" style={{color: 'var(--muted)', marginBottom: '2rem'}}>
            Aileraner scans your skills, compares them to real job market data, and tells you exactly what gaps to close.
          </p>

          <div className="career-grid">
            <div className="panel">
              <div className="panel-header">🎯 Matched Roles — Based on Your Skills</div>
              <div className="panel-body">
                {roles.map((role, i) => (
                  <div 
                    key={i} 
                    className={`role-card ${selectedRole === i ? 'selected' : ''}`}
                    onClick={() => setSelectedRole(i)}
                  >
                    <div className="role-top">
                      <span className="role-title">{role.title}</span>
                      <span className="role-salary">{role.salary}</span>
                    </div>
                    <div className="role-company">{role.companies} · {role.location}</div>
                    <div className="match-bar">
                      <div className="match-fill" style={{
                        width: `${role.match}%`,
                        background: role.match < 60 ? 'linear-gradient(90deg, var(--amber), rgba(255,184,0,0.4))' : 'linear-gradient(90deg, var(--cyan), var(--teal))'
                      }}></div>
                    </div>
                    <div className="match-label">
                      <span>Your match</span>
                      <span style={{color: role.match >= 80 ? 'var(--teal)' : role.match >= 60 ? 'var(--cyan)' : 'var(--amber)'}}>{role.match}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '1.4rem'}}>
              <div className="panel">
                <div className="panel-header">⚡ Skill Gap — {roles[selectedRole].title}</div>
                <div className="panel-body">
                  <div className="legend-row">
                    <div className="legend-item"><div className="legend-dot" style={{background: 'var(--cyan)'}}></div>You</div>
                    <div className="legend-item"><div className="legend-dot" style={{background: 'var(--amber)'}}></div>Required</div>
                  </div>
                  <div className="skill-gap-list">
                    {skills.map((skill, i) => (
                      <div key={i} className="skill-row">
                        <div className="skill-name">{skill.name}</div>
                        <div className="skill-track">
                          <div className="skill-you" style={{
                            width: `${skill.current}%`,
                            background: skill.current >= skill.required ? 'var(--cyan)' : 'var(--red)'
                          }}></div>
                        </div>
                        <div className="skill-pct" style={{color: skill.current >= skill.required ? 'var(--teal)' : 'var(--red)'}}>{skill.current}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-header">🚀 AI Action Plan</div>
                <div className="panel-body">
                  <div className="action-list">
                    {actions.map((action, i) => (
                      <div key={i} className="action-item">
                        <span className="action-icon">{['1️⃣', '2️⃣', '3️⃣'][i]}</span>
                        <div>
                          <div className="action-title">{action.action}</div>
                          <div className="action-desc">{action.desc}</div>
                          <div className="action-eta">⏱ {action.eta} · {action.priority} Priority</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .career-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.4rem;
        }
        .panel-header {
          background: var(--surface);
          padding: 1rem 1.4rem;
          border-bottom: 1px solid var(--border);
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: var(--muted);
          text-transform: uppercase;
        }
        .panel-body { padding: 1.4rem; }
        .role-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.1rem 1.3rem;
          margin-bottom: 0.8rem;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.15s;
        }
        .role-card:hover { border-color: var(--cyan); transform: translateX(4px); }
        .role-card.selected { border-color: var(--cyan); background: rgba(0,212,255,0.04); }
        .role-top { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
        .role-title { font-weight: 700; font-size: 0.9rem; }
        .role-salary { font-family: 'DM Mono', monospace; font-size: 0.72rem; color: var(--teal); }
        .role-company { font-size: 0.75rem; color: var(--muted); margin-bottom: 0.6rem; }
        .match-bar { height: 4px; background: var(--border); border-radius: 4px; overflow: hidden; margin-top: 0.5rem; }
        .match-fill { height: 100%; border-radius: 4px; animation: grow 1s ease both; transform-origin: left; }
        .match-label { display: flex; justify-content: space-between; font-family: 'DM Mono', monospace; font-size: 0.62rem; color: var(--muted); margin-top: 4px; }
        .skill-gap-list { display: flex; flex-direction: column; gap: 0.8rem; }
        .skill-row { display: flex; align-items: center; gap: 0.8rem; }
        .skill-name { font-size: 0.82rem; font-weight: 600; min-width: 100px; }
        .skill-track { flex: 1; height: 6px; background: var(--border); border-radius: 4px; overflow: hidden; }
        .skill-you { height: 100%; border-radius: 4px; }
        .skill-pct { font-family: 'DM Mono', monospace; font-size: 0.65rem; min-width: 36px; text-align: right; }
        .legend-row { display: flex; gap: 1.2rem; margin-bottom: 1rem; }
        .legend-item { display: flex; align-items: center; gap: 6px; font-family: 'DM Mono', monospace; font-size: 0.62rem; color: var(--muted); }
        .legend-dot { width: 8px; height: 4px; border-radius: 2px; }
        .action-list { display: flex; flex-direction: column; gap: 0.8rem; }
        .action-item { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 1rem 1.2rem; display: flex; align-items: flex-start; gap: 10px; transition: border-color 0.2s; cursor: pointer; }
        .action-item:hover { border-color: var(--cyan); }
        .action-icon { font-size: 1.1rem; }
        .action-title { font-size: 0.85rem; font-weight: 700; margin-bottom: 2px; }
        .action-desc { font-size: 0.75rem; color: var(--muted); margin-bottom: 4px; }
        .action-eta { font-family: 'DM Mono', monospace; font-size: 0.62rem; color: var(--amber); }
        @media (max-width: 800px) {
          .career-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default CareerNavigator;
