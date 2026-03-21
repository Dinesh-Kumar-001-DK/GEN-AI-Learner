import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTag from '../components/PageTag';

const CareerNavigator = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(0);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const roles = [
    { 
      title: 'ML Engineer', 
      match: 78, 
      salary: '$140k-$180k', 
      companies: 'Google, Meta, OpenAI', 
      location: 'Remote OK',
      requiredSkills: ['Python', 'PyTorch', 'MLOps', 'System Design'],
      recommendedCourses: courses.filter(c => 
        c.title?.toLowerCase().includes('ml') || 
        c.title?.toLowerCase().includes('machine') ||
        c.title?.toLowerCase().includes('python')
      )
    },
    { 
      title: 'Data Scientist', 
      match: 85, 
      salary: '$120k-$155k', 
      companies: 'Stripe, Airbnb, Netflix', 
      location: 'Hybrid',
      requiredSkills: ['Python', 'Statistics', 'SQL', 'Visualization'],
      recommendedCourses: courses.filter(c => 
        c.title?.toLowerCase().includes('data') ||
        c.title?.toLowerCase().includes('statistics') ||
        c.title?.toLowerCase().includes('sql')
      )
    },
    { 
      title: 'AI Research Engineer', 
      match: 52, 
      salary: '$160k-$220k', 
      companies: 'Anthropic, DeepMind', 
      location: 'On-site',
      requiredSkills: ['Deep Learning', 'Research', 'PyTorch', 'Math'],
      recommendedCourses: courses.filter(c => 
        c.title?.toLowerCase().includes('deep') ||
        c.title?.toLowerCase().includes('research') ||
        c.title?.toLowerCase().includes('neural')
      )
    }
  ];

  const skills = [
    { name: 'Python', current: 90, required: 80 },
    { name: 'PyTorch', current: 55, required: 85 },
    { name: 'MLOps', current: 30, required: 70 },
    { name: 'Sys Design', current: 38, required: 80 },
    { name: 'Statistics', current: 80, required: 75 }
  ];

  const actions = [
    { 
      priority: 'High', 
      action: 'Complete MLOps Module', 
      desc: 'Docker, FastAPI, and model deployment fundamentals.', 
      eta: '3 weeks',
      courseId: courses.find(c => c.title?.toLowerCase().includes('mlops'))?._id
    },
    { 
      priority: 'High', 
      action: 'System Design for ML', 
      desc: 'Design scalable ML pipelines and data infrastructure.', 
      eta: '4 weeks',
      courseId: courses.find(c => c.title?.toLowerCase().includes('system'))?._id
    },
    { 
      priority: 'Medium', 
      action: 'Build 2 Portfolio Projects', 
      desc: 'End-to-end deployed ML apps to show recruiters.', 
      eta: '6 weeks',
      courseId: null
    }
  ];

  const handleActionClick = (action) => {
    if (action.courseId) {
      navigate(`/courses/${action.courseId}`);
    } else {
      navigate('/courses');
    }
  };

  const handleRoleClick = (index) => {
    setSelectedRole(index);
  };

  const handleCourseClick = (courseId) => {
    if (courseId) {
      navigate(`/courses/${courseId}`);
    }
  };

  const currentRole = roles[selectedRole];
  const recommendedCourses = currentRole?.recommendedCourses?.length > 0 
    ? currentRole.recommendedCourses 
    : courses.slice(0, 3);

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
                    onClick={() => handleRoleClick(i)}
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
                <div className="panel-header">⚡ Skill Gap — {currentRole?.title}</div>
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
                      <div 
                        key={i} 
                        className="action-item"
                        onClick={() => handleActionClick(action)}
                      >
                        <span className="action-icon">{['1️⃣', '2️⃣', '3️⃣'][i]}</span>
                        <div>
                          <div className="action-title">{action.action}</div>
                          <div className="action-desc">{action.desc}</div>
                          <div className="action-eta">⏱ {action.eta} · {action.priority} Priority</div>
                        </div>
                        {action.courseId && (
                          <span className="action-link">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel" style={{marginTop: '1.4rem'}}>
            <div className="panel-header">📚 Recommended Courses for {currentRole?.title}</div>
            <div className="panel-body">
              {recommendedCourses.length > 0 ? (
                <div className="course-links">
                  {recommendedCourses.map((course, i) => (
                    <div 
                      key={course._id || i}
                      className="course-link-card"
                      onClick={() => handleCourseClick(course._id)}
                    >
                      <div className="course-link-icon">📖</div>
                      <div className="course-link-info">
                        <div className="course-link-title">{course.title}</div>
                        <div className="course-link-meta">
                          {course.level} · {course.duration}
                        </div>
                      </div>
                      <div className="course-link-arrow">→</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-courses">
                  <p>No specific courses found for this role.</p>
                  <Link to="/courses" className="browse-link">Browse all courses →</Link>
                </div>
              )}
              <Link to="/courses" className="browse-all-link">View All Courses →</Link>
            </div>
          </div>

          <div className="panel" style={{marginTop: '1.4rem'}}>
            <div className="panel-header">🔗 External Resources</div>
            <div className="panel-body">
              <div className="resource-links">
                <a href="https://www.linkedin.com/jobs" target="_blank" rel="noopener noreferrer" className="resource-link">
                  <span className="resource-icon">💼</span>
                  <span>LinkedIn Jobs</span>
                </a>
                <a href="https://wellfound.com" target="_blank" rel="noopener noreferrer" className="resource-link">
                  <span className="resource-icon">🚀</span>
                  <span>Wellfound (AngelList)</span>
                </a>
                <a href="https://glassdoor.com" target="_blank" rel="noopener noreferrer" className="resource-link">
                  <span className="resource-icon">🏢</span>
                  <span>Glassdoor Reviews</span>
                </a>
                <a href="https://levels.fyi" target="_blank" rel="noopener noreferrer" className="resource-link">
                  <span className="resource-icon">💰</span>
                  <span>Levels.fyi Salaries</span>
                </a>
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
        .action-item { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 1rem 1.2rem; display: flex; align-items: flex-start; gap: 10px; transition: border-color 0.2s; cursor: pointer; position: relative; }
        .action-item:hover { border-color: var(--cyan); }
        .action-icon { font-size: 1.1rem; }
        .action-title { font-size: 0.85rem; font-weight: 700; margin-bottom: 2px; }
        .action-desc { font-size: 0.75rem; color: var(--muted); margin-bottom: 4px; }
        .action-eta { font-family: 'DM Mono', monospace; font-size: 0.62rem; color: var(--amber); }
        .action-link { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: var(--cyan); font-size: 1.2rem; }
        .course-links { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem; }
        .course-link-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 0.8rem 1rem; display: flex; align-items: center; gap: 1rem; cursor: pointer; transition: border-color 0.2s, transform 0.15s; }
        .course-link-card:hover { border-color: var(--cyan); transform: translateX(4px); }
        .course-link-icon { font-size: 1.5rem; }
        .course-link-info { flex: 1; }
        .course-link-title { font-weight: 600; font-size: 0.85rem; }
        .course-link-meta { font-size: 0.72rem; color: var(--muted); }
        .course-link-arrow { color: var(--cyan); font-size: 1.2rem; }
        .no-courses { text-align: center; padding: 1rem; color: var(--muted); }
        .browse-link { color: var(--cyan); text-decoration: none; }
        .browse-link:hover { text-decoration: underline; }
        .browse-all-link { display: inline-block; margin-top: 0.5rem; color: var(--cyan); font-size: 0.82rem; text-decoration: none; }
        .browse-all-link:hover { text-decoration: underline; }
        .resource-links { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .resource-link { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; display: flex; align-items: center; gap: 0.6rem; color: var(--text); text-decoration: none; font-size: 0.82rem; transition: border-color 0.2s; }
        .resource-link:hover { border-color: var(--cyan); }
        .resource-icon { font-size: 1.2rem; }
        @media (max-width: 800px) {
          .career-grid { grid-template-columns: 1fr; }
          .resource-links { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </>
  );
};

export default CareerNavigator;
