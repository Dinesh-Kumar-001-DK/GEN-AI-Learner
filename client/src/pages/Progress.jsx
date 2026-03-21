import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTag from '../components/PageTag';
import ProgressBar from '../components/ProgressBar';
import Gauge from '../components/Gauge';
import { useAuth } from '../context/AuthContext';
import { progressApi } from '../api/axios';

const Progress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    averageProgress: 0,
    totalQuizzes: 0,
    averageQuizScore: 0
  });
  const [loading, setLoading] = useState(true);

  const phases = [
    {
      status: 'completed',
      label: 'Phase 1 — Complete',
      title: 'Python & Math Foundations',
      description: 'Core Python programming, NumPy, linear algebra, and probability theory.',
      tags: ['Python', 'NumPy', 'Linear Algebra', 'Probability'],
      eta: null
    },
    {
      status: 'completed',
      label: 'Phase 2 — Complete',
      title: 'Data Wrangling & EDA',
      description: 'Pandas, Matplotlib, data cleaning, and exploratory analysis.',
      tags: ['Pandas', 'Matplotlib', 'EDA'],
      eta: null
    },
    {
      status: 'active',
      label: 'Phase 3 — In Progress',
      title: 'Classical Machine Learning',
      description: 'Supervised and unsupervised learning algorithms with scikit-learn.',
      tags: ['Regression', 'Classification', 'Clustering', 'Model Eval'],
      eta: '⏱ Est. 3 more weeks'
    },
    {
      status: 'locked',
      label: 'Phase 4 — Locked',
      title: 'Deep Learning & Neural Networks',
      description: 'PyTorch fundamentals, CNNs, RNNs, and transformer architecture.',
      tags: ['PyTorch', 'CNNs', 'Transformers'],
      eta: null
    },
    {
      status: 'locked',
      label: 'Phase 5 — Locked',
      title: 'MLOps & Deployment',
      description: 'Model deployment, monitoring, pipelines, and production-ready ML.',
      tags: ['Docker', 'FastAPI', 'MLflow'],
      eta: null
    }
  ];

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const { data } = await progressApi.getAll();
      if (data.progress) setProgress(data.progress);
      if (data.stats) setStats(data.stats);
    } catch (err) {
      console.error('Progress error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar showBack backTo="/" />
      
      <main className="progress-page page">
        <div className="container">
          <div className="progress-header fade-up">
            <PageTag label="Learning Roadmap" emoji="🗺️" />
            <h1>Smart <em>Roadmaps</em></h1>
            <p className="lead">
              AI-generated learning paths built around your exact goal, current skills, and available time.
            </p>
          </div>

          <div className="roadmap-header fade-up fade-up-1">
            <div className="goal-info">
              <span className="goal-label mono">Your Goal</span>
              <h3 className="goal-title">
                🎯 {user?.learningGoal || 'Machine Learning Engineer'}
              </h3>
            </div>
            <div className="progress-summary">
              <div className="prog-percent">{stats.averageProgress}%</div>
              <div className="prog-sub mono">Complete</div>
            </div>
          </div>

          <div className="roadmap fade-up fade-up-2">
            {phases.map((phase, index) => (
              <div key={index} className={`phase ${phase.status}`}>
                <div className="phase-connector">
                  <div className={`node ${phase.status}`}>
                    {phase.status === 'completed' ? '✓' : phase.status === 'active' ? index + 1 : index + 1}
                  </div>
                  {index < phases.length - 1 && (
                    <div className={`connector ${phase.status === 'locked' ? 'locked' : ''}`}></div>
                  )}
                </div>
                <div className="phase-content">
                  <span className="phase-label mono">{phase.label}</span>
                  <h3 className="phase-title">{phase.title}</h3>
                  <p className="phase-desc">{phase.description}</p>
                  <div className="phase-tags">
                    {phase.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className={`tag ${phase.status}`}>{tag}</span>
                    ))}
                  </div>
                  {phase.eta && <span className="eta mono">{phase.eta}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="stats-section fade-up fade-up-3">
            <h2>Your Stats</h2>
            <div className="stats-grid">
              <Gauge value={stats.totalCourses} label="Courses Started" delay={0} />
              <Gauge value={stats.completedCourses} label="Completed" color="var(--teal)" delay={0.1} />
              <Gauge value={`${stats.averageProgress}%`} label="Avg Progress" color="var(--amber)" delay={0.2} />
              <Gauge value={stats.totalQuizzes} label="Quizzes Taken" color="var(--red)" delay={0.3} />
            </div>
          </div>

          {progress.length > 0 && (
            <div className="course-progress-section fade-up fade-up-4">
              <h2>Course Progress</h2>
              <div className="course-list">
                {progress.map((p) => (
                  <div key={p._id} className="course-item">
                    <div className="course-thumb">
                      {p.courseId?.thumbnail ? (
                        <img src={p.courseId.thumbnail} alt={p.courseId?.title} />
                      ) : (
                        <span>📚</span>
                      )}
                    </div>
                    <div className="course-info">
                      <h4>{p.courseId?.title}</h4>
                      <ProgressBar percent={p.percentComplete} />
                    </div>
                    <span className="course-status mono">
                      {p.percentComplete === 100 ? '✓ Done' : `${p.percentComplete}%`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        .progress-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .progress-header h1 em {
          font-style: normal;
          color: var(--cyan);
        }

        .lead {
          font-size: 1rem;
          color: var(--muted);
          max-width: 500px;
          margin: 0.5rem auto 0;
        }

        .roadmap-header {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .goal-label {
          font-size: 0.65rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }

        .goal-title {
          font-size: 1.1rem;
        }

        .progress-summary {
          text-align: right;
        }

        .prog-percent {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--cyan);
          line-height: 1;
        }

        .prog-sub {
          font-size: 0.65rem;
          color: var(--muted);
          text-transform: uppercase;
        }

        .roadmap {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 3rem;
        }

        .phase {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }

        .phase-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .node {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 800;
          border: 2px solid;
          transition: transform 0.2s;
        }

        .node:hover {
          transform: scale(1.1);
        }

        .node.completed {
          background: var(--teal);
          border-color: var(--teal);
          color: #050a12;
        }

        .node.active {
          background: var(--cyan);
          border-color: var(--cyan);
          color: #050a12;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
          animation: pulse-node 2s ease-in-out infinite;
        }

        .node.locked {
          background: var(--panel);
          border-color: var(--border);
          color: var(--muted);
        }

        .connector {
          width: 2px;
          height: 40px;
          background: linear-gradient(var(--teal), var(--border));
          flex-shrink: 0;
        }

        .connector.locked {
          background: var(--border);
        }

        .phase-content {
          flex: 1;
          padding-bottom: 2rem;
        }

        .phase-label {
          font-size: 0.65rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }

        .phase-title {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .phase-desc {
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 0.8rem;
        }

        .phase-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 0.5rem;
        }

        .tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          padding: 3px 10px;
          border-radius: 20px;
          border: 1px solid;
        }

        .tag.completed {
          border-color: var(--teal);
          color: var(--teal);
        }

        .tag.active {
          border-color: var(--cyan);
          color: var(--cyan);
        }

        .tag.locked {
          border-color: var(--border);
          color: var(--muted);
        }

        .eta {
          font-size: 0.72rem;
          color: var(--amber);
        }

        .stats-section,
        .course-progress-section {
          margin-bottom: 2rem;
        }

        .stats-section h2,
        .course-progress-section h2 {
          margin-bottom: 1.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .course-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .course-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: var(--radius);
        }

        .course-thumb {
          width: 50px;
          height: 40px;
          border-radius: 6px;
          overflow: hidden;
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .course-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .course-info {
          flex: 1;
          min-width: 0;
        }

        .course-info h4 {
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .course-status {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--cyan);
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .roadmap-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .progress-summary {
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default Progress;
