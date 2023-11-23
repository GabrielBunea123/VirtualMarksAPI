const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
});

const BlacklistedTokensSchema = new Schema({
    token: {
        type: String,
        required: true
    }
})


const User = mongoose.model('User', UserSchema);
const BlacklistedTokens = mongoose.model('BlacklistedTokens', BlacklistedTokensSchema)

module.exports = { User, BlacklistedTokens };
