import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import AiTutor from './pages/AiTutor';
import Quiz from './pages/Quiz';
import Progress from './pages/Progress';
import NoteIntelligence from './pages/NoteIntelligence';
import FlightAnalytics from './pages/FlightAnalytics';
import CareerNavigator from './pages/CareerNavigator';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="logo-icon"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/ai-tutor" element={<AiTutor />} />
      <Route path="/quiz/:courseId" element={<Quiz />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/note-intelligence" element={<NoteIntelligence />} />
      <Route path="/flight-analytics" element={<FlightAnalytics />} />
      <Route path="/career-navigator" element={<CareerNavigator />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
