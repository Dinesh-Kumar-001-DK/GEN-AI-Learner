const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const geminiService = require('../services/geminiService');
const User = require('../models/User');
const Progress = require('../models/Progress');

router.post('/chat', protect, async (req, res, next) => {
  try {
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'Messages array is required' });
    }

    const user = await User.findById(req.user._id);
    
    const userContext = {
      name: user.name,
      learningGoal: user.learningGoal,
      enrolledCourses: user.enrolledCourses.length
    };

    if (context) {
      Object.assign(userContext, context);
    }

    const response = await geminiService.generateResponse(messages, userContext);

    res.json({
      success: true,
      response,
      timestamp: new Date()
    });
  } catch (error) {
    next(error);
  }
});

router.post('/roadmap', protect, async (req, res, next) => {
  try {
    const { topic, currentLevel } = req.body;

    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }

    const roadmap = await geminiService.generateLearningPath(
      topic,
      currentLevel || 'intermediate'
    );

    res.json({
      success: true,
      roadmap
    });
  } catch (error) {
    next(error);
  }
});

router.post('/analyze-notes', protect, async (req, res, next) => {
  try {
    const { notes } = req.body;

    if (!notes || notes.length < 50) {
      return res.status(400).json({ message: 'Notes must be at least 50 characters long' });
    }

    const analysis = await geminiService.analyzeNotes(notes);

    res.json({
      success: true,
      ...analysis
    });
  } catch (error) {
    next(error);
  }
});

router.post('/career-analysis', protect, async (req, res, next) => {
  try {
    const { skills, targetRole } = req.body;

    const mockAnalysis = {
      matchedRoles: [
        {
          title: targetRole || 'Senior Developer',
          matchScore: 78,
          salary: '$120k - $160k',
          companies: 'Google, Meta, Stripe',
          location: 'Remote OK'
        },
        {
          title: 'Tech Lead',
          matchScore: 85,
          salary: '$140k - $180k',
          companies: 'Amazon, Microsoft',
          location: 'Hybrid'
        },
        {
          title: 'Staff Engineer',
          matchScore: 65,
          salary: '$160k - $220k',
          companies: 'Apple, Netflix',
          location: 'On-site'
        }
      ],
      skillGaps: skills || [
        { skill: 'System Design', current: 45, required: 80 },
        { skill: 'Leadership', current: 30, required: 70 },
        { skill: 'Cloud Architecture', current: 55, required: 85 }
      ],
      actionPlan: [
        {
          priority: 'High',
          action: 'Complete System Design Course',
          duration: '4 weeks',
          impact: '+20% role match'
        },
        {
          priority: 'High',
          action: 'Lead a team project',
          duration: '6 weeks',
          impact: '+15% leadership skills'
        },
        {
          priority: 'Medium',
          action: 'AWS/GCP Architecture certification',
          duration: '8 weeks',
          impact: '+25% cloud skills'
        }
      ]
    };

    res.json({
      success: true,
      ...mockAnalysis
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
