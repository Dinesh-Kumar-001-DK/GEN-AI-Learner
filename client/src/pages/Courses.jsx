import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import Badge from '../components/Badge';
import { courseApi } from '../api/axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, selectedDifficulty]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (selectedDifficulty) params.difficulty = selectedDifficulty;
      
      const { data } = await courseApi.getAll(params);
      setCourses(data.courses);
      if (data.categories) setCategories(data.categories);
    } catch (err) {
      console.error('Courses error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.description.toLowerCase().includes(search.toLowerCase())
  );

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
      <Navbar />
      
      <main className="courses-page page">
        <div className="container">
          <div className="courses-header fade-up">
            <div>
              <h1>Course Catalog</h1>
              <p className="text-muted">Explore our library of expert-led courses</p>
            </div>
          </div>

          <div className="filters fade-up fade-up-1">
            <div className="search-box">
              <input
                type="text"
                className="input-field"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-pills">
              <button
                className={`filter-pill ${!selectedCategory ? 'active' : ''}`}
                onClick={() => setSelectedCategory('')}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="difficulty-filter">
              <select
                className="input-field"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">Loading courses...</div>
          ) : (
            <div className="courses-grid">
              {filteredCourses.map((course, i) => (
                <Link to={`/courses/${course._id}`} key={course._id} className="course-card">
                  <div className="course-thumb">
                    {course.thumbnail ? (
                      <img src={course.thumbnail} alt={course.title} />
                    ) : (
                      <div className="thumb-placeholder">📚</div>
                    )}
                    <Badge variant={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                  </div>
                  <div className="course-body">
                    <span className="course-category mono">{course.category}</span>
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-desc">{course.description}</p>
                    <div className="course-meta">
                      <span className="meta-item">
                        ⭐ {course.rating.toFixed(1)}
                      </span>
                      <span className="meta-item">
                        👥 {course.enrolledCount.toLocaleString()}
                      </span>
                      <span className="meta-item">
                        ⏱ {Math.round(course.totalDuration / 60)}h
                      </span>
                    </div>
                    {course.instructor && (
                      <div className="course-instructor">
                        <span className="mono">By {course.instructor.name}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredCourses.length === 0 && (
            <div className="empty-state">
              <h3>No courses found</h3>
              <p className="text-muted">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        .courses-header {
          margin-bottom: 2rem;
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: center;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
        }

        .filter-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .filter-pill {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--muted);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-pill:hover {
          border-color: var(--cyan);
          color: var(--cyan);
        }

        .filter-pill.active {
          background: var(--cyan);
          border-color: var(--cyan);
          color: #050a12;
        }

        .difficulty-filter select {
          min-width: 150px;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .course-card {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          animation: fadeUp 0.6s ease both;
        }

        .course-card:hover {
          border-color: var(--cyan);
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0, 212, 255, 0.1);
        }

        .course-thumb {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .course-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .course-thumb .badge {
          position: absolute;
          top: 12px;
          right: 12px;
        }

        .thumb-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface);
          font-size: 3rem;
        }

        .course-body {
          padding: 1.2rem;
        }

        .course-category {
          font-size: 0.65rem;
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .course-title {
          font-size: 1.1rem;
          margin: 0.5rem 0;
          line-height: 1.3;
        }

        .course-desc {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .course-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: var(--muted);
          margin-bottom: 0.8rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .course-instructor {
          font-size: 0.72rem;
          color: var(--muted);
          padding-top: 0.8rem;
          border-top: 1px solid var(--border);
        }

        .loading-state,
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--muted);
        }

        @media (max-width: 768px) {
          .filters {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-pills {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 0.5rem;
          }

          .courses-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .course-thumb {
            height: 150px;
          }

          .course-body {
            padding: 1rem;
          }

          .course-meta {
            flex-wrap: wrap;
            gap: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .courses-header h1 {
            font-size: 1.5rem;
          }

          .search-box {
            min-width: 100%;
          }

          .difficulty-filter select {
            min-width: 100%;
          }

          .course-thumb {
            height: 140px;
          }

          .course-title {
            font-size: 1rem;
          }

          .course-desc {
            font-size: 0.78rem;
          }
        }

        @media (max-width: 320px) {
          .courses-grid {
            grid-template-columns: 1fr;
          }

          .course-thumb {
            height: 120px;
          }
        }
      `}</style>
    </>
  );
};

export default Courses;
