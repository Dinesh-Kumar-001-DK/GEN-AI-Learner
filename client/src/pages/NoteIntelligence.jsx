import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTag from '../components/PageTag';

const NoteIntelligence = () => {
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('summary');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = () => {
    if (notes.length < 50) {
      alert('Please enter at least 50 characters of notes');
      return;
    }
    setLoading(true);
    
    setTimeout(() => {
      setAnalysis({
        summary: `This section covers important concepts. Key takeaways include understanding the fundamental principles and their practical applications in real-world scenarios. The notes emphasize core concepts that build upon basic foundations.`,
        flashcards: [
          { question: 'What is the main concept covered?', answer: 'The key concept is the fundamental principle explained in the notes.' },
          { question: 'What is an important detail?', answer: 'Critical aspects that build upon core concepts.' }
        ],
        quizQuestions: [
          { question: 'What is the primary focus?', options: ['Theory only', 'Practical applications', 'Both theory and practice', 'Historical context'], correct: 2 }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Navbar showBack backTo="/" />
      
      <main className="page">
        <div className="container">
          <PageTag label="Feature 03" emoji="📝" />
          <h1>Note <em style={{color: 'var(--cyan)'}}>Intelligence</em></h1>
          <p className="lead" style={{color: 'var(--muted)', marginBottom: '2rem'}}>
            Paste messy, raw notes and watch Aileraner transform them into crisp summaries, study flashcards, and auto-generated quizzes.
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
                  placeholder="Paste your raw study notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <button 
                  className="btn btn-primary" 
                  onClick={handleAnalyze}
                  disabled={loading || notes.length < 50}
                  style={{marginTop: '1rem', width: '100%'}}
                >
                  {loading ? 'Analyzing...' : '✨ Analyze Notes'}
                </button>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <span>✨ AI Output</span>
                {analysis && <span style={{color: 'var(--teal)'}}>● Processing complete</span>}
              </div>
              <div className="tab-row">
                <button className={`tab ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')}>Summary</button>
                <button className={`tab ${activeTab === 'flashcards' ? 'active' : ''}`} onClick={() => setActiveTab('flashcards')}>Flashcards</button>
                <button className={`tab ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>Quiz</button>
              </div>
              <div className="panel-body">
                {!analysis ? (
                  <div style={{textAlign: 'center', padding: '3rem', color: 'var(--muted)'}}>
                    Enter notes and click analyze to see results
                  </div>
                ) : activeTab === 'summary' ? (
                  <div className="summary-text">
                    {analysis.summary}
                  </div>
                ) : activeTab === 'flashcards' ? (
                  <div>
                    {analysis.flashcards.map((card, i) => (
                      <div key={i} className="flashcard">
                        <div className="fc-q">Q: {card.question}</div>
                        <div className="fc-a">A: {card.answer}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {analysis.quizQuestions.map((q, i) => (
                      <div key={i} className="quiz-item">
                        <div className="quiz-q">{q.question}</div>
                        {q.options.map((opt, j) => (
                          <div key={j} className={`quiz-opt ${j === q.correct ? 'correct' : ''}`}>
                            {opt}
                          </div>
                        ))}
                      </div>
                    ))}
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
        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .badge {
          background: var(--cyan);
          color: #050a12;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.6rem;
          font-weight: 700;
        }
        .textarea {
          min-height: 200px;
          resize: vertical;
        }
        .tab-row {
          display: flex;
          border-bottom: 1px solid var(--border);
        }
        .tab {
          padding: 0.8rem 1.2rem;
          background: none;
          border: none;
          color: var(--muted);
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          cursor: pointer;
          border-bottom: 2px solid transparent;
        }
        .tab.active {
          color: var(--cyan);
          border-bottom-color: var(--cyan);
        }
        .summary-text {
          line-height: 1.8;
          color: var(--text);
        }
        .flashcard {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 0.8rem;
        }
        .fc-q {
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .fc-a {
          font-size: 0.8rem;
          color: var(--teal);
          font-family: 'DM Mono', monospace;
        }
        .quiz-item { margin-bottom: 1.2rem; }
        .quiz-q { font-weight: 700; margin-bottom: 0.6rem; }
        .quiz-opt {
          padding: 8px 12px;
          border-radius: 6px;
          margin-bottom: 4px;
          border: 1px solid var(--border);
          color: var(--muted);
          font-size: 0.8rem;
        }
        .quiz-opt.correct {
          border-color: var(--teal);
          color: var(--teal);
          background: rgba(0, 255, 200, 0.06);
        }
        @media (max-width: 800px) {
          .note-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default NoteIntelligence;
