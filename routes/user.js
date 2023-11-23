const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.get('/get-user', userController.getUser)
router.put('/edit-user', userController.editUser)
router.post('/get-user-rooms', userController.getUserRooms)

module.exports = router;