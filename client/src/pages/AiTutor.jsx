import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTag from '../components/PageTag';
import { useAuth } from '../context/AuthContext';
import { aiApi } from '../api/axios';

const AiTutor = () => {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: `Hello${user?.name ? ', ' + user.name.split(' ')[0] : ''}! 👋 I'm Ailer, your AI learning co-pilot. I'm here to help you navigate your learning journey. What would you like to explore today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const conversationHistory = [...messages, userMessage];
      const { data } = await aiApi.chat(conversationHistory);
      
      setMessages(prev => [...prev, { role: 'model', content: data.response }]);
    } catch (err) {
      console.error('AI Chat error:', err);
      setMessages(prev => [...prev, {
        role: 'model',
        content: "I'm having trouble connecting right now. Please try again in a moment."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar showBack backTo="/" />
      
      <main className="ai-tutor-page">
        <div className="tutor-container">
          <div className="tutor-header">
            <PageTag label="Feature 01" emoji="🧠" />
            <h1>Adaptive <em>AI Tutor</em></h1>
            <p className="lead">
              Your personal AI tutor watches how you think, not just what you answer. It adjusts difficulty, pacing, and topic flow in real-time.
            </p>
          </div>

          <div className="chat-interface">
            <div className="chat-header">
              <div className="ai-avatar">🤖</div>
              <div className="ai-info">
                <span className="ai-name">Ailer — AI Tutor</span>
                <span className="ai-status">● {isAuthenticated ? 'Adapting to your level' : 'Ready to help'}</span>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role}`}>
                  <div className="message-avatar">
                    {msg.role === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className="message-content">
                    <div className="bubble">{msg.content}</div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message model">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input" onSubmit={handleSubmit}>
              <input
                type="text"
                className="input-field"
                placeholder="Ask anything about your learning..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <button 
                type="submit" 
                className="btn btn-primary send-btn"
                disabled={loading || !input.trim()}
              >
                {loading ? '...' : '→'}
              </button>
            </form>
          </div>

          <div className="tutor-stats">
            <div className="stat-card">
              <div className="stat-val">3.2x</div>
              <div className="stat-label">Faster Learning</div>
            </div>
            <div className="stat-card">
              <div className="stat-val">94%</div>
              <div className="stat-label">Retention Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-val">Real-time</div>
              <div className="stat-label">Adaptation Speed</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .ai-tutor-page {
          padding-top: 68px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tutor-container {
          width: 100%;
          max-width: 800px;
          padding: 2rem 1.5rem;
        }

        .tutor-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .tutor-header h1 {
          margin-bottom: 1rem;
        }

        .tutor-header h1 em {
          font-style: normal;
          color: var(--cyan);
        }

        .lead {
          font-size: 1rem;
          color: var(--muted);
          line-height: 1.7;
          max-width: 500px;
          margin: 0 auto;
        }

        .chat-interface {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 0 60px rgba(0, 212, 255, 0.06);
        }

        .chat-header {
          background: var(--surface);
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ai-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--cyan), var(--teal));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .ai-info {
          display: flex;
          flex-direction: column;
        }

        .ai-name {
          font-weight: 700;
          font-size: 0.95rem;
        }

        .ai-status {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: var(--teal);
        }

        .chat-messages {
          padding: 1.5rem;
          max-height: 400px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message {
          display: flex;
          gap: 10px;
          animation: fadeUp 0.4s ease both;
        }

        .message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .bubble {
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.9rem;
          line-height: 1.6;
          max-width: 80%;
        }

        .message.model .bubble {
          background: var(--surface);
          border: 1px solid var(--border);
          border-top-left-radius: 2px;
        }

        .message.user .bubble {
          background: var(--cyan);
          color: #050a12;
          border-top-right-radius: 2px;
          font-weight: 600;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 12px 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          border-top-left-radius: 2px;
          width: fit-content;
        }

        .typing-indicator .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--muted);
          animation: bounce 1.2s infinite;
        }

        .typing-indicator .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        .chat-input {
          display: flex;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: var(--surface);
          border-top: 1px solid var(--border);
        }

        .chat-input .input-field {
          flex: 1;
        }

        .send-btn {
          padding: 12px 20px;
        }

        .tutor-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 2rem;
        }

        .stat-card {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.2rem;
          text-align: center;
        }

        .stat-val {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--cyan);
        }

        .stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 4px;
        }

        @media (max-width: 700px) {
          .tutor-stats {
            grid-template-columns: 1fr 1fr;
          }

          .bubble {
            max-width: 90%;
          }
        }

        @media (max-width: 768px) {
          .ai-tutor-page {
            padding-top: 68px;
          }

          .tutor-container {
            padding: 1.5rem 1rem;
          }

          .tutor-header h1 {
            font-size: 1.8rem;
          }

          .chat-messages {
            max-height: 350px;
            padding: 1rem;
          }

          .chat-input {
            padding: 0.75rem 1rem;
          }

          .send-btn {
            padding: 10px 16px;
          }
        }

        @media (max-width: 480px) {
          .tutor-container {
            padding: 1rem 0.875rem;
          }

          .chat-interface {
            border-radius: 12px;
          }

          .chat-header {
            padding: 0.75rem 1rem;
          }

          .chat-messages {
            max-height: 300px;
            padding: 0.875rem;
          }

          .message {
            gap: 8px;
          }

          .message-avatar {
            width: 28px;
            height: 28px;
            font-size: 0.8rem;
          }

          .bubble {
            padding: 10px 14px;
            font-size: 0.85rem;
          }

          .chat-input {
            flex-direction: column;
            gap: 0.5rem;
          }

          .chat-input .input-field {
            width: 100%;
          }

          .send-btn {
            width: 100%;
            padding: 12px;
          }

          .tutor-stats {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .stat-card {
            padding: 1rem;
          }

          .stat-val {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default AiTutor;
