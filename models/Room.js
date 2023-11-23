const mongoose = require('mongoose');
const shortid = require('shortid')

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, unique: true, default: shortid.generate },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;