
const Task = require('../models/tasks')
exports.addTask = async(req,res)=>{
    try {
        const {taskName,taskDescription} = req.body
        const {userId} = req.query

        const newTask = new Task({
            "userId":userId,
            "taskName":taskName,
            "taskDescription":taskDescription
        })

        await newTask.save()

        return res.status(200).json("Task added Successfully")

    } catch (error) {
        return res.status(500).json("Something went wrong")
    }
}