const express = require('express')
const router = express.Router()
const chat = require('../middlewares/roomChat')
const verifyToken = require('../middlewares/verifyToken')

router.get('/room-chat',verifyToken,chat.fetchChat);

module.exports = router