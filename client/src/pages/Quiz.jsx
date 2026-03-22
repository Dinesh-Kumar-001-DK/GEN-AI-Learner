import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTag from '../components/PageTag';
import { quizApi, courseApi } from '../api/axios';

const Quiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');

  useEffect(() => {
    fetchQuiz();
  }, [courseId]);

  const fetchQuiz = async () => {
    try {
      const [quizRes, courseRes] = await Promise.all([
        quizApi.getByCourse(courseId),
        courseApi.getById(courseId)
      ]);

      setQuiz(quizRes.data.quiz);
      if (courseRes.data.course) {
        setCourseTitle(courseRes.data.course.title);
      }
    } catch (err) {
      console.error('Quiz error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (index) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    const newAnswers = { ...answers, [currentQuestion]: selectedAnswer };
    setAnswers(newAnswers);

    if (currentQuestion < (quiz?.questionCount - 1 || 0)) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(newAnswers[currentQuestion + 1] ?? null);
    } else {
      handleSubmit(newAnswers);
    }
  };

  const handleSubmit = async (finalAnswers) => {
    setSubmitting(true);
    try {
      const { data } = await quizApi.submit(quiz._id, Object.values(finalAnswers));
      setResults(data);
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar showBack backTo={`/courses/${courseId}`} />
        <main className="page">
          <div className="container">
            <div className="loading-state">Loading quiz...</div>
          </div>
        </main>
      </>
    );
  }

  if (!quiz) {
    return (
      <>
        <Navbar showBack backTo={`/courses/${courseId}`} />
        <main className="page">
          <div className="container">
            <div className="empty-state">
              <h2>No quiz available</h2>
              <p className="text-muted">This course doesn't have a quiz yet.</p>
              <button onClick={() => navigate(`/courses/${courseId}`)} className="btn btn-primary">
                Back to Course
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (results) {
    return (
      <>
        <Navbar showBack backTo={`/courses/${courseId}`} />
        <main className="quiz-page page">
          <div className="container">
            <div className="results-card">
              <PageTag label="Quiz Complete" emoji="🎉" />
              
              <div className={`score-display ${results.passed ? 'passed' : 'failed'}`}>
                <div className="score-circle">
                  <span className="score-value">{results.score}%</span>
                </div>
                <div className="score-status">
                  <h2>{results.passed ? 'Congratulations! 🎉' : 'Keep Practicing!'}</h2>
                  <p className="text-muted">
                    {results.passed 
                      ? "You've passed the quiz!" 
                      : `You need ${quiz.passingScore}% to pass. Try again!`}
                  </p>
                </div>
              </div>

              <div className="score-details">
                <div className="detail-item">
                  <span>Correct Answers</span>
                  <span className="mono text-teal">{results.correctCount} / {results.totalQuestions}</span>
                </div>
                <div className="detail-item">
                  <span>Passing Score</span>
                  <span className="mono">{results.passingScore}%</span>
                </div>
              </div>

              <div className="results-actions">
                <button 
                  onClick={() => navigate(`/courses/${courseId}`)} 
                  className="btn btn-outline"
                >
                  Back to Course
                </button>
                <button 
                  onClick={() => {
                    setResults(null);
                    setCurrentQuestion(0);
                    setAnswers({});
                    setSelectedAnswer(null);
                  }}
                  className="btn btn-primary"
                >
                  Retry Quiz
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar showBack backTo={`/courses/${courseId}`} />
      
      <main className="quiz-page page">
        <div className="container">
          <div className="quiz-header">
            <h1>{quiz.title}</h1>
            <p className="text-muted">{courseTitle}</p>
          </div>

          <div className="quiz-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / quiz.questionCount) * 100}%` }}
              ></div>
            </div>
            <span className="mono">
              Question {currentQuestion + 1} of {quiz.questionCount}
            </span>
          </div>

          <div className="question-card">
            <p className="question-text">{quiz.questions?.[currentQuestion]?.question}</p>

            <div className="options-list">
              {quiz.questions?.[currentQuestion]?.options?.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${selectedAnswer === index ? 'selected' : ''}`}
                  onClick={() => handleSelectAnswer(index)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>

            <div className="question-actions">
              <span className="mono text-muted">
                Select an answer to continue
              </span>
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={selectedAnswer === null || submitting}
              >
                {submitting 
                  ? 'Submitting...' 
                  : currentQuestion < quiz.questionCount - 1 
                    ? 'Next Question →' 
                    : 'Submit Quiz'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .quiz-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .quiz-progress {
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        .progress-bar {
          height: 6px;
          background: var(--border);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--cyan), var(--teal));
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .quiz-progress span {
          font-size: 0.75rem;
          color: var(--muted);
          display: block;
          text-align: center;
        }

        .question-card {
          max-width: 600px;
          margin: 0 auto;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
        }

        .question-text {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .options-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .option-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 1rem 1.2rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--text);
          text-align: left;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .option-btn:hover {
          border-color: var(--cyan);
        }

        .option-btn.selected {
          border-color: var(--cyan);
          background: var(--cyan-dim);
        }

        .option-letter {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        .option-btn.selected .option-letter {
          background: var(--cyan);
          color: #050a12;
        }

        .question-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .question-actions span {
          font-size: 0.75rem;
        }

        .results-card {
          max-width: 600px;
          margin: 0 auto;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2.5rem;
          text-align: center;
        }

        .score-display {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin: 2rem 0;
          padding: 2rem;
          background: var(--surface);
          border-radius: 12px;
        }

        .score-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .score-display.passed .score-circle {
          border-color: var(--teal);
        }

        .score-display.failed .score-circle {
          border-color: var(--red);
        }

        .score-value {
          font-size: 1.8rem;
          font-weight: 800;
        }

        .score-display.passed .score-value {
          color: var(--teal);
        }

        .score-display.failed .score-value {
          color: var(--red);
        }

        .score-status h2 {
          text-align: left;
        }

        .score-status p {
          text-align: left;
          margin-top: 0.5rem;
        }

        .score-details {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 2rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-item span:first-child {
          font-size: 0.75rem;
          color: var(--muted);
        }

        .detail-item span:last-child {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .results-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .loading-state,
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
        }

        .empty-state h2 {
          margin-bottom: 1rem;
        }

        .empty-state p {
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .quiz-header h1 {
            font-size: 1.5rem;
          }

          .question-card {
            padding: 1.5rem;
            border-radius: 12px;
          }

          .question-text {
            font-size: 1rem;
          }

          .option-btn {
            padding: 0.875rem 1rem;
            font-size: 0.9rem;
          }

          .option-letter {
            width: 28px;
            height: 28px;
            font-size: 0.8rem;
          }

          .question-actions {
            flex-direction: column;
            gap: 1rem;
          }

          .question-actions .btn {
            width: 100%;
          }

          .results-card {
            padding: 1.5rem;
            border-radius: 12px;
          }

          .score-display {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem;
            gap: 1rem;
          }

          .score-status h2,
          .score-status p {
            text-align: center;
          }

          .score-details {
            flex-direction: column;
            gap: 1rem;
          }

          .results-actions {
            flex-direction: column;
          }

          .results-actions .btn {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .quiz-header {
            margin-bottom: 1.5rem;
          }

          .quiz-header h1 {
            font-size: 1.3rem;
          }

          .question-card {
            padding: 1rem;
          }

          .question-text {
            font-size: 0.95rem;
            margin-bottom: 1rem;
          }

          .options-list {
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }

          .option-btn {
            padding: 0.75rem;
            gap: 0.75rem;
          }

          .option-letter {
            width: 26px;
            height: 26px;
            font-size: 0.75rem;
          }

          .option-text {
            font-size: 0.85rem;
          }

          .score-circle {
            width: 80px;
            height: 80px;
          }

          .score-value {
            font-size: 1.5rem;
          }

          .results-card {
            padding: 1.25rem;
          }
        }

        @media (max-width: 320px) {
          .option-btn {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .option-letter {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default Quiz;
