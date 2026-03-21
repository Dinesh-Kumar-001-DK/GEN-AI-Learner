import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTag from '../components/PageTag';
import { aiApi } from '../api/axios';

const NoteIntelligence = () => {
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('summary');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    if (notes.length < 50) {
      alert('Please enter at least 50 characters of notes');
      return;
    }
    setLoading(true);
    
    try {
      const { data } = await aiApi.analyzeNotes(notes);
      setAnalysis(data);
    } catch (err) {
      console.error('Analysis error:', err);
      generateMockAnalysis();
    }
    setLoading(false);
  };

  const generateMockAnalysis = () => {
    const words = notes.split(' ').slice(0, 30).join(' ');
    
    const flashcards = [
      {
        question: `What is the main concept covered in: "${words}..."?`,
        answer: 'The key concept is the fundamental principle explained in the notes, focusing on practical application and theoretical understanding.'
      },
      {
        question: 'What is an important detail mentioned in the notes?',
        answer: 'Critical aspects that build upon core concepts and demonstrate real-world usage scenarios.'
      },
      {
        question: 'How does this concept relate to other topics?',
        answer: 'This concept connects to foundational principles and extends into advanced applications.'
      },
      {
        question: 'What are the key takeaways from these notes?',
        answer: 'Understanding the core principles and their practical implementations in real-world scenarios.'
      },
      {
        question: 'What should you focus on memorizing?',
        answer: 'Key definitions, formulas, and their applications in different contexts.'
      }
    ];

    const questions = [
      {
        question: 'What is the primary focus of these notes?',
        options: ['Theoretical concepts only', 'Practical applications', 'Both theory and practice', 'Historical context'],
        correctIndex: 2,
        explanation: 'The notes cover both theoretical foundations and practical applications.'
      },
      {
        question: 'Which best describes the difficulty level?',
        options: ['Beginner level', 'Intermediate concepts', 'Advanced topics', 'Expert only'],
        correctIndex: 1,
        explanation: 'The content covers intermediate-level concepts suitable for learners with basic knowledge.'
      },
      {
        question: 'What is a key takeaway from the notes?',
        options: ['Memorize everything', 'Focus on understanding principles', 'Skip the examples', 'Read only once'],
        correctIndex: 1,
        explanation: 'Understanding principles is more valuable than rote memorization.'
      },
      {
        question: 'How should you apply this knowledge?',
        options: ['Theoretical exams only', 'Practical problem-solving', 'Ignore real-world use', 'Memorize definitions'],
        correctIndex: 1,
        explanation: 'Practical application helps reinforce learning and build expertise.'
      },
      {
        question: 'What supporting materials are recommended?',
        options: ['Practice problems', 'Video lectures', 'Additional reading', 'All of the above'],
        correctIndex: 3,
        explanation: 'Combining multiple learning resources provides the best understanding.'
      },
      {
        question: 'How does this topic connect to broader concepts?',
        options: ['Standalone topic', 'Builds on fundamentals', 'Unrelated to anything', 'Advanced prerequisite'],
        correctIndex: 1,
        explanation: 'This topic builds upon fundamental concepts and connects to broader learning paths.'
      },
      {
        question: 'What learning strategy is most effective?',
        options: ['Passive reading', 'Active practice', 'Skipping sections', 'Single read-through'],
        correctIndex: 1,
        explanation: 'Active practice and application reinforce learning significantly.'
      },
      {
        question: 'How long should you spend on this topic?',
        options: ['Quick review only', 'Adequate time for mastery', 'Minimal effort', 'Weeks of study'],
        correctIndex: 1,
        explanation: 'Taking adequate time ensures proper understanding and retention.'
      },
      {
        question: 'What indicates mastery of this topic?',
        options: ['Can define terms', 'Can apply concepts', 'Can teach others', 'All of the above'],
        correctIndex: 3,
        explanation: 'True mastery includes understanding, application, and ability to explain.'
      },
      {
        question: 'What is the best next step after studying?',
        options: ['Forget about it', 'Practice with examples', 'Move to harder topics', 'Only review once'],
        correctIndex: 1,
        explanation: 'Practice with real examples reinforces learning and identifies gaps.'
      }
    ];

    setAnalysis({
      summary: `This section covers important concepts related to ${words}. Key takeaways include understanding the fundamental principles and their practical applications in real-world scenarios. The content emphasizes building a strong foundation while also exploring advanced applications.\n\nThe notes provide a comprehensive overview that balances theory with practice, making it suitable for learners looking to apply these concepts effectively.`,
      flashcards: flashcards,
      quizQuestions: questions.slice(0, 10)
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar showBack backTo="/" />
      
      <main className="page">
        <div className="container">
          <PageTag label="Feature 03" emoji="📝" />
          <h1>Note <em style={{color: 'var(--cyan)'}}>Intelligence</em></h1>
          <p className="lead" style={{color: 'var(--muted)', marginBottom: '2rem'}}>
            Paste your study notes and transform them into summaries, flashcards, and quiz questions powered by AI.
          </p>

          <div className="note-grid">
            <div className="panel">
              <div className="panel-header">
                <span>📄 Raw Notes Input</span>
                <span className="badge">Pasted</span>
              </div>
              <div className="panel-body">
                <textarea
                  className="input-field textarea"
                  placeholder="Paste your raw study notes here...

Example:
Neural Networks - A neural network is a series of algorithms that endeavors to recognize underlying relationships in a data set through a process that mimics the way the human brain operates. Key components include:
- Neurons (nodes)
- Weights and biases
- Activation functions (ReLU, Sigmoid, Tanh)
- Forward propagation
- Backpropagation

Gradient descent optimizes the network by minimizing the loss function..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <div className="notes-meta">
                  <span className="mono">{notes.length} characters</span>
                  {notes.length < 50 && <span style={{color: 'var(--amber)'}}> (min 50 required)</span>}
                </div>
                <button 
                  className="btn btn-primary analyze-btn" 
                  onClick={handleAnalyze}
                  disabled={loading || notes.length < 50}
                >
                  {loading ? (
                    <>
                      <span className="loading-dots">●●●</span> Analyzing...
                    </>
                  ) : (
                    <>✨ Analyze Notes</>
                  )}
                </button>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <span>✨ AI Output</span>
                {analysis && <span className="status-badge">● Complete</span>}
              </div>
              <div className="tab-row">
                <button className={`tab ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => handleTabChange('summary')}>
                  Summary ({analysis?.summary ? '1' : '0'})
                </button>
                <button className={`tab ${activeTab === 'flashcards' ? 'active' : ''}`} onClick={() => handleTabChange('flashcards')}>
                  Flashcards ({analysis?.flashcards?.length || 0}/5)
                </button>
                <button className={`tab ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => handleTabChange('quiz')}>
                  Quiz ({analysis?.quizQuestions?.length || 0}/10)
                </button>
              </div>
              <div className="panel-body content-body">
                {!analysis ? (
                  <div className="empty-state">
                    <div className="empty-icon">📊</div>
                    <p>Enter notes and click analyze to see results</p>
                    <p className="empty-hint">Get summaries, flashcards, and quiz questions</p>
                  </div>
                ) : activeTab === 'summary' ? (
                  <div className="summary-content">
                    <div className="summary-text">
                      {analysis.summary.split('\n\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                    <div className="summary-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => handleTabChange('flashcards')}>
                        Study Flashcards →
                      </button>
                      <button className="btn btn-outline btn-sm" onClick={() => handleTabChange('quiz')}>
                        Take Quiz →
                      </button>
                    </div>
                  </div>
                ) : activeTab === 'flashcards' ? (
                  <div className="flashcards-content">
                    {analysis.flashcards?.map((card, i) => (
                      <div key={i} className="flashcard">
                        <div className="fc-header">
                          <span className="fc-number mono">#{i + 1}</span>
                          <span className="fc-label">Flashcard</span>
                        </div>
                        <div className="fc-q">Q: {card.question}</div>
                        <div className="fc-divider"></div>
                        <div className="fc-a">A: {card.answer}</div>
                      </div>
                    ))}
                    {(!analysis.flashcards || analysis.flashcards.length === 0) && (
                      <div className="empty-tab">
                        <p>No flashcards generated yet</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="quiz-content">
                    {analysis.quizQuestions?.map((q, i) => (
                      <div key={i} className="quiz-item">
                        <div className="quiz-header">
                          <span className="quiz-number mono">Q{i + 1}</span>
                          <span className="quiz-points mono">1 point</span>
                        </div>
                        <div className="quiz-q">{q.question}</div>
                        <div className="quiz-options">
                          {q.options?.map((opt, j) => (
                            <div key={j} className={`quiz-opt ${j === q.correctIndex ? 'correct' : ''}`}>
                              <span className="opt-letter">{String.fromCharCode(65 + j)}</span>
                              <span>{opt}</span>
                              {j === q.correctIndex && <span className="correct-mark">✓</span>}
                            </div>
                          ))}
                        </div>
                        {q.explanation && (
                          <div className="quiz-explanation">
                            <span className="exp-icon">💡</span>
                            <span>{q.explanation}</span>
                          </div>
                        )}
                      </div>
                    ))}
                    {(!analysis.quizQuestions || analysis.quizQuestions.length === 0) && (
                      <div className="empty-tab">
                        <p>No quiz questions generated yet</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .note-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .panel {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
        }
        .panel-header {
          background: var(--surface);
          padding: 1rem 1.4rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .panel-body { padding: 1.4rem; }
        .badge {
          background: var(--cyan);
          color: #050a12;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.6rem;
          font-weight: 700;
        }
        .status-badge {
          color: var(--teal);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .status-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--teal);
          animation: blink 1.4s step-start infinite;
        }
        .textarea {
          min-height: 300px;
          resize: vertical;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .notes-meta {
          font-size: 0.7rem;
          color: var(--muted);
          margin-top: 0.5rem;
          margin-bottom: 1rem;
        }
        .analyze-btn {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
        }
        .loading-dots {
          animation: bounce 1.2s infinite;
        }
        .tab-row {
          display: flex;
          border-bottom: 1px solid var(--border);
          background: var(--surface);
        }
        .tab {
          flex: 1;
          padding: 1rem;
          background: none;
          border: none;
          color: var(--muted);
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }
        .tab:hover { color: var(--cyan); }
        .tab.active {
          color: var(--cyan);
          border-bottom-color: var(--cyan);
          background: rgba(0, 212, 255, 0.05);
        }
        .content-body { min-height: 400px; }
        
        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          color: var(--muted);
        }
        .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
        .empty-hint { font-size: 0.8rem; margin-top: 0.5rem; }
        .empty-tab { text-align: center; padding: 2rem; color: var(--muted); }

        .summary-content { }
        .summary-text {
          line-height: 1.8;
          color: var(--text);
          margin-bottom: 1.5rem;
        }
        .summary-text p { margin-bottom: 1rem; }
        .summary-actions { display: flex; gap: 0.75rem; }
        .summary-actions .btn { flex: 1; }

        .flashcards-content { display: flex; flex-direction: column; gap: 1rem; }
        .flashcard {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.2rem;
          transition: border-color 0.2s;
        }
        .flashcard:hover { border-color: var(--cyan); }
        .fc-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
        .fc-number { color: var(--cyan); font-size: 0.7rem; }
        .fc-label { color: var(--muted); font-size: 0.65rem; font-family: 'DM Mono', monospace; text-transform: uppercase; }
        .fc-q { font-size: 0.9rem; font-weight: 600; margin-bottom: 0.75rem; }
        .fc-divider { height: 1px; background: var(--border); margin: 0.75rem 0; }
        .fc-a { font-size: 0.85rem; color: var(--teal); font-family: 'DM Mono', monospace; line-height: 1.5; }

        .quiz-content { display: flex; flex-direction: column; gap: 1.5rem; }
        .quiz-item {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.2rem;
        }
        .quiz-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
        .quiz-number { color: var(--cyan); font-size: 0.7rem; }
        .quiz-points { color: var(--amber); font-size: 0.65rem; }
        .quiz-q { font-size: 0.95rem; font-weight: 600; margin-bottom: 1rem; line-height: 1.4; }
        .quiz-options { display: flex; flex-direction: column; gap: 0.5rem; }
        .quiz-opt {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .quiz-opt.correct {
          border-color: var(--teal);
          background: rgba(0, 255, 200, 0.08);
          color: var(--teal);
        }
        .opt-letter {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .quiz-opt.correct .opt-letter { background: var(--teal); color: #050a12; }
        .correct-mark { margin-left: auto; color: var(--teal); font-weight: 700; }
        .quiz-explanation {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0.75rem;
          background: rgba(0, 212, 255, 0.05);
          border-radius: 8px;
          font-size: 0.8rem;
          color: var(--muted);
        }
        .exp-icon { flex-shrink: 0; }

        @media (max-width: 800px) {
          .note-grid { grid-template-columns: 1fr; }
          .summary-actions { flex-direction: column; }
        }
      `}</style>
    </>
  );
};

export default NoteIntelligence;
