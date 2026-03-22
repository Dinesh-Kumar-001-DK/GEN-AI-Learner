import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTag from '../components/PageTag';
import ProgressBar from '../components/ProgressBar';
import Gauge from '../components/Gauge';
import { useAuth } from '../context/AuthContext';
import { progressApi, courseApi } from '../api/axios';

const Progress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    averageProgress: 0,
    totalQuizzes: 0,
    averageQuizScore: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState(user?.learningGoal || 'Machine Learning Engineer');

  const learningPaths = {
    'Machine Learning Engineer': {
      phases: [
        { title: 'Python & Math Foundations', desc: 'Core Python, NumPy, linear algebra, and probability.', tags: ['Python', 'NumPy', 'Linear Algebra', 'Probability'], weeks: 4 },
        { title: 'Data Wrangling & EDA', desc: 'Pandas, Matplotlib, data cleaning, and visualization.', tags: ['Pandas', 'Matplotlib', 'EDA', 'Seaborn'], weeks: 4 },
        { title: 'Classical Machine Learning', desc: 'Scikit-learn, supervised/unsupervised learning.', tags: ['Scikit-learn', 'Regression', 'Classification'], weeks: 6 },
        { title: 'Deep Learning & Neural Networks', desc: 'PyTorch, CNNs, RNNs, and transformers.', tags: ['PyTorch', 'CNNs', 'Transformers'], weeks: 8 },
        { title: 'MLOps & Deployment', desc: 'Model serving, monitoring, and pipelines.', tags: ['Docker', 'FastAPI', 'MLflow'], weeks: 4 }
      ],
      totalWeeks: 26
    },
    'Full Stack Developer': {
      phases: [
        { title: 'HTML & CSS Fundamentals', desc: 'Semantic HTML, CSS Grid, Flexbox, responsive design.', tags: ['HTML5', 'CSS3', 'Responsive'], weeks: 3 },
        { title: 'JavaScript Mastery', desc: 'ES6+, DOM manipulation, async/await.', tags: ['JavaScript', 'ES6', 'TypeScript'], weeks: 4 },
        { title: 'React & State Management', desc: 'React hooks, Redux, and context API.', tags: ['React', 'Redux', 'Context API'], weeks: 5 },
        { title: 'Backend Development', desc: 'Node.js, Express, and database design.', tags: ['Node.js', 'Express', 'MongoDB'], weeks: 5 },
        { title: 'DevOps & Deployment', desc: 'Git, Docker, CI/CD, and cloud deployment.', tags: ['Git', 'Docker', 'AWS'], weeks: 3 }
      ],
      totalWeeks: 20
    },
    'Data Scientist': {
      phases: [
        { title: 'Python for Data Science', desc: 'Python basics, NumPy, Pandas fundamentals.', tags: ['Python', 'NumPy', 'Pandas'], weeks: 4 },
        { title: 'Statistics & Probability', desc: 'Descriptive stats, hypothesis testing, distributions.', tags: ['Statistics', 'Probability', 'Hypothesis'], weeks: 4 },
        { title: 'Data Visualization', desc: 'Matplotlib, Seaborn, Plotly for insights.', tags: ['Matplotlib', 'Seaborn', 'Plotly'], weeks: 3 },
        { title: 'Machine Learning', desc: 'Scikit-learn, feature engineering, model selection.', tags: ['Scikit-learn', 'Feature Engineering'], weeks: 5 },
        { title: 'Deep Learning', desc: 'Neural networks, CNNs, NLP basics.', tags: ['TensorFlow', 'NLP', 'Computer Vision'], weeks: 6 }
      ],
      totalWeeks: 22
    },
    'DevOps Engineer': {
      phases: [
        { title: 'Linux & Bash', desc: 'Linux fundamentals, shell scripting, SSH.', tags: ['Linux', 'Bash', 'Shell'], weeks: 3 },
        { title: 'Docker & Containers', desc: 'Container fundamentals, Docker Compose, networking.', tags: ['Docker', 'Containers', 'Compose'], weeks: 4 },
        { title: 'Kubernetes', desc: 'K8s architecture, deployments, services.', tags: ['Kubernetes', 'Helm', 'Kustomize'], weeks: 5 },
        { title: 'CI/CD Pipelines', desc: 'Jenkins, GitHub Actions, GitLab CI.', tags: ['Jenkins', 'GitHub Actions', 'GitLab'], weeks: 4 },
        { title: 'Cloud & Monitoring', desc: 'AWS/GCP, Terraform, Prometheus, Grafana.', tags: ['AWS', 'Terraform', 'Monitoring'], weeks: 5 }
      ],
      totalWeeks: 21
    }
  };

  const currentPath = learningPaths[selectedGoal] || learningPaths['Machine Learning Engineer'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [progressRes, coursesRes] = await Promise.all([
        progressApi.getAll(),
        courseApi.getAll()
      ]);
      if (progressRes.data.progress) setProgress(progressRes.data.progress);
      if (progressRes.data.stats) setStats(progressRes.data.stats);
      if (coursesRes.data.courses) setCourses(coursesRes.data.courses);
    } catch (err) {
      console.error('Progress error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = () => {
    if (progress.length === 0) return 0;
    const total = progress.reduce((acc, p) => acc + p.percentComplete, 0);
    return Math.round(total / progress.length);
  };

  const completedPhases = Math.floor(calculateProgress() / 20);

  return (
    <>
      <Navbar showBack backTo="/" />
      
      <main className="progress-page page">
        <div className="container">
          <div className="progress-header fade-up">
            <PageTag label="Learning Roadmap" emoji="🗺️" />
            <h1>Smart <em>Roadmaps</em></h1>
            <p className="lead">
              AI-generated learning paths built around your exact goal.
            </p>
          </div>

          <div className="roadmap-header fade-up fade-up-1">
            <div className="goal-selector">
              <span className="goal-label mono">Select Your Path</span>
              <div className="path-buttons">
                {Object.keys(learningPaths).map((goal) => (
                  <button
                    key={goal}
                    className={`path-btn ${selectedGoal === goal ? 'active' : ''}`}
                    onClick={() => setSelectedGoal(goal)}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
            <div className="progress-summary">
              <div className="prog-percent">{calculateProgress()}%</div>
              <div className="prog-sub mono">Complete</div>
              <div className="prog-weeks mono">Est. {currentPath.totalWeeks - (completedPhases * 4)} weeks left</div>
            </div>
          </div>

          <div className="roadmap fade-up fade-up-2">
            {currentPath.phases.map((phase, index) => {
              const isCompleted = index < completedPhases;
              const isActive = index === completedPhases;
              const status = isCompleted ? 'completed' : isActive ? 'active' : 'locked';
              
              return (
                <div key={index} className={`phase ${status}`}>
                  <div className="phase-connector">
                    <div className={`node ${status}`}>
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    {index < currentPath.phases.length - 1 && (
                      <div className={`connector ${status}`}></div>
                    )}
                  </div>
                  <div className="phase-content">
                    <div className="phase-header">
                      <span className="phase-label mono">
                        {status === 'completed' ? '✓ Completed' : status === 'active' ? '🚀 In Progress' : `📋 Phase ${index + 1}`}
                      </span>
                      <span className="phase-weeks mono">{phase.weeks} weeks</span>
                    </div>
                    <h3 className="phase-title">{phase.title}</h3>
                    <p className="phase-desc">{phase.desc}</p>
                    <div className="phase-tags">
                      {phase.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={`tag ${status}`}>{tag}</span>
                      ))}
                    </div>
                    {status === 'active' && (
                      <Link to="/courses" className="btn btn-primary btn-sm phase-cta">
                        Start Learning →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="stats-section fade-up fade-up-3">
            <h2>Your Learning Stats</h2>
            <div className="stats-grid">
              <Gauge value={stats.totalCourses} label="Courses Started" delay={0} />
              <Gauge value={stats.completedCourses} label="Completed" color="var(--teal)" delay={0.1} />
              <Gauge value={`${stats.averageProgress}%`} label="Avg Progress" color="var(--amber)" delay={0.2} />
              <Gauge value={stats.totalQuizzes} label="Quizzes Taken" color="var(--red)" delay={0.3} />
            </div>
          </div>

          {progress.length > 0 && (
            <div className="course-progress-section fade-up fade-up-4">
              <h2>Your Courses</h2>
              <div className="course-list">
                {progress.map((p) => (
                  <Link to={`/courses/${p.courseId?._id}`} key={p._id} className="course-item">
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
                    <span className={`course-status mono ${p.percentComplete === 100 ? 'completed' : ''}`}>
                      {p.percentComplete === 100 ? '✓ Done' : `${p.percentComplete}%`}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        .progress-page { min-height: 100vh; }
        .progress-header { text-align: center; margin-bottom: 2rem; }
        .progress-header h1 em { font-style: normal; color: var(--cyan); }
        .lead { font-size: 1rem; color: var(--muted); max-width: 500px; margin: 0.5rem auto 0; }

        .roadmap-header {
          background: var(--panel); border: 1px solid var(--border); border-radius: 16px;
          padding: 1.5rem 2rem; display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1.5rem;
        }
        .goal-label { font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem; display: block; }
        .path-buttons { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .path-btn {
          background: var(--surface); border: 1px solid var(--border); color: var(--muted);
          padding: 8px 16px; border-radius: 8px; font-size: 0.8rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
        }
        .path-btn:hover { border-color: var(--cyan); color: var(--cyan); }
        .path-btn.active { background: var(--cyan); border-color: var(--cyan); color: #050a12; }

        .progress-summary { text-align: right; }
        .prog-percent { font-size: 2.5rem; font-weight: 800; color: var(--cyan); line-height: 1; }
        .prog-sub { font-size: 0.65rem; color: var(--muted); text-transform: uppercase; margin-top: 4px; }
        .prog-weeks { font-size: 0.7rem; color: var(--amber); margin-top: 4px; }

        .roadmap { display: flex; flex-direction: column; gap: 0; margin-bottom: 3rem; }
        .phase { display: flex; gap: 2rem; align-items: flex-start; }
        .phase-connector { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
        
        .node {
          width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-size: 1.1rem; font-weight: 800; border: 2px solid;
          transition: transform 0.2s; cursor: pointer;
        }
        .node:hover { transform: scale(1.1); }
        .node.completed { background: var(--teal); border-color: var(--teal); color: #050a12; }
        .node.active { background: var(--cyan); border-color: var(--cyan); color: #050a12; box-shadow: 0 0 20px rgba(0, 212, 255, 0.4); animation: pulse-node 2s ease-in-out infinite; }
        .node.locked { background: var(--panel); border-color: var(--border); color: var(--muted); }
        
        .connector { width: 2px; height: 40px; background: var(--border); flex-shrink: 0; }
        .connector.completed { background: linear-gradient(var(--teal), var(--border)); }
        
        .phase-content { flex: 1; padding-bottom: 2rem; }
        .phase-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .phase-label { font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
        .phase-weeks { font-size: 0.65rem; color: var(--amber); }
        .phase-title { font-size: 1.1rem; margin-bottom: 0.5rem; }
        .phase-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.6; margin-bottom: 0.8rem; }
        
        .phase-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1rem; }
        .tag {
          font-family: 'DM Mono', monospace; font-size: 0.65rem; padding: 3px 10px;
          border-radius: 20px; border: 1px solid;
        }
        .tag.completed { border-color: var(--teal); color: var(--teal); }
        .tag.active { border-color: var(--cyan); color: var(--cyan); }
        .tag.locked { border-color: var(--border); color: var(--muted); }
        
        .phase-cta { margin-top: 0.5rem; }

        .stats-section, .course-progress-section { margin-bottom: 2rem; }
        .stats-section h2, .course-progress-section h2 { margin-bottom: 1.5rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }

        .course-list { display: flex; flex-direction: column; gap: 1rem; }
        .course-item {
          display: flex; align-items: center; gap: 1rem; padding: 1rem;
          background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius);
          transition: border-color 0.2s;
        }
        .course-item:hover { border-color: var(--cyan); }
        .course-thumb {
          width: 60px; height: 45px; border-radius: 6px; overflow: hidden;
          background: var(--surface); display: flex; align-items: center;
          justify-content: center; font-size: 1.2rem; flex-shrink: 0;
        }
        .course-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .course-info { flex: 1; min-width: 0; }
        .course-info h4 { font-size: 0.9rem; margin-bottom: 0.5rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .course-status { font-size: 0.85rem; font-weight: 700; color: var(--cyan); }
        .course-status.completed { color: var(--teal); }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .roadmap-header { flex-direction: column; align-items: stretch; }
          .progress-summary { text-align: center; }

          .phase { gap: 1.5rem; }
          .phase-content { padding-bottom: 1.5rem; }
          .node { width: 40px; height: 40px; font-size: 1rem; }
        }

        @media (max-width: 480px) {
          .progress-header h1 { font-size: 1.5rem; }
          
          .roadmap-header { padding: 1rem; }
          .path-buttons { gap: 0.4rem; }
          .path-btn { padding: 6px 12px; font-size: 0.72rem; }
          
          .prog-percent { font-size: 2rem; }
          
          .roadmap { gap: 0; }
          .phase { gap: 1rem; }
          .phase-connector { flex-shrink: 0; }
          .node { width: 36px; height: 36px; font-size: 0.9rem; }
          .connector { height: 30px; }
          
          .phase-content { padding-bottom: 1.25rem; }
          .phase-title { font-size: 1rem; }
          .phase-desc { font-size: 0.8rem; }
          
          .phase-tags { gap: 4px; }
          .tag { font-size: 0.6rem; padding: 2px 8px; }
          
          .stats-grid { grid-template-columns: 1fr 1fr; gap: 0.75rem; }
          
          .course-item { padding: 0.75rem; gap: 0.75rem; }
          .course-thumb { width: 50px; height: 38px; }
          .course-info h4 { font-size: 0.85rem; }
        }

        @media (max-width: 320px) {
          .phase { gap: 0.75rem; }
          .node { width: 32px; height: 32px; }
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default Progress;
