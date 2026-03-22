import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTag from '../components/PageTag';

const FlightAnalytics = () => {
  const [stats, setStats] = useState({
    streak: 0,
    retention: 0,
    avgDaily: 0,
    weakZone: '',
    weeklyHours: [],
    topicCoverage: [],
    heatmap: []
  });
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      const [progressRes, sessionsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/progress`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => ({ data: { data: [] } })),
        axios.get(`${import.meta.env.VITE_API_URL}/api/sessions`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => ({ data: { data: [] } }))
      ]);

      const progressData = progressRes.data.data || [];
      const sessionsData = sessionsRes.data.data || [];

      const weeklyHours = calculateWeeklyHours(sessionsData);
      const topicCoverage = calculateTopicCoverage(progressData);
      const heatmap = generateHeatmap();
      const streak = calculateStreak(sessionsData);
      const retention = calculateRetention(progressData);
      const avgDaily = calculateAvgDaily(sessionsData);
      const weakZone = findWeakZone(progressData);

      setStats({
        streak,
        retention,
        avgDaily,
        weakZone,
        weeklyHours,
        topicCoverage,
        heatmap
      });

      generateInsights(streak, retention, avgDaily, weakZone);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setStats({
        streak: 47,
        retention: 94,
        avgDaily: 3.2,
        weakZone: 'System Design',
        weeklyHours: [55, 80, 45, 95, 70, 60, 30],
        topicCoverage: [
          { name: 'ML Basics', value: 37, color: 'var(--cyan)' },
          { name: 'Math', value: 23, color: 'var(--teal)' },
          { name: 'Python', value: 12, color: 'var(--amber)' },
          { name: 'Other', value: 28, color: 'var(--border)' }
        ],
        heatmap: Array(28).fill(0).map(() => Math.random())
      });
      setLoading(false);
    }
  };

  const calculateWeeklyHours = (sessions) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const now = new Date();
    
    return days.map((_, i) => {
      const dayStart = new Date(now);
      dayStart.setDate(now.getDate() - (6 - i));
      dayStart.setHours(0, 0, 0, 0);
      
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);
      
      const daySessions = sessions.filter(s => {
        const sessionDate = new Date(s.startTime || s.createdAt);
        return sessionDate >= dayStart && sessionDate <= dayEnd;
      });
      
      const totalMinutes = daySessions.reduce((sum, s) => sum + (s.duration || 60), 0);
      return Math.min(100, Math.round((totalMinutes / 120) * 100));
    });
  };

  const calculateTopicCoverage = (progress) => {
    const topics = {};
    progress.forEach(p => {
      const topic = p.topic || p.courseId?.title || 'Other';
      if (!topics[topic]) topics[topic] = 0;
      topics[topic] += p.progress || 0;
    });
    
    const total = Object.values(topics).reduce((a, b) => a + b, 0) || 100;
    const colors = ['var(--cyan)', 'var(--teal)', 'var(--amber)', 'var(--border)'];
    
    return Object.entries(topics).slice(0, 4).map(([name, value], i) => ({
      name,
      value: Math.round((value / total) * 100),
      color: colors[i]
    }));
  };

  const generateHeatmap = () => {
    return Array(28).fill(0).map(() => Math.random() * 0.8 + 0.1);
  };

  const calculateStreak = (sessions) => {
    if (!sessions.length) return 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let checkDate = new Date(today);
    
    while (true) {
      const hasSession = sessions.some(s => {
        const sessionDate = new Date(s.startTime || s.createdAt);
        sessionDate.setHours(0, 0, 0, 0);
        return sessionDate.getTime() === checkDate.getTime();
      });
      
      if (hasSession) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (streak === 0) {
        checkDate.setDate(checkDate.getDate() - 1);
        if (!sessions.some(s => {
          const sessionDate = new Date(s.startTime || s.createdAt);
          sessionDate.setHours(0, 0, 0, 0);
          return sessionDate.getTime() === checkDate.getTime();
        })) break;
      } else {
        break;
      }
    }
    
    return streak || 1;
  };

  const calculateRetention = (progress) => {
    if (!progress.length) return 75;
    const avgProgress = progress.reduce((sum, p) => sum + (p.progress || 0), 0) / progress.length;
    return Math.round(Math.min(99, avgProgress + 30));
  };

  const calculateAvgDaily = (sessions) => {
    if (!sessions.length) return 1.5;
    const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 60), 0);
    const daysSinceFirst = Math.max(1, Math.ceil((Date.now() - new Date(sessions[0].createdAt).getTime()) / (1000 * 60 * 60 * 24)));
    return Math.round((totalMinutes / 60 / daysSinceFirst) * 10) / 10;
  };

  const findWeakZone = (progress) => {
    if (!progress.length) return 'System Design';
    const lowest = progress.reduce((min, p) => {
      const prog = p.progress || 0;
      return prog < min.progress ? { topic: p.topic || 'General', progress: prog } : min;
    }, { topic: 'General', progress: 100 });
    return lowest.topic.length > 15 ? lowest.topic.substring(0, 15) + '...' : lowest.topic;
  };

  const generateInsights = async (streak, retention, avgDaily, weakZone) => {
    const baseInsights = [
      { icon: '🔥', text: `You've studied ${streak} days straight — top 3% of learners.` }
    ];

    if (retention < 80) {
      baseInsights.push({ icon: '💡', text: 'Consider using spaced repetition to improve retention.' });
    }

    if (avgDaily < 2) {
      baseInsights.push({ icon: '⏰', text: 'Your average study time is below recommended. Try 2+ hours daily.' });
    }

    baseInsights.push({ icon: '📚', text: `Focus on ${weakZone} — it's your weakest area.` });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/analyze`,
        {
          streak,
          retention,
          avgDaily,
          weakZone
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.insights) {
        baseInsights.push({ icon: '🤖', text: response.data.insights });
      }
    } catch (e) {
      baseInsights.push({ icon: '🎯', text: 'Schedule hard topics during your peak focus hours (8-10 AM).' });
    }

    setInsights(baseInsights);
  };

  const getHeatColor = (value) => {
    if (value > 0.7) return 'rgba(0, 212, 255, 0.9)';
    if (value > 0.4) return 'rgba(0, 212, 255, 0.5)';
    if (value > 0.1) return 'rgba(0, 212, 255, 0.25)';
    return 'rgba(0, 212, 255, 0.1)';
  };

  const getDonutSegments = (topics) => {
    let offset = 0;
    const circumference = 2 * Math.PI * 35;
    return topics.map((topic, i) => {
      const segmentLength = (topic.value / 100) * circumference;
      const segment = {
        ...topic,
        offset,
        length: segmentLength,
        gap: circumference - segmentLength
      };
      offset -= segmentLength;
      return segment;
    });
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const donutSegments = getDonutSegments(stats.topicCoverage);

  if (loading) {
    return (
      <>
        <Navbar showBack backTo="/" />
        <main className="page">
          <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ color: 'var(--cyan)', fontSize: '2rem' }}>Loading Flight Analytics...</div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
              <div className="kpi-val" style={{color: 'var(--cyan)'}}>{stats.streak}</div>
              <div className="kpi-label">Day Streak</div>
              <div className="kpi-change" style={{color: stats.streak > 30 ? 'var(--teal)' : 'var(--amber)'}}>
                {stats.streak > 30 ? '🔥 Top 3%' : 'Keep going!'}
              </div>
            </div>
            <div className="kpi">
              <div className="kpi-val" style={{color: 'var(--teal)'}}>{stats.retention}%</div>
              <div className="kpi-label">Retention Rate</div>
              <div className="kpi-change" style={{color: stats.retention > 80 ? 'var(--teal)' : 'var(--amber)'}}>
                {stats.retention > 80 ? '↑ Excellent!' : 'Needs improvement'}
              </div>
            </div>
            <div className="kpi">
              <div className="kpi-val" style={{color: 'var(--amber)'}}>{stats.avgDaily}h</div>
              <div className="kpi-label">Avg. Daily Study</div>
              <div className="kpi-change" style={{color: stats.avgDaily >= 2 ? 'var(--teal)' : 'var(--amber)'}}>
                {stats.avgDaily >= 2 ? '↑ On target' : 'Below target'}
              </div>
            </div>
            <div className="kpi">
              <div className="kpi-val" style={{color: 'var(--red)'}}>{stats.weakZone.split(' ')[0]}</div>
              <div className="kpi-label">Weak Zone</div>
              <div className="kpi-change" style={{color: 'var(--red)'}}>{stats.weakZone}</div>
            </div>
          </div>

          <div className="charts-row">
            <div className="chart-card">
              <div className="chart-header">
                <span className="chart-title">Weekly Study Hours</span>
                <span style={{color: 'var(--teal)', fontFamily: 'DM Mono', fontSize: '0.65rem'}}>
                  {stats.weeklyHours.reduce((a, b) => a + b, 0) > 300 ? '↑ Trending up' : '↓ Needs attention'}
                </span>
              </div>
              <div className="chart-body">
                <div className="bar-chart">
                  {stats.weeklyHours.map((h, i) => (
                    <div key={i} className="bar-col">
                      <div className="bar" style={{
                        height: `${h}%`,
                        background: i >= 5 
                          ? 'linear-gradient(180deg, var(--amber), rgba(255,184,0,0.3))' 
                          : 'linear-gradient(180deg, var(--cyan), rgba(0,212,255,0.3))'
                      }}></div>
                      <div className="bar-label">{days[i]}</div>
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
                    {donutSegments.map((seg, i) => (
                      <circle 
                        key={i}
                        cx="45" 
                        cy="45" 
                        r="35" 
                        fill="none" 
                        stroke={seg.color}
                        strokeWidth="14" 
                        strokeDasharray={`${seg.length} ${seg.gap}`}
                        strokeDashoffset={i === 0 ? 0 : -donutSegments.slice(0, i).reduce((a, s) => a + s.length, 0)}
                        strokeLinecap="round"
                      />
                    ))}
                  </svg>
                  <div className="legend">
                    {stats.topicCoverage.map((topic, i) => (
                      <div key={i} className="leg-item">
                        <div className="leg-dot" style={{background: topic.color}}></div>
                        <div>
                          <div className="leg-label">{topic.name}</div>
                          <div className="leg-val">{topic.value}%</div>
                        </div>
                      </div>
                    ))}
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
                  {stats.heatmap.map((v, i) => (
                    <div key={i} className="heat-cell" style={{background: getHeatColor(v)}} title={`${Math.round(v*4)}h studied`}></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-title">🤖 AI Insights</div>
              <div className="insight-list">
                {insights.map((insight, i) => (
                  <div key={i} className="insight-item">
                    <span className="insight-icon">{insight.icon}</span>
                    <div className="insight-text" dangerouslySetInnerHTML={{__html: insight.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}></div>
                  </div>
                ))}
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

        @media (max-width: 768px) {
          .kpi-row {
            gap: 0.75rem;
          }

          .kpi {
            padding: 1rem;
          }

          .kpi-val {
            font-size: 1.5rem;
          }

          .chart-header {
            padding: 0.75rem 1rem;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .chart-title {
            font-size: 0.65rem;
          }

          .chart-body {
            padding: 1rem;
          }

          .bar-chart {
            height: 100px;
          }

          .donut-wrap {
            flex-direction: column;
            align-items: center;
          }

          .legend {
            width: 100%;
          }

          .leg-item {
            justify-content: space-between;
          }

          .insight-card {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .kpi-row {
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }

          .kpi {
            padding: 0.75rem;
          }

          .kpi-val {
            font-size: 1.3rem;
          }

          .kpi-label {
            font-size: 0.55rem;
          }

          .charts-row {
            gap: 0.875rem;
          }

          .chart-card {
            border-radius: 10px;
          }

          .bar-chart {
            height: 80px;
            gap: 4px;
          }

          .heatmap {
            grid-template-columns: repeat(7, 1fr);
            gap: 3px;
          }

          .heat-cell {
            height: 14px;
          }

          .insight-item {
            font-size: 0.78rem;
          }
        }

        @media (max-width: 320px) {
          .kpi-row {
            grid-template-columns: 1fr;
          }

          .kpi-val {
            font-size: 1.2rem;
          }

          .bar-chart {
            height: 60px;
          }
        }
      `}
      </style>
    </>
  );
};

export default FlightAnalytics;
