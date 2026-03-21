const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    default: ''
  },
  youtubeUrl: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    default: ''
  },
  summary: {
    type: String,
    default: ''
  },
  keyPoints: [{
    type: String
  }],
  codeExample: {
    type: String,
    default: ''
  },
  resources: [{
    title: String,
    url: String
  }]
});

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  lessons: [lessonSchema]
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  category: {
    type: String,
    required: true,
    enum: ['Machine Learning', 'Web Development', 'Data Science', 'DevOps', 'Mobile Development', 'AI & Deep Learning', 'System Design']
  },
  thumbnail: {
    type: String,
    default: ''
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  totalDuration: {
    type: Number,
    default: 0
  },
  enrolledCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  instructor: {
    name: { type: String, default: '' },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' }
  },
  modules: [moduleSchema],
  price: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ category: 1 });
courseSchema.index({ difficulty: 1 });

module.exports = mongoose.model('Course', courseSchema);
