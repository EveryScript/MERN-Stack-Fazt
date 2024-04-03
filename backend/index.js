import Express from "express";
import { PORT } from "./config.js";
import { dirname, join } from 'path'    // Know __dirname
import { fileURLToPath } from "url";    // Know __dirname
import cors from 'cors';
import router from "./routes/index.routes.js";
import userRoutes from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";

const app = Express();
const __dirname = dirname(fileURLToPath(import.meta.url)) // Know "url" of file

app.use(cors());
app.use(Express.json());
app.use(router);
app.use(userRoutes);
app.use(taskRouter);
app.use(Express.static(join(__dirname, '../frontend/dist'))) // Load frontend
app.listen(PORT);
console.log(`Server is running on http://localhost:${PORT}`);