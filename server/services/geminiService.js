const axios = require('axios');

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.model = 'gemini-2.0-flash';
  }

  async generateResponse(messages, userContext = {}) {
    try {
      if (!this.apiKey || this.apiKey === 'your_gemini_api_key_here') {
        return this.getMockResponse(messages);
      }

      const contents = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const systemInstruction = {
        role: 'model',
        parts: [{
          text: `You are Ailer, an AI learning co-pilot with expertise in education and technology. You help learners navigate their learning journey with patience, encouragement, and clear explanations. 

Key characteristics:
- You're enthusiastic about learning and love sharing knowledge
- You adapt explanations to the user's level
- You ask follow-up questions to ensure understanding
- You celebrate progress and motivate learners
- You can explain concepts in multiple ways if needed
- You focus on practical, applicable knowledge

Current learner context: ${JSON.stringify(userContext)}

Always be encouraging, clear, and educational in your responses.`
        }]
      };

      const requestBody = {
        contents,
        systemInstruction,
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 2048,
          topP: 0.95,
          topK: 40
        }
      };

      const response = await axios.post(
        `${GEMINI_API_URL}?key=${this.apiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data.candidates && response.data.candidates[0]) {
        return response.data.candidates[0].content.parts[0].text;
      }

      return this.getMockResponse(messages);
    } catch (error) {
      console.error('Gemini API Error:', error.message);
      return this.getMockResponse(messages);
    }
  }

  getMockResponse(messages) {
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    
    const mockResponses = [
      "That's a great question! Let me explain that concept in a way that will help you understand it better. The key idea is to break down complex topics into smaller, digestible pieces.",
      "Excellent thinking! You're on the right track. Let me build on your understanding and add some important context that will help you see the bigger picture.",
      "I can see you're diving deep into this topic. Here's an insight that might help: always connect new concepts to things you already know. This makes learning much more effective!",
      "You're doing wonderfully! Remember, learning is a journey, not a race. Every question you ask shows you're actively thinking about the material.",
      "That's exactly the kind of thinking that leads to mastery! Let me share a practical example that will solidify this concept for you."
    ];

    if (lastMessage.includes('gradient') || lastMessage.includes('descent')) {
      return "Gradient descent is like rolling a ball down a hill to find the lowest point. The 'gradient' tells us which direction is downhill, and 'descent' means we're moving downward. The learning rate is how big each step is - too big and you might roll past the bottom, too small and it takes forever!";
    }

    if (lastMessage.includes('python') || lastMessage.includes('code')) {
      return "Great question about Python! Python is known for its clean, readable syntax. Think of it like writing in plain English with some structure. The indentation matters - it's not just for looks, it defines code blocks!";
    }

    if (lastMessage.includes('machine learning') || lastMessage.includes('ml')) {
      return "Machine Learning is fascinating! At its core, it's about teaching computers to learn from data rather than being explicitly programmed for every scenario. Think of it like teaching a child - you show examples, and they figure out patterns!";
    }

    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  }

  async generateLearningPath(topic, currentLevel) {
    const prompt = `Create a structured learning path for ${topic} for someone at ${currentLevel} level. 
    Include:
    - 5-7 phases/modules
    - Each phase should have 3-5 key topics
    - Estimated time for each phase
    - Difficulty progression
    
    Format as JSON with this structure:
    {
      "phases": [
        {
          "title": "Phase name",
          "description": "Brief description",
          "topics": ["topic1", "topic2"],
          "estimatedWeeks": number,
          "difficulty": "beginner|intermediate|advanced"
        }
      ]
    }`;

    try {
      if (!this.apiKey || this.apiKey === 'your_gemini_api_key_here') {
        return this.getMockRoadmap(topic);
      }

      const response = await axios.post(
        `${GEMINI_API_URL}?key=${this.apiKey}`,
        {
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096
          }
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000
        }
      );

      if (response.data.candidates && response.data.candidates[0]) {
        const text = response.data.candidates[0].content.parts[0].text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }
    } catch (error) {
      console.error('Gemini Roadmap Error:', error.message);
    }

    return this.getMockRoadmap(topic);
  }

  getMockRoadmap(topic) {
    return {
      phases: [
        {
          title: `${topic} Fundamentals`,
          description: `Core concepts and foundations of ${topic}`,
          topics: ['Basic Principles', 'Key Terminology', 'Core Concepts', 'Setup Environment'],
          estimatedWeeks: 2,
          difficulty: 'beginner'
        },
        {
          title: `Introduction to ${topic}`,
          description: `Getting started with practical applications`,
          topics: ['First Steps', 'Basic Syntax', 'Simple Projects', 'Best Practices'],
          estimatedWeeks: 3,
          difficulty: 'beginner'
        },
        {
          title: `Intermediate ${topic}`,
          description: `Building more complex solutions`,
          topics: ['Advanced Patterns', 'Data Handling', 'Error Handling', 'Testing Basics'],
          estimatedWeeks: 4,
          difficulty: 'intermediate'
        },
        {
          title: `Advanced ${topic}`,
          description: `Mastering complex scenarios`,
          topics: ['Performance Optimization', 'Architecture Patterns', 'Scaling', 'Security'],
          estimatedWeeks: 5,
          difficulty: 'advanced'
        },
        {
          title: `${topic} Expert`,
          description: `Industry-level proficiency`,
          topics: ['Production Readiness', 'Deployment', 'Monitoring', 'Continuous Learning'],
          estimatedWeeks: 4,
          difficulty: 'advanced'
        }
      ]
    };
  }

  async analyzeNotes(notes) {
    try {
      if (!this.apiKey || this.apiKey === 'your_gemini_api_key_here') {
        return this.getMockNoteAnalysis(notes);
      }

      const prompt = `Analyze these study notes and create a structured summary, flashcards, and quiz questions.

Notes:
${notes}

Generate JSON with this structure:
{
  "summary": "2-3 paragraph summary of key concepts",
  "flashcards": [
    { "question": "Q1", "answer": "A1" },
    { "question": "Q2", "answer": "A2" }
  ],
  "quizQuestions": [
    {
      "question": "Q1",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "Why this is correct"
    }
  ]
}`;

      const response = await axios.post(
        `${GEMINI_API_URL}?key=${this.apiKey}`,
        {
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096
          }
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000
        }
      );

      if (response.data.candidates && response.data.candidates[0]) {
        const text = response.data.candidates[0].content.parts[0].text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }
    } catch (error) {
      console.error('Gemini Notes Analysis Error:', error.message);
    }

    return this.getMockNoteAnalysis(notes);
  }

  getMockNoteAnalysis(notes) {
    const words = notes.split(' ').slice(0, 50).join(' ');
    return {
      summary: `This section covers important concepts related to ${words}... Key takeaways include understanding the fundamental principles and their practical applications in real-world scenarios.`,
      flashcards: [
        {
          question: `What is the main concept covered in: "${words}..."?`,
          answer: 'The key concept is the fundamental principle explained in the notes, focusing on practical application and theoretical understanding.'
        },
        {
          question: 'What is an important detail mentioned?',
          answer: 'The notes highlight critical aspects that build upon core concepts and demonstrate real-world usage.'
        }
      ],
      quizQuestions: [
        {
          question: 'What is the primary focus of these notes?',
          options: ['Theoretical concepts only', 'Practical applications', 'Both theory and practice', 'Historical context'],
          correctIndex: 2,
          explanation: 'The notes cover both theoretical foundations and practical applications.'
        }
      ]
    };
  }
}

module.exports = new GeminiService();
