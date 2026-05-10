const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticate } = require('../middleware/auth.middleware');

// Add Activity to Stop
router.post('/stop/:stopId', authenticate, async (req, res) => {
  try {
    const { title, description, cost, category, startTime, endTime } = req.body;
    const activity = await prisma.activity.create({
      data: {
        stopId: parseInt(req.params.stopId),
        title, description, cost: parseFloat(cost), category,
        startTime: startTime ? new Date(startTime) : null,
        endTime: endTime ? new Date(endTime) : null
      }
    });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
