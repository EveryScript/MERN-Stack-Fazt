import { Router } from "express"
import { createUser, deleteUser, getUser, getUsers, updateUser, signIn, uploadAvatar, updateStatus } from "../controllers/user.controllers.js";
import multer from "multer"; // https://github.com/expressjs/multer/blob/master/doc/README-es.md
const upload = multer({
    limits: { fileSize: 1000000 }, // 1MB
    fileFilter: (req, file, cb) => { // Middleware validation
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

const userRouter = Router();
userRouter.get('/users', getUsers)
userRouter.get('/user/:id', getUser)
userRouter.post('/user', createUser)
userRouter.put('/user/:id', updateUser)
userRouter.put('/status/:id', updateStatus)
userRouter.delete('/user/:id', deleteUser)

userRouter.post('/login', signIn)
userRouter.post('/avatar/:id', upload.single('avatar'), uploadAvatar)

export default userRouter;