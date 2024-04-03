import { pool } from "../db.js"
import validator from "validator";
// Get all tasks
export const getTasks = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM tasks');
    res.status(200).json(result);
}
// Get task by id
export const getTask = async (req, res) => {
    const idTask = req.params.id
    const [result] = await pool.query('SELECT * FROM tasks WHERE id = ' + idTask)
    res.status(200).json(result)
}
// Get task by user id
export const getTaskByUser = async (req, res) => {
    const idUser = req.params.id
    const [result] = await pool.query('SELECT * FROM tasks WHERE user_id = ' + idUser)
    res.status(200).json(result)
}
// Create new task
export const createTask = async (req, res) => {
    const { title, task, userId } = req.body
    if (title && task && validator.isNumeric(userId)) {
        const [result] = await pool.query(
            "INSERT INTO tasks (title, task, user_id) VALUES (?,?,?)",
            [title, task, userId]);
        res.status(200).json({
            message: 'Task created succesfully',
            task: result.insertId
        });
    } else {
        res.status(500).json({ message: 'Some data to create task is invalid' })
    }
}
// Update a task by one user
export const updateTask = async (req, res) => {
    const { title, task, userId } = req.body
    const taskId = req.params.id
    if (title && task && validator.isNumeric(userId) && taskId) {
        const [result] = await pool.query('UPDATE tasks SET title = ?, task = ?, user_id = ? WHERE id = ' + taskId,
            [title, task, userId])
        if (result.affectedRows === 0) {
            res.status(500).json({ message: 'Error on update task' })
        } else {
            res.status(200).json({ message: 'Task updated succesfully' })
        }
    } else {
        res.status(500).json({ message: 'Some data is invalid to update task' })
    }
}
// Delete task
export const deleteTask = async (req, res) => {
    const taskId = req.params.id
    if (validator.isNumeric(taskId)) {
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ' + taskId)
        if (result.affectedRows === 0) {
            res.status(500).json({ message: 'Error on delete task' })
        } else {
            res.status(200).json({ message: 'Task deleted succesfully' })
        }
    } else {
        res.status(500).json({ message: 'Some data is invalid to delete task' })
    }
}