const express = require('express')
const router = express.Router()
const task = require('../middlewares/userTasks')
const verifyToken = require('../middlewares/verifyToken')

router.post('/add-task',verifyToken,task.addTask);

module.exports = router