require('dotenv').config()

const { User } = require('../models/User')
const Room = require('../models/Room')
const Mark = require('../models/Mark')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createMark = async (req, res) => {
    try {
        const { mark, userId, roomId } = req.body
        const user = await User.findById(userId)
        const room = await Room.findById(roomId)

        if (!user || !room) {
            return res.status(404).json({ error: 'User or room not found.' });
        }

        const newMark = new Mark({
            score: mark,
            user: user,
            room: room,
        });
        await newMark.save()

        res.status(200).json({ message: 'Mark created' });

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createMark };