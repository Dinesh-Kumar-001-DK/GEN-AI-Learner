const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }

    const sessions = await Session.find(query)
      .sort({ scheduledAt: 1 })
      .populate('enrolledUsers', 'name avatar');

    res.json({
      success: true,
      sessions
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('enrolledUsers', 'name avatar');

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json({
      success: true,
      session
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const session = await Session.create(req.body);

    res.status(201).json({
      success: true,
      session
    });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/join', protect, async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.status === 'completed') {
      return res.status(400).json({ message: 'This session has already ended' });
    }

    if (session.enrolledUsers.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already joined this session' });
    }

    if (session.enrolledUsers.length >= session.maxAttendees) {
      return res.status(400).json({ message: 'Session is full' });
    }

    session.enrolledUsers.push(req.user._id);
    await session.save();

    res.json({
      success: true,
      message: 'Successfully joined session',
      session
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/status', protect, async (req, res, next) => {
  try {
    const { status } = req.body;
    
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json({
      success: true,
      session
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
