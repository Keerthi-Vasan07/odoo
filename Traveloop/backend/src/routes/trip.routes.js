const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authenticate } = require('../middleware/auth.middleware');

// Create Trip
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, startDate, endDate, isPublic } = req.body;
    const trip = await prisma.trip.create({
      data: {
        title, description, startDate: new Date(startDate), endDate: new Date(endDate),
        isPublic: isPublic || false,
        userId: req.user.userId
      }
    });
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User Trips
router.get('/', authenticate, async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { userId: req.user.userId },
      include: { stops: true }
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Trip by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { 
        stops: { include: { activities: true } },
        budget: { include: { expenses: true } },
        notes: true
      }
    });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.userId !== req.user.userId && !trip.isPublic) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Stop to Trip
router.post('/:id/stops', authenticate, async (req, res) => {
  try {
    const { city, country, startDate, endDate, order } = req.body;
    const stop = await prisma.tripStop.create({
      data: {
        tripId: parseInt(req.params.id),
        city, country, startDate: new Date(startDate), endDate: new Date(endDate), order
      }
    });
    res.status(201).json(stop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
