const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  instructor: {
    name: { type: String, required: true },
    avatar: { type: String, default: '' }
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    default: 60
  },
  status: {
    type: String,
    enum: ['live', 'upcoming', 'completed'],
    default: 'upcoming'
  },
  topic: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  maxAttendees: {
    type: Number,
    default: 100
  },
  enrolledUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  meetingLink: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

sessionSchema.index({ status: 1, scheduledAt: 1 });

module.exports = mongoose.model('Session', sessionSchema);
