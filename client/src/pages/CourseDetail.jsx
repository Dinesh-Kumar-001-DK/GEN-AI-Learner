import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { courseApi, progressApi } from '../api/axios';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const { data } = await courseApi.getById(id);
      setCourse(data.course);

      if (isAuthenticated) {
        try {
          const progressRes = await progressApi.getByCourse(id);
          setProgress(progressRes.data.progress);
        } catch (err) {
          console.log('No progress yet');
        }
      }

      if (data.course.modules?.length > 0) {
        setExpandedModules({ 0: true });
      }
    } catch (err) {
      console.error('Course error:', err);
      navigate('/courses');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setEnrolling(true);
      await courseApi.enroll(id);
      await fetchCourse();
    } catch (err) {
      console.error('Enrollment error:', err);
    } finally {
      setEnrolling(false);
    }
  };

  const toggleModule = (index) => {
    setExpandedModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isEnrolled = user?.enrolledCourses?.includes(id) || progress;

  if (loading) {
    return (
      <>
        <Navbar showBack backTo="/courses" />
        <main className="page">
          <div className="container">
            <div className="loading-state">Loading course...</div>
          </div>
        </main>
      </>
    );
  }

  if (!course) return null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'teal';
      case 'Intermediate': return 'amber';
      case 'Advanced': return 'red';
      default: return 'default';
    }
  };

  return (
    <>
      <Navbar showBack backTo="/courses" />
      
      <main className="course-detail-page page">
        <div className="container">
          <div className="course-detail-grid">
            <div className="course-main">
              <div className="course-header">
                <div className="course-badges">
                  <Badge variant="cyan">{course.category}</Badge>
                  <Badge variant={getDifficultyColor(course.difficulty)}>
                    {course.difficulty}
                  </Badge>
                </div>
                <h1>{course.title}</h1>
                <p className="course-desc">{course.description}</p>

                <div className="course-stats">
                  <span>⭐ {course.rating.toFixed(1)}</span>
                  <span>👥 {course.enrolledCount.toLocaleString()} students</span>
                  <span>⏱ {Math.round(course.totalDuration / 60)} hours</span>
                </div>

                {course.instructor && (
                  <div className="instructor-info">
                    <div className="instructor-avatar">
                      {course.instructor.avatar ? (
                        <img src={course.instructor.avatar} alt={course.instructor.name} />
                      ) : (
                        <span>👨‍🏫</span>
                      )}
                    </div>
                    <div>
                      <p className="instructor-name">{course.instructor.name}</p>
                      <p className="instructor-bio text-muted">{course.instructor.bio}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="modules-section">
                <h2>Course Content</h2>
                <p className="text-muted">
                  {course.modules?.length} modules · {course.modules?.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                </p>

                <div className="modules-list">
                  {course.modules?.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="module-item">
                      <button 
                        className="module-header"
                        onClick={() => toggleModule(moduleIndex)}
                      >
                        <div className="module-info">
                          <span className="module-number">{moduleIndex + 1}</span>
                          <span className="module-title">{module.title}</span>
                        </div>
                        <span className="module-meta mono">
                          {module.lessons.length} lessons
                          <span className={`expand-icon ${expandedModules[moduleIndex] ? 'expanded' : ''}`}>
                            ▼
                          </span>
                        </span>
                      </button>

                      {expandedModules[moduleIndex] && (
                        <div className="lessons-list">
                          {module.lessons.map((lesson, lessonIndex) => {
                            const lessonId = `${moduleIndex}-${lessonIndex}`;
                            const isCompleted = progress?.completedLessons?.includes(lessonId);

                            return (
                              <div 
                                key={lessonIndex} 
                                className={`lesson-item ${isCompleted ? 'completed' : ''}`}
                              >
                                <span className="lesson-icon">
                                  {isCompleted ? '✓' : '▶'}
                                </span>
                                <span className="lesson-title">{lesson.title}</span>
                                <span className="lesson-duration mono">{lesson.duration}min</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="course-sidebar">
              <div className="enroll-card">
                {course.thumbnail && (
                  <div className="enroll-thumb">
                    <img src={course.thumbnail} alt={course.title} />
                  </div>
                )}

                {isEnrolled && progress && (
                  <div className="enroll-progress">
                    <div className="progress-header">
                      <span className="mono">Your Progress</span>
                      <span className="mono text-cyan">{progress.percentComplete}%</span>
                    </div>
                    <ProgressBar percent={progress.percentComplete} showLabel={false} />
                  </div>
                )}

                <button 
                  className="btn btn-primary btn-lg enroll-btn"
                  onClick={handleEnroll}
                  disabled={enrolling || isEnrolled}
                >
                  {isEnrolled ? 'Enrolled ✓' : enrolling ? 'Enrolling...' : 'Enroll Now — Free'}
                </button>

                {isEnrolled && (
                  <button 
                    className="btn btn-outline btn-lg enroll-btn mt-1"
                    onClick={() => navigate(`/quiz/${id}`)}
                  >
                    Take Quiz →
                  </button>
                )}

                <div className="enroll-features">
                  <h4>This course includes:</h4>
                  <ul>
                    <li>📹 Video lessons</li>
                    <li>📝 Interactive quizzes</li>
                    <li>💬 AI tutor support</li>
                    <li>📜 Certificate of completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .course-detail-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .course-header {
          margin-bottom: 2rem;
        }

        .course-badges {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .course-header h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .course-desc {
          font-size: 1rem;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .course-stats {
          display: flex;
          gap: 1.5rem;
          font-size: 0.85rem;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }

        .instructor-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--surface);
          border-radius: var(--radius);
        }

        .instructor-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          background: var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .instructor-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .instructor-name {
          font-weight: 700;
          margin-bottom: 4px;
        }

        .instructor-bio {
          font-size: 0.8rem;
        }

        .modules-section h2 {
          margin-bottom: 0.5rem;
        }

        .modules-list {
          margin-top: 1.5rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .module-item {
          border-bottom: 1px solid var(--border);
        }

        .module-item:last-child {
          border-bottom: none;
        }

        .module-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.2rem;
          background: var(--surface);
          border: none;
          color: var(--text);
          cursor: pointer;
          transition: background 0.2s;
        }

        .module-header:hover {
          background: var(--panel);
        }

        .module-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .module-number {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--cyan-dim);
          color: var(--cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .module-title {
          font-weight: 600;
        }

        .module-meta {
          font-size: 0.72rem;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .expand-icon {
          transition: transform 0.2s;
        }

        .expand-icon.expanded {
          transform: rotate(180deg);
        }

        .lessons-list {
          padding: 0.5rem 0;
        }

        .lesson-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 1.2rem 0.8rem 3.5rem;
          font-size: 0.85rem;
        }

        .lesson-item.completed .lesson-icon {
          color: var(--teal);
        }

        .lesson-icon {
          width: 20px;
          color: var(--muted);
        }

        .lesson-title {
          flex: 1;
        }

        .lesson-duration {
          font-size: 0.72rem;
          color: var(--muted);
        }

        .enroll-card {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: sticky;
          top: 88px;
        }

        .enroll-thumb {
          height: 160px;
          overflow: hidden;
        }

        .enroll-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .enroll-progress {
          padding: 1rem 1.5rem;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.75rem;
        }

        .enroll-btn {
          width: calc(100% - 3rem);
          margin: 1.5rem;
        }

        .enroll-features {
          padding: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .enroll-features h4 {
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }

        .enroll-features ul {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .enroll-features li {
          font-size: 0.82rem;
          color: var(--muted);
        }

        .mt-1 { margin-top: 0.5rem; }

        .loading-state {
          text-align: center;
          padding: 4rem;
          color: var(--muted);
        }

        @media (max-width: 900px) {
          .course-detail-grid {
            grid-template-columns: 1fr;
          }

          .enroll-card {
            position: static;
          }
        }
      `}</style>
    </>
  );
};

export default CourseDetail;
