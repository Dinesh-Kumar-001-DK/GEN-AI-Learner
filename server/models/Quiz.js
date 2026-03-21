const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
  explanation: {
    type: String,
    default: ''
  }
});

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  passingScore: {
    type: Number,
    default: 70,
    min: 0,
    max: 100
  },
  questions: [questionSchema],
  timeLimit: {
    type: Number,
    default: 30
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

quizSchema.index({ courseId: 1 });

module.exports = mongoose.model('Quiz', quizSchema);
