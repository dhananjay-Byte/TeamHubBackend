const express = require('express')
const router = express.Router()
const newUser = require('../middlewares/registerUser')

router.post('/register', newUser.register);

module.exports = router