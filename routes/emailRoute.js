const express = require('express')
const router = express.Router()
const send = require('../middlewares/emailMiddlewares')
const verifyToken = require('../middlewares/verifyToken')

router.post('/send-mail',verifyToken,send.mail);
router.get('/verify-email',send.verifyEmail)

module.exports = router