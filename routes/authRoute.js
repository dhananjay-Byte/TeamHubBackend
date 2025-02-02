const express = require('express')
const router = express.Router()
const newUser = require('../middlewares/registerUser')
const verifyToken = require('../middlewares/verifyToken');
const log = require('../middlewares/logoutUser')

router.post('/register', newUser.register);
router.post('/logout',verifyToken,log.UserLogOut)

module.exports = router