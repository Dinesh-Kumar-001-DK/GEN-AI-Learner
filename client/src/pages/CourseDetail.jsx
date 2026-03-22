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
  const [activeLesson, setActiveLesson] = useState(null);

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

  const openLesson = (moduleIndex, lessonIndex) => {
    const lesson = course.modules[moduleIndex].lessons[lessonIndex];
    const lessonId = `${moduleIndex}-${lessonIndex}`;
    setActiveLesson({ ...lesson, moduleIndex, lessonIndex, lessonId });
  };

  const closeLesson = () => {
    setActiveLesson(null);
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
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
                  <span>⭐ {course.rating?.toFixed(1) || '4.8'}</span>
                  <span>👥 {course.enrolledCount?.toLocaleString() || 0} students</span>
                  <span>⏱ {Math.round((course.totalDuration || 0) / 60)} hours</span>
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
                            const hasVideo = lesson.videoUrl || lesson.youtubeUrl;

                            return (
                              <div 
                                key={lessonIndex} 
                                className={`lesson-item ${isCompleted ? 'completed' : ''} ${hasVideo ? 'has-video' : ''}`}
                                onClick={() => openLesson(moduleIndex, lessonIndex)}
                                style={{ cursor: 'pointer' }}
                              >
                                <span className="lesson-icon">
                                  {isCompleted ? '✓' : '▶'}
                                </span>
                                <span className="lesson-title">{lesson.title}</span>
                                {hasVideo && <span className="lesson-video-badge">📹</span>}
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

      {activeLesson && (
        <div className="lesson-modal-overlay" onClick={closeLesson}>
          <div className="lesson-modal" onClick={(e) => e.stopPropagation()}>
            <div className="lesson-modal-header">
              <div className="lesson-modal-info">
                <Badge variant="cyan">Module {activeLesson.moduleIndex + 1}</Badge>
                <h2>{activeLesson.title}</h2>
              </div>
              <button className="lesson-modal-close" onClick={closeLesson}>✕</button>
            </div>

            <div className="lesson-modal-body">
              {activeLesson.videoUrl || activeLesson.youtubeUrl ? (
                <div className="lesson-video-container">
                  <iframe
                    src={getYouTubeEmbedUrl(activeLesson.videoUrl || activeLesson.youtubeUrl)}
                    title={activeLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="lesson-no-video">
                  <span>📹</span>
                  <p>No video available for this lesson</p>
                </div>
              )}

              <div className="lesson-content">
                <div className="lesson-section">
                  <h3>📋 Summary</h3>
                  <p className="lesson-summary">
                    {activeLesson.summary || 
                      `In this lesson, we'll explore the key concepts of "${activeLesson.title}". ` +
                      `This module covers essential topics that build upon the previous lessons. ` +
                      `Make sure to follow along with the code examples provided below.`}
                  </p>
                </div>

                {activeLesson.keyPoints && (
                  <div className="lesson-section">
                    <h3>🎯 Key Points</h3>
                    <ul className="lesson-key-points">
                      {activeLesson.keyPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeLesson.codeExample && (
                  <div className="lesson-section">
                    <h3>💻 Code Example</h3>
                    <pre className="lesson-code">
                      <code>{activeLesson.codeExample}</code>
                    </pre>
                  </div>
                )}

                {!activeLesson.codeExample && (
                  <div className="lesson-section">
                    <h3>💻 Sample Code</h3>
                    <pre className="lesson-code">
                      <code>{`# Sample code for: ${activeLesson.title}

# This is a placeholder example
# In a real course, this would contain
# actual working code for the lesson

def learn_concept():
    """Learn the key concept from this lesson."""
    concept = "${activeLesson.title}"
    print(f"Learning: {concept}")
    
    # Key steps:
    # 1. Understand the basics
    # 2. Practice with examples
    # 3. Build your own project
    
    return "Great job!"

# Try running this:
learn_concept()`}</code>
                    </pre>
                  </div>
                )}

                {activeLesson.resources && (
                  <div className="lesson-section">
                    <h3>📚 Resources</h3>
                    <ul className="lesson-resources">
                      {activeLesson.resources.map((resource, i) => (
                        <li key={i}>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            {resource.title || resource.url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="lesson-modal-footer">
              <span className="lesson-duration-info">
                ⏱ {activeLesson.duration} minutes
              </span>
              {progress && (
                <span className="lesson-progress-info">
                  Progress: {progress.percentComplete}%
                </span>
              )}
            </div>
          </div>
        </div>
      )}

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
          transition: background 0.2s;
        }

        .lesson-item:hover {
          background: var(--surface);
        }

        .lesson-item.has-video {
          background: rgba(0, 212, 255, 0.03);
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

        .lesson-video-badge {
          font-size: 0.9rem;
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

        /* Lesson Modal Styles */
        .lesson-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .lesson-modal {
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .lesson-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border);
          background: var(--surface);
        }

        .lesson-modal-info h2 {
          font-size: 1.3rem;
          margin-top: 0.5rem;
        }

        .lesson-modal-close {
          background: none;
          border: none;
          color: var(--muted);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          line-height: 1;
          transition: color 0.2s;
        }

        .lesson-modal-close:hover {
          color: var(--text);
        }

        .lesson-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .lesson-video-container {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          background: var(--surface);
          border-radius: var(--radius);
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .lesson-video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .lesson-no-video {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          background: var(--surface);
          border-radius: var(--radius);
          margin-bottom: 1.5rem;
          color: var(--muted);
        }

        .lesson-no-video span {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .lesson-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .lesson-section {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.2rem;
        }

        .lesson-section h3 {
          font-size: 0.95rem;
          margin-bottom: 0.8rem;
          color: var(--cyan);
        }

        .lesson-summary {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--text);
        }

        .lesson-key-points {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .lesson-key-points li {
          font-size: 0.85rem;
          padding: 0.4rem 0;
          padding-left: 1.5rem;
          position: relative;
        }

        .lesson-key-points li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: var(--cyan);
        }

        .lesson-code {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1rem;
          overflow-x: auto;
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.82rem;
          line-height: 1.6;
          color: var(--text);
          white-space: pre-wrap;
          word-break: break-word;
        }

        .lesson-resources {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .lesson-resources li {
          padding: 0.4rem 0;
        }

        .lesson-resources a {
          color: var(--cyan);
          text-decoration: none;
          font-size: 0.85rem;
        }

        .lesson-resources a:hover {
          text-decoration: underline;
        }

        .lesson-modal-footer {
          display: flex;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--border);
          background: var(--surface);
          font-size: 0.8rem;
          color: var(--muted);
        }

        @media (max-width: 900px) {
          .course-detail-grid {
            grid-template-columns: 1fr;
          }

          .enroll-card {
            position: static;
          }

          .lesson-modal-overlay {
            padding: 1rem;
          }
        }

        @media (max-width: 768px) {
          .course-header h1 {
            font-size: 1.5rem;
          }

          .course-stats {
            flex-wrap: wrap;
            gap: 0.75rem;
          }

          .instructor-info {
            flex-direction: column;
            align-items: flex-start;
          }

          .module-header {
            padding: 0.875rem 1rem;
          }

          .module-info {
            gap: 0.75rem;
          }

          .module-title {
            font-size: 0.9rem;
          }

          .lesson-item {
            padding: 0.75rem 1rem 0.75rem 3rem;
            font-size: 0.82rem;
          }

          .enroll-card {
            margin-bottom: 2rem;
          }

          .enroll-btn {
            width: calc(100% - 2rem);
            margin: 1rem;
          }

          .lesson-modal-overlay {
            padding: 0.5rem;
          }

          .lesson-modal {
            max-height: 95vh;
            border-radius: 12px;
          }

          .lesson-modal-header {
            padding: 1rem;
          }

          .lesson-modal-body {
            padding: 1rem;
          }

          .lesson-modal-footer {
            padding: 0.75rem 1rem;
            flex-direction: column;
            gap: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .course-detail-grid {
            gap: 1.5rem;
          }

          .course-badges {
            flex-wrap: wrap;
          }

          .course-stats {
            font-size: 0.8rem;
          }

          .modules-section h2 {
            font-size: 1.2rem;
          }

          .module-number {
            width: 24px;
            height: 24px;
            font-size: 0.75rem;
          }

          .module-meta {
            display: none;
          }

          .lesson-item {
            padding: 0.75rem 1rem 0.75rem 2.5rem;
          }

          .lesson-title {
            font-size: 0.8rem;
          }

          .lesson-video-badge {
            display: none;
          }

          .lesson-modal-header h2 {
            font-size: 1.1rem;
          }

          .lesson-video-container {
            margin-bottom: 1rem;
          }

          .lesson-section {
            padding: 1rem;
          }

          .lesson-code {
            font-size: 0.75rem;
            padding: 0.75rem;
          }
        }

        @media (max-width: 320px) {
          .module-header {
            padding: 0.75rem;
          }

          .module-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .lesson-item {
            padding: 0.6rem 0.75rem 0.6rem 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default CourseDetail;
