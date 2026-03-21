require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Course = require('./models/Course');
const Session = require('./models/Session');
const Quiz = require('./models/Quiz');
const User = require('./models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const courses = [
  {
    title: 'Complete Machine Learning Masterclass',
    description: 'Master machine learning from scratch with hands-on projects. Learn supervised and unsupervised learning, neural networks, and deploy ML models to production.',
    category: 'Machine Learning',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    difficulty: 'Intermediate',
    totalDuration: 2400,
    enrolledCount: 15420,
    rating: 4.8,
    instructor: {
      name: 'Dr. Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      bio: 'Former Google ML Engineer with 10+ years experience'
    },
    price: 0,
    modules: [
      {
        title: 'Python & Math Foundations',
        lessons: [
          { title: 'Python Crash Course', duration: 45, videoUrl: '' },
          { title: 'NumPy Essentials', duration: 60, videoUrl: '' },
          { title: 'Linear Algebra for ML', duration: 90, videoUrl: '' },
          { title: 'Statistics & Probability', duration: 75, videoUrl: '' }
        ]
      },
      {
        title: 'Machine Learning Fundamentals',
        lessons: [
          { title: 'What is Machine Learning?', duration: 30, videoUrl: '' },
          { title: 'Supervised vs Unsupervised', duration: 45, videoUrl: '' },
          { title: 'Linear Regression Deep Dive', duration: 90, videoUrl: '' },
          { title: 'Logistic Regression', duration: 75, videoUrl: '' },
          { title: 'Decision Trees & Random Forests', duration: 90, videoUrl: '' }
        ]
      },
      {
        title: 'Advanced ML Techniques',
        lessons: [
          { title: 'Support Vector Machines', duration: 60, videoUrl: '' },
          { title: 'K-Means Clustering', duration: 45, videoUrl: '' },
          { title: 'Principal Component Analysis', duration: 60, videoUrl: '' },
          { title: 'Model Evaluation & Tuning', duration: 75, videoUrl: '' }
        ]
      },
      {
        title: 'Neural Networks & Deep Learning',
        lessons: [
          { title: 'Introduction to Neural Networks', duration: 60, videoUrl: '' },
          { title: 'Backpropagation Explained', duration: 90, videoUrl: '' },
          { title: 'Building Your First ANN', duration: 120, videoUrl: '' },
          { title: 'Convolutional Neural Networks', duration: 90, videoUrl: '' }
        ]
      }
    ]
  },
  {
    title: 'React.js - Complete Developer Guide',
    description: 'Build modern web applications with React 18. Learn hooks, state management, Redux, and deploy production-ready React apps.',
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    difficulty: 'Intermediate',
    totalDuration: 1800,
    enrolledCount: 28350,
    rating: 4.9,
    instructor: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      bio: 'Senior Frontend Engineer at Netflix'
    },
    price: 0,
    modules: [
      {
        title: 'React Fundamentals',
        lessons: [
          { title: 'Introduction to React', duration: 30, videoUrl: '' },
          { title: 'JSX Syntax', duration: 45, videoUrl: '' },
          { title: 'Components & Props', duration: 60, videoUrl: '' },
          { title: 'State & Lifecycle', duration: 75, videoUrl: '' }
        ]
      },
      {
        title: 'React Hooks',
        lessons: [
          { title: 'useState Deep Dive', duration: 60, videoUrl: '' },
          { title: 'useEffect Mastery', duration: 90, videoUrl: '' },
          { title: 'useContext & useReducer', duration: 75, videoUrl: '' },
          { title: 'Custom Hooks', duration: 60, videoUrl: '' }
        ]
      },
      {
        title: 'State Management',
        lessons: [
          { title: 'Redux Fundamentals', duration: 90, videoUrl: '' },
          { title: 'Redux Toolkit', duration: 75, videoUrl: '' },
          { title: 'React Query', duration: 60, videoUrl: '' },
          { title: 'Zustand State Management', duration: 45, videoUrl: '' }
        ]
      },
      {
        title: 'Production Deployment',
        lessons: [
          { title: 'Performance Optimization', duration: 90, videoUrl: '' },
          { title: 'Testing React Apps', duration: 120, videoUrl: '' },
          { title: 'Deployment & CI/CD', duration: 60, videoUrl: '' }
        ]
      }
    ]
  },
  {
    title: 'Data Science with Python',
    description: 'Learn data science using Python, Pandas, NumPy, and visualization libraries. Extract insights from real-world datasets.',
    category: 'Data Science',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    difficulty: 'Beginner',
    totalDuration: 2100,
    enrolledCount: 19800,
    rating: 4.7,
    instructor: {
      name: 'Prof. Michael Park',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      bio: 'Data Science Lead at Spotify'
    },
    price: 0,
    modules: [
      {
        title: 'Python for Data Science',
        lessons: [
          { title: 'Python Basics Review', duration: 45, videoUrl: '' },
          { title: 'NumPy Array Operations', duration: 60, videoUrl: '' },
          { title: 'Pandas DataFrames', duration: 90, videoUrl: '' },
          { title: 'Data Cleaning Techniques', duration: 75, videoUrl: '' }
        ]
      },
      {
        title: 'Exploratory Data Analysis',
        lessons: [
          { title: 'EDA Process', duration: 45, videoUrl: '' },
          { title: 'Statistical Analysis', duration: 90, videoUrl: '' },
          { title: 'Data Visualization with Matplotlib', duration: 75, videoUrl: '' },
          { title: 'Interactive Charts with Plotly', duration: 60, videoUrl: '' }
        ]
      },
      {
        title: 'Machine Learning for Data Science',
        lessons: [
          { title: 'Scikit-Learn Introduction', duration: 60, videoUrl: '' },
          { title: 'Classification Models', duration: 90, videoUrl: '' },
          { title: 'Regression Analysis', duration: 75, videoUrl: '' },
          { title: 'Model Evaluation Metrics', duration: 60, videoUrl: '' }
        ]
      }
    ]
  },
  {
    title: 'DevOps & Cloud Engineering',
    description: 'Master DevOps practices, Docker, Kubernetes, CI/CD pipelines, and cloud platforms. Become a cloud-native engineer.',
    category: 'DevOps',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
    difficulty: 'Advanced',
    totalDuration: 2700,
    enrolledCount: 12500,
    rating: 4.8,
    instructor: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      bio: 'Principal DevOps Engineer at AWS'
    },
    price: 0,
    modules: [
      {
        title: 'Container Fundamentals',
        lessons: [
          { title: 'Docker Introduction', duration: 45, videoUrl: '' },
          { title: 'Docker Images & Containers', duration: 90, videoUrl: '' },
          { title: 'Docker Compose', duration: 75, videoUrl: '' },
          { title: 'Docker Networking', duration: 60, videoUrl: '' }
        ]
      },
      {
        title: 'Kubernetes Mastery',
        lessons: [
          { title: 'K8s Architecture', duration: 60, videoUrl: '' },
          { title: 'Pods, Services & Deployments', duration: 120, videoUrl: '' },
          { title: 'Helm Charts', duration: 90, videoUrl: '' },
          { title: 'K8s Security', duration: 75, videoUrl: '' }
        ]
      },
      {
        title: 'CI/CD Pipelines',
        lessons: [
          { title: 'GitHub Actions', duration: 90, videoUrl: '' },
          { title: 'Jenkins Pipeline', duration: 120, videoUrl: '' },
          { title: 'ArgoCD & GitOps', duration: 90, videoUrl: '' }
        ]
      }
    ]
  },
  {
    title: 'Deep Learning with PyTorch',
    description: 'Build deep learning models with PyTorch. From neural networks to transformers - master the most flexible ML framework.',
    category: 'AI & Deep Learning',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
    difficulty: 'Advanced',
    totalDuration: 3000,
    enrolledCount: 9800,
    rating: 4.9,
    instructor: {
      name: 'Dr. Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      bio: 'AI Research Scientist at OpenAI'
    },
    price: 0,
    modules: [
      {
        title: 'PyTorch Fundamentals',
        lessons: [
          { title: 'Tensors & Operations', duration: 60, videoUrl: '' },
          { title: 'Autograd & Backpropagation', duration: 90, videoUrl: '' },
          { title: 'Building Neural Networks', duration: 120, videoUrl: '' },
          { title: 'Training Loop', duration: 75, videoUrl: '' }
        ]
      },
      {
        title: 'Convolutional Neural Networks',
        lessons: [
          { title: 'CNN Architecture', duration: 90, videoUrl: '' },
          { title: 'Image Classification Project', duration: 180, videoUrl: '' },
          { title: 'Transfer Learning', duration: 120, videoUrl: '' },
          { title: 'Object Detection', duration: 150, videoUrl: '' }
        ]
      },
      {
        title: 'Transformers & NLP',
        lessons: [
          { title: 'Attention Mechanism', duration: 90, videoUrl: '' },
          { title: 'BERT & GPT', duration: 120, videoUrl: '' },
          { title: 'Fine-tuning Transformers', duration: 150, videoUrl: '' },
          { title: 'Building a Chatbot', duration: 180, videoUrl: '' }
        ]
      }
    ]
  },
  {
    title: 'System Design for Intervews',
    description: 'Master system design concepts for technical interviews. Learn to design scalable distributed systems.',
    category: 'System Design',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    difficulty: 'Advanced',
    totalDuration: 1500,
    enrolledCount: 22100,
    rating: 4.8,
    instructor: {
      name: 'Robert Kim',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      bio: 'Staff Engineer at Google'
    },
    price: 0,
    modules: [
      {
        title: 'Fundamentals',
        lessons: [
          { title: 'Scale from Zero', duration: 45, videoUrl: '' },
          { title: 'Load Balancing', duration: 60, videoUrl: '' },
          { title: 'Caching Strategies', duration: 75, videoUrl: '' },
          { title: 'Database Sharding', duration: 90, videoUrl: '' }
        ]
      },
      {
        title: 'Design Patterns',
        lessons: [
          { title: 'Microservices Architecture', duration: 90, videoUrl: '' },
          { title: 'Event-Driven Systems', duration: 75, videoUrl: '' },
          { title: 'Message Queues', duration: 60, videoUrl: '' },
          { title: 'CDN & Edge Computing', duration: 45, videoUrl: '' }
        ]
      },
      {
        title: 'Real-World Designs',
        lessons: [
          { title: 'Design URL Shortener', duration: 60, videoUrl: '' },
          { title: 'Design Twitter', duration: 120, videoUrl: '' },
          { title: 'Design YouTube', duration: 120, videoUrl: '' },
          { title: 'Design Chat System', duration: 90, videoUrl: '' }
        ]
      }
    ]
  }
];

const sessions = [
  {
    title: 'Live: Building Your First ML Model',
    instructor: { name: 'Dr. Sarah Chen', avatar: '' },
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    duration: 90,
    status: 'upcoming',
    topic: 'Machine Learning',
    description: 'Hands-on session building a complete ML pipeline from data preprocessing to model deployment.',
    maxAttendees: 100,
    meetingLink: 'https://meet.aileraner.com/ml-session'
  },
  {
    title: 'Live: React Performance Optimization',
    instructor: { name: 'Alex Thompson', avatar: '' },
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    duration: 60,
    status: 'upcoming',
    topic: 'Web Development',
    description: 'Learn advanced React performance techniques including memoization, code splitting, and lazy loading.',
    maxAttendees: 150,
    meetingLink: 'https://meet.aileraner.com/react-perf'
  },
  {
    title: 'Live: Docker & Kubernetes Workshop',
    instructor: { name: 'James Wilson', avatar: '' },
    scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    duration: 120,
    status: 'upcoming',
    topic: 'DevOps',
    description: 'Complete hands-on workshop covering container orchestration from development to production.',
    maxAttendees: 80,
    meetingLink: 'https://meet.aileraner.com/k8s-workshop'
  },
  {
    title: 'Live: Neural Networks from Scratch',
    instructor: { name: 'Dr. Lisa Wang', avatar: '' },
    scheduledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    duration: 90,
    status: 'completed',
    topic: 'Deep Learning',
    description: 'Building neural networks step by step with PyTorch.',
    maxAttendees: 100,
    meetingLink: ''
  }
];

const quizzes = [
  {
    courseId: null,
    title: 'Machine Learning Fundamentals Quiz',
    description: 'Test your understanding of core ML concepts',
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        question: 'What is the main goal of supervised learning?',
        options: ['Find patterns in unlabeled data', 'Predict outcomes using labeled data', 'Reduce data dimensions', 'Cluster similar data points'],
        correctIndex: 1,
        explanation: 'Supervised learning uses labeled data to train models for prediction tasks.'
      },
      {
        question: 'Which algorithm is used for classification problems?',
        options: ['Linear Regression', 'Logistic Regression', 'K-Means', 'PCA'],
        correctIndex: 1,
        explanation: 'Logistic Regression is specifically designed for binary classification tasks.'
      },
      {
        question: 'What does overfitting mean?',
        options: ['Model performs poorly on training data', 'Model fails to generalize to new data', 'Model is too simple', 'Model has insufficient training'],
        correctIndex: 1,
        explanation: 'Overfitting occurs when a model learns the training data too well, including noise, and fails to generalize.'
      },
      {
        question: 'What is regularization in ML?',
        options: ['Increasing model complexity', 'Adding penalty to prevent overfitting', 'Removing outliers', 'Scaling features'],
        correctIndex: 1,
        explanation: 'Regularization adds a penalty term to the loss function to discourage overly complex models.'
      },
      {
        question: 'Which metric measures classification accuracy?',
        options: ['RMSE', 'MAE', 'Accuracy', 'R-squared'],
        correctIndex: 2,
        explanation: 'Accuracy is the ratio of correct predictions to total predictions in classification.'
      }
    ]
  },
  {
    courseId: null,
    title: 'React.js Essentials Quiz',
    description: 'Test your React knowledge',
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        question: 'What hook is used for state management in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer only'],
        correctIndex: 1,
        explanation: 'useState is the primary hook for managing local state in functional components.'
      },
      {
        question: 'What is JSX?',
        options: ['A JavaScript library', 'A syntax extension for JavaScript', 'A CSS framework', 'A testing tool'],
        correctIndex: 1,
        explanation: 'JSX is a syntax extension that allows writing HTML-like code in JavaScript.'
      },
      {
        question: 'How do you pass data from parent to child component?',
        options: ['Using state', 'Using props', 'Using context only', 'Using Redux only'],
        correctIndex: 1,
        explanation: 'Props (properties) are the primary way to pass data from parent to child components.'
      },
      {
        question: 'What does useEffect do?',
        options: ['Manages state', 'Handles side effects in components', 'Creates components', 'Defines routes'],
        correctIndex: 1,
        explanation: 'useEffect handles side effects like data fetching, subscriptions, and DOM manipulation.'
      },
      {
        question: 'What is the virtual DOM?',
        options: ['Direct DOM manipulation', 'Lightweight copy of DOM for efficient updates', 'A database', 'A routing library'],
        correctIndex: 1,
        explanation: 'Virtual DOM is a lightweight JavaScript representation of the real DOM used by React for efficient updates.'
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Course.deleteMany({});
    await Session.deleteMany({});
    await Quiz.deleteMany({});
    await User.deleteMany({});

    console.log('📚 Seeding courses...');
    const createdCourses = await Course.insertMany(courses);
    console.log(`✅ ${createdCourses.length} courses created`);

    quizzes[0].courseId = createdCourses[0]._id;
    quizzes[1].courseId = createdCourses[1]._id;

    console.log('📝 Seeding quizzes...');
    const createdQuizzes = await Quiz.insertMany(quizzes);
    console.log(`✅ ${createdQuizzes.length} quizzes created`);

    console.log('🎥 Seeding sessions...');
    const createdSessions = await Session.insertMany(sessions);
    console.log(`✅ ${createdSessions.length} sessions created`);

    console.log('👤 Creating demo user...');
    const hashedPassword = await bcrypt.hash('demo123', 10);
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@aileraner.com',
      password: hashedPassword,
      learningGoal: 'Machine Learning Engineer',
      currentStreak: 47,
      totalStudyHours: 234,
      enrolledCourses: [createdCourses[0]._id, createdCourses[1]._id]
    });
    console.log(`✅ Demo user created: demo@aileraner.com / demo123`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Course IDs (for reference):');
    createdCourses.forEach(course => {
      console.log(`  - ${course.title}: ${course._id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
