import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gauge from '../components/Gauge';
import ProgressBar from '../components/ProgressBar';
import Panel from '../components/Panel';
import StatusDot from '../components/StatusDot';
import { useAuth } from '../context/AuthContext';
import { progressApi, courseApi, sessionApi } from '../api/axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    averageProgress: 0,
    averageQuizScore: 0
  });
  const [progress, setProgress] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, sessionsRes] = await Promise.all([
          progressApi.getAll(),
          sessionApi.getAll({ status: 'upcoming' })
        ]);

        if (progressRes.data.stats) {
          setStats(progressRes.data.stats);
        }
        if (progressRes.data.progress) {
          setProgress(progressRes.data.progress.slice(0, 4));
        }
        if (sessionsRes.data.sessions) {
          setSessions(sessionsRes.data.sessions.slice(0, 3));
        }
      } catch (err) {
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      
      <main className="dashboard page">
        <div className="container">
          <div className="dashboard-header fade-up">
            <div>
              <h1>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
              <p className="text-muted">Here's your learning cockpit overview</p>
            </div>
            <Link to="/ai-tutor" className="btn btn-primary">
              Start AI Session →
            </Link>
          </div>

          <div className="kpi-row">
            <Gauge value={stats.totalCourses} label="Courses Enrolled" delay={0.1} />
            <Gauge value={`${stats.averageProgress}%`} label="Avg Progress" color="var(--teal)" delay={0.2} />
            <Gauge value={`${stats.averageQuizScore}%`} label="Quiz Average" color="var(--amber)" delay={0.3} />
            <Gauge value={user?.currentStreak || 0} label="Day Streak" color="var(--red)" delay={0.4} />
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-main">
              <Panel header="📚 Continue Learning">
                {loading ? (
                  <div className="loading-text">Loading...</div>
                ) : progress.length > 0 ? (
                  <div className="course-progress-list">
                    {progress.map((p, i) => (
                      <Link to={`/courses/${p.courseId?._id}`} key={p._id} className="course-progress-item">
                        <div className="course-thumb">
                          {p.courseId?.thumbnail ? (
                            <img src={p.courseId.thumbnail} alt={p.courseId?.title} />
                          ) : (
                            <div className="thumb-placeholder">📚</div>
                          )}
                        </div>
                        <div className="course-info">
                          <h4>{p.courseId?.title || 'Course'}</h4>
                          <p className="text-muted mono">{p.courseId?.category}</p>
                          <ProgressBar percent={p.percentComplete} />
                        </div>
                        <span className="course-percent mono">{p.percentComplete}%</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No courses started yet</p>
                    <Link to="/courses" className="btn btn-outline btn-sm">Browse Courses</Link>
                  </div>
                )}
              </Panel>

              <Panel header="🎥 Upcoming Sessions" className="mt-1">
                {loading ? (
                  <div className="loading-text">Loading...</div>
                ) : sessions.length > 0 ? (
                  <div className="session-list">
                    {sessions.map((session) => (
                      <div key={session._id} className="session-item">
                        <div className="session-info">
                          <h4>{session.title}</h4>
                          <p className="text-muted mono">{session.topic} · {session.instructor.name}</p>
                        </div>
                        <div className="session-meta">
                          <span className="badge badge-amber">
                            {new Date(session.scheduledAt).toLocaleDateString()}
                          </span>
                          <span className="mono text-muted">{session.duration}min</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No upcoming sessions</p>
                  </div>
                )}
              </Panel>
            </div>

            <div className="dashboard-sidebar">
              <Panel header="🛫 AI Status">
                <div className="ai-status-content">
                  <StatusDot label="Ailer AI · Active" color="var(--teal)" />
                  <p className="text-muted mt-1">Your AI co-pilot is ready to help</p>
                  <Link to="/ai-tutor" className="btn btn-outline btn-sm mt-1">
                    Chat with AI →
                  </Link>
                </div>
              </Panel>

              <Panel header="🎯 Quick Actions" className="mt-1">
                <div className="quick-actions">
                  <Link to="/courses" className="action-item">
                    <span className="action-icon">📚</span>
                    <span>Browse Courses</span>
                  </Link>
                  <Link to="/progress" className="action-item">
                    <span className="action-icon">📊</span>
                    <span>View Progress</span>
                  </Link>
                  <Link to="/ai-tutor" className="action-item">
                    <span className="action-icon">🧠</span>
                    <span>AI Tutor Session</span>
                  </Link>
                </div>
              </Panel>

              {user?.learningGoal && (
                <Panel header="🎯 Your Goal" className="mt-1">
                  <div className="goal-content">
                    <h4>{user.learningGoal}</h4>
                    <p className="text-muted mono mt-1">Keep pushing forward!</p>
                  </div>
                </Panel>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .course-progress-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .course-progress-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          transition: border-color 0.2s;
        }

        .course-progress-item:hover {
          border-color: var(--cyan);
        }

        .course-thumb {
          width: 60px;
          height: 45px;
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .course-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumb-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--border);
          font-size: 1.2rem;
        }

        .course-info {
          flex: 1;
          min-width: 0;
        }

        .course-info h4 {
          font-size: 0.9rem;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .course-info p {
          font-size: 0.72rem;
          margin-bottom: 8px;
        }

        .course-percent {
          font-size: 1rem;
          font-weight: 700;
          color: var(--cyan);
        }

        .session-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .session-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem;
          background: var(--surface);
          border-radius: var(--radius);
        }

        .session-info h4 {
          font-size: 0.85rem;
          margin-bottom: 4px;
        }

        .session-info p {
          font-size: 0.68rem;
        }

        .session-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .ai-status-content {
          text-align: center;
          padding: 1rem 0;
        }

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .action-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.8rem 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          font-size: 0.85rem;
          font-weight: 600;
          transition: border-color 0.2s, color 0.2s;
        }

        .action-item:hover {
          border-color: var(--cyan);
          color: var(--cyan);
        }

        .action-icon {
          font-size: 1.1rem;
        }

        .goal-content {
          text-align: center;
        }

        .empty-state {
          text-align: center;
          padding: 2rem;
          color: var(--muted);
        }

        .empty-state p {
          margin-bottom: 1rem;
        }

        .loading-text {
          text-align: center;
          color: var(--muted);
          padding: 2rem;
        }

        .mt-1 { margin-top: 1rem; }

        @media (max-width: 900px) {
          .kpi-row {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .dashboard-header h1 {
            font-size: 1.5rem;
          }

          .kpi-row {
            gap: 0.75rem;
          }

          .course-progress-item {
            padding: 0.75rem;
            gap: 0.75rem;
          }

          .course-thumb {
            width: 50px;
            height: 38px;
          }

          .course-percent {
            font-size: 0.85rem;
          }

          .session-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .session-meta {
            flex-direction: row;
            align-items: center;
            gap: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .kpi-row {
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }

          .course-progress-item {
            flex-wrap: wrap;
          }

          .course-percent {
            width: 100%;
            text-align: right;
            margin-top: 0.25rem;
          }

          .session-meta {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 320px) {
          .kpi-row {
            grid-template-columns: 1fr;
          }

          .course-info h4 {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
};

export default Dashboard;
