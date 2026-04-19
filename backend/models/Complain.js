const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        enum: ['Electricity', 'Road', 'Water', 'Sanitization', 'Garbage', 'Other'],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
    },
    description: {
        type: String,
        required: true,
    },
    documentUrl: {
        type: String, // Path or URL to uploaded document (Aadhar, Income Certificate, etc.)
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved', 'Redirected'],
        default: 'Pending',
    },
    locationDetails: {
        address: String,
        pincode: String,
    },
    adminResponse: {
        type: String,
    },
    village: {
        type: String,
    }
}, { timestamps: true });

const Complain = mongoose.model('Complain', complainSchema);
module.exports = Complain;
