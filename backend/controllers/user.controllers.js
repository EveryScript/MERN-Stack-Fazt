import { pool } from "../db.js"
import { encryptPassword, verifyPassword } from "../functions/functions.js";
import validator from "validator"; // https://www.npmjs.com/package/validatorS
import multer from "multer"; // https://github.com/expressjs/multer/blob/master/doc/README-es.md
import sharp from "sharp"; // https://www.npmjs.com/package/sharp

// Get all users
export const getUsers = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.status(200).json(result);
}

// Get one user
export const getUser = async (req, res) => {
    const [result] = await pool.query('SELECT name, lastname, email, password FROM users WHERE id = ?', [req.params.id]);
    if (result.length == 0)
        res.status(404).json({ message: 'This user is not exist' });
    else
        res.status(200).json(result[0]);
}

// Create one user
export const createUser = async (req, res) => {
    const { name, lastname, email, password } = req.body;
    if (validator.isAlpha(name) && validator.isAlpha(lastname) && validator.isEmail(email) && validator.isAlphanumeric(password)) {
        const [result] = await pool.query(
            "INSERT INTO users (name, lastname, email, password) VALUES (?,?,?,?)",
            [name, lastname, email, encryptPassword(password)]);
        res.status(200).json({
            message: 'User created succesfully',
            user: result.insertId
        });
    } else {
        res.status(500).json({ message: 'Some data is invalid!' })
    }
}

// Update a user
export const updateUser = async (req, res) => {
    const { name, lastname, email, password } = req.body;
    if (validator.isAlpha(name) && validator.isAlpha(lastname) && validator.isEmail(email) && validator.isAlphanumeric(password)) {
        req.body.password = encryptPassword(req.body.password);
        const result = await pool.query(
            "UPDATE users SET ? WHERE id = ?",
            [req.body, req.params.id]
        );

        if (result.affectedRows === 0)
            res.status(404).json({ message: "Error in the update users" })
        else
            res.status(200).json(result)
    } else {
        res.status(500).json({ message: 'Some data is invalid!' })
    }
}

// Delete one user
export const deleteUser = async (req, res) => {
    const [result] = await pool.query(
        "DELETE FROM users WHERE id = ?", [req.params.id]
    )
    if (result.affectedRows === 0)
        res.status(404).json('No user found to delete');
    else
        res.sendStatus(200);
}

// Login user
export const signIn = async (req, res) => {
    const { email, password } = req.body;
    const [result] = await pool.query('SELECT email, password FROM users WHERE email = ?', [email]);
    if (result.length == 0) {
        res.status(404).json({ message: 'This user is not exist' });
    } else {
        if (verifyPassword(password, result[0].password)) {
            res.status(200).json({ message: 'Welcome!' });
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    }

}

// Upload a image
export const uploadAvatar = async (req, res) => {
    try {
        await sharp(req.file.buffer).toFile('./backend/avatars/' + req.file.originalname)
        const result = await pool.query(
            "UPDATE users SET avatar = ? WHERE id = ?",
            [req.file.originalname, req.params.id]
        );
        res.status(201).json({ message: 'Avatar uploaded done!' })
    } catch (error) {
        res.status(400).json({ message: 'ERROR: ' + error })
    }
}

// Toogle Status
export const updateStatus = async (req, res) => {
    const { status } = req.body;
    const result = await pool.query(
        "UPDATE users SET ? WHERE id = ?",
        [req.body, req.params.id]
    );

    if (result.affectedRows === 0)
        res.status(404).json({ message: "Error in the update users" })
    else
        res.status(200).json(result)
}