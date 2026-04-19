const express = require('express');
const router = express.Router();
const Complain = require('../models/Complain');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/complaints
// @desc    Register a new complain (Villager)
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { title, category, description, priority, locationDetails, documentUrl } = req.body;

        const complain = new Complain({
            user: req.user._id,
            title,
            category,
            description,
            priority,
            locationDetails,
            documentUrl,
            village: req.user.village
        });

        const createdComplain = await complain.save();
        res.status(201).json(createdComplain);
    } catch (error) {
        res.status(500).json({ message: 'Failed to register complain', error: error.message });
    }
});

// @route   GET /api/complaints/my
// @desc    Get logged in user complaints
// @access  Private
router.get('/my', protect, async (req, res) => {
    try {
        const complaints = await Complain.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/complaints
// @desc    Get all complaints (Admin View)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const complaints = await Complain.find({}).populate('user', 'name email village').sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/complaints/:id
// @desc    Update complain status & response (Admin)
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const complain = await Complain.findById(req.params.id);

        if (complain) {
            complain.status = req.body.status || complain.status;
            complain.adminResponse = req.body.adminResponse || complain.adminResponse;

            const updatedComplain = await complain.save();
            res.json(updatedComplain);
        } else {
            res.status(404).json({ message: 'Complain not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   DELETE /api/complaints/:id
// @desc    Delete a complain (Admin)
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const complain = await Complain.findById(req.params.id);

        if (complain) {
            await complain.deleteOne();
            res.json({ message: 'Complain removed from system' });
        } else {
            res.status(404).json({ message: 'Complain not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
