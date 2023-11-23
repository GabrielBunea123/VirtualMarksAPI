const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
    score: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    created_at: { type: Date, default: Date.now() },
});

const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark