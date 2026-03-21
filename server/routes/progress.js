const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const Course = require('../models/Course');
const { protect } = require('../middleware/auth');

router.get('/:courseId', protect, async (req, res, next) => {
  try {
    const progress = await Progress.findOne({
      userId: req.user._id,
      courseId: req.params.courseId
    }).populate('quizScores.quizId', 'title');

    if (!progress) {
      return res.json({
        success: true,
        progress: {
          courseId: req.params.courseId,
          completedLessons: [],
          percentComplete: 0,
          quizScores: []
        }
      });
    }

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:courseId', protect, async (req, res, next) => {
  try {
    const { completedLessons } = req.body;

    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    let totalLessons = 0;
    course.modules.forEach(module => {
      totalLessons += module.lessons.length;
    });

    const percentComplete = totalLessons > 0 
      ? Math.round((completedLessons.length / totalLessons) * 100) 
      : 0;

    let progress = await Progress.findOne({
      userId: req.user._id,
      courseId: req.params.courseId
    });

    if (progress) {
      progress.completedLessons = completedLessons;
      progress.percentComplete = percentComplete;
      progress.lastAccessed = new Date();
      
      if (percentComplete === 100 && !progress.completedAt) {
        progress.completedAt = new Date();
      }
      
      await progress.save();
    } else {
      progress = await Progress.create({
        userId: req.user._id,
        courseId: req.params.courseId,
        completedLessons,
        percentComplete,
        lastAccessed: new Date()
      });
    }

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    next(error);
  }
});

router.get('/', protect, async (req, res, next) => {
  try {
    const progress = await Progress.find({ userId: req.user._id })
      .populate('courseId', 'title thumbnail category difficulty instructor')
      .populate('quizScores.quizId', 'title');

    const stats = {
      totalCourses: progress.length,
      completedCourses: progress.filter(p => p.percentComplete === 100).length,
      averageProgress: progress.length > 0 
        ? Math.round(progress.reduce((acc, p) => acc + p.percentComplete, 0) / progress.length)
        : 0,
      totalQuizzes: progress.reduce((acc, p) => acc + p.quizScores.length, 0),
      averageQuizScore: 0
    };

    const quizzesWithScores = progress.filter(p => p.quizScores.length > 0);
    if (quizzesWithScores.length > 0) {
      const totalScore = quizzesWithScores.reduce((acc, p) => {
        const avgScore = p.quizScores.reduce((a, q) => a + (q.score / q.totalQuestions * 100), 0) / p.quizScores.length;
        return acc + avgScore;
      }, 0);
      stats.averageQuizScore = Math.round(totalScore / quizzesWithScores.length);
    }

    res.json({
      success: true,
      progress,
      stats
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
