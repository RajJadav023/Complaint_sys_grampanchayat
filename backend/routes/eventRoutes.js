const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect } = require('../middleware/authMiddleware');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create event (Admin only)
router.post('/', protect, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Authorization denied. Admin access required.' });
    }

    const { title, category, description, date, location } = req.body;

    try {
        const event = await Event.create({
            title,
            category,
            description,
            date,
            location,
            createdBy: req.user._id
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: 'Event creation failed', error: error.message });
    }
});

// Delete event (Admin only)
router.delete('/:id', protect, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Authorization denied. Admin access required.' });
    }

    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        await event.deleteOne();
        res.json({ message: 'Event removed from broadcast' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
