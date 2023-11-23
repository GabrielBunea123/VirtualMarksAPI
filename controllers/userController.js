const { User, BlacklistedTokens } = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body
        if (password == confirmPassword) {
            const existingUser = await User.findOne({ username: username })
            if (existingUser) {
                return res.status(400).send({ error: 'Username already in use' });
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const user = new User({ username, password: hash });
            await user.save();

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            res.send({ token: token, userId: user._id, role: user.role });
        }
        else {
            return res.status(400).send({ error: 'Passwords do not match' });
        }
    }
    catch (error) {
        res.status(500).send({ error: error });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(400).send({ error: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid username or password' });
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.send({ token: token, userId: user._id, role: user.role });
    }
    catch (error) {
        res.status(500).send({ error: 'Error logging in' });
    }
}

const logoutUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const newBlacklistedToken = new BlacklistedTokens({ token });
    await newBlacklistedToken.save();
    res.json({ message: 'Logged out successfully' });
}

const getUser = async (req, res) => {
    res.json(req.user)
}

const editUser = async (req, res) => {
    const user = req.user
    const { newUsername, email, phone, gender } = req.body

    const existingUsername = await User.findOne({ username: newUsername }) //check if the username is not already taken

    if (existingUsername._id != user._id) {
        return res.status(400).send({ error: "The username is already taken" })
    }

    try {
        const userToUpdate = await User.findById(user._id)

        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        userToUpdate.username = newUsername
        userToUpdate.email = email
        userToUpdate.phone = phone
        userToUpdate.gender = gender
        await userToUpdate.save()


        return res.status(200).json(userToUpdate);
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserRooms = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId)
        // Find the user and populate the rooms
        const user = await User.findById(userId);
        console.log(user)

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ rooms: user.rooms });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { registerUser, loginUser, logoutUser, getUser, editUser, getUserRooms };


