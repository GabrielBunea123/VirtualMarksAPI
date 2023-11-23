const express = require('express');
const router = express.Router()
const markController = require('../controllers/markController');

router.post('/create-mark', markController.createMark);

module.exports = router;