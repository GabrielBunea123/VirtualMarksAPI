const express = require('express');
const router = express.Router()
const roomController = require('../controllers/roomController');

router.post('/create-room', roomController.createRoom)
router.post('/join-room', roomController.joinRoom)
router.post('/remove-room-users', roomController.removeRoomUsers)

module.exports = router;