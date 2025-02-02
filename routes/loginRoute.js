const express = require('express')
const router = express.Router()
const user = require('../middlewares/loginUser');



router.post('/login-user', user.loginUser);


module.exports = router