const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');
const { protect } = require('../middleware/auth');

router.get('/:courseId', protect, async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({ courseId: req.params.courseId, isPublished: true });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this course' });
    }

    res.json({
      success: true,
      quiz: {
        _id: quiz._id,
        title: quiz.title,
        description: quiz.description,
        passingScore: quiz.passingScore,
        timeLimit: quiz.timeLimit,
        questionCount: quiz.questions.length,
        questions: quiz.questions
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/submit', protect, async (req, res, next) => {
  try {
    const { answers } = req.body;
    
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let correctCount = 0;
    const results = quiz.questions.map((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctIndex;
      if (isCorrect) correctCount++;

      return {
        questionIndex: index,
        question: question.question,
        userAnswer: question.options[userAnswer] || 'No answer',
        correctAnswer: question.options[question.correctIndex],
        isCorrect,
        explanation: question.explanation
      };
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    const progress = await Progress.findOne({ 
      userId: req.user._id, 
      courseId: quiz.courseId 
    });

    if (progress) {
      progress.quizScores.push({
        quizId: quiz._id,
        score,
        totalQuestions: quiz.questions.length,
        passed
      });
      await progress.save();
    }

    res.json({
      success: true,
      score,
      passed,
      correctCount,
      totalQuestions: quiz.questions.length,
      passingScore: quiz.passingScore,
      results
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const quiz = await Quiz.create(req.body);

    res.status(201).json({
      success: true,
      quiz
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({
      success: true,
      quiz
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
