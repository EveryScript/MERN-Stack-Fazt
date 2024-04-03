import { Router } from "express";
import { pool } from "../db.js";
import { createTask, deleteTask, getTask, getTaskByUser, getTasks, updateTask } from "../controllers/task.controller.js";

const taskRouter = Router()
taskRouter.get('/api/tasks', getTasks)
taskRouter.get('/api/tasks/:id', getTask)
taskRouter.get('/api/tasks/user/:id', getTaskByUser)
taskRouter.post('/api/tasks', createTask)
taskRouter.put('/api/tasks/:id', updateTask)
taskRouter.delete('/api/tasks/:id', deleteTask)

export default taskRouter