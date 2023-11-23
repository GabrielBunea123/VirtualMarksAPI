require('dotenv').config()

const { User } = require('../models/User')
const Room = require('../models/Room')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createRoom = async (req, res) => {
    try {
        const { userId, roomName } = req.body;
        const user = await User.findById(userId)

        if (!user || !roomName) {
            return res.status(404).json({ error: 'User or room not found.' });
        }
        const newRoom = new Room({
            name: roomName,
            creator: user, // Replace userId with the actual user ID of the creator
        });
        await newRoom.save()

        res.status(200).json({ code: newRoom.code });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const joinRoom = async (req, res) => {
    try {
        const { userId, code } = req.body;


        const room = await Room.findOne({ code: code });
        const user = await User.findById(userId);

        if (!user || !room) {
            return res.status(404).json({ error: 'User or room not found.' });
        }
        user.rooms.push(room.id);
        room.users.push(userId);

        await user.save()
        await room.save()

        res.status(200).json({ message: 'User joined the room successfully.' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const removeRoomUsers = async (req, res) => {
    try {
        const { removedUser, currentUser, roomId } = req.body;
        const user_to_remove = await User.findById(removedUser)
        const current_user = await User.findById(currentUser)
        const room = await Room.findById(roomId)

        if (!user_to_remove || !room) {
            return res.status(404).json({ error: 'User or room not found.' });
        }

        if (current_user._id.toString() == room.creator._id.toString()) {
            room.users.pull(removedUser);

            // Remove the room from the user
            user_to_remove.rooms.pull(roomId);

            // Save changes
            await user_to_remove.save();
            await room.save();

            res.status(200).json({ message: 'User removed from the room successfully.' });
        }
        else {
            res.status(403).json({ Forbidden: 'You are not allowed to do this' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




module.exports = { createRoom, joinRoom, removeRoomUsers };