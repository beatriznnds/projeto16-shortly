import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import usersRouter from './routes/usersRouter.js';
import urlsRouter from './routes/urlsRouter.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(usersRouter);
app.use(urlsRouter);

const PORT = process.env.PORT;
app.listen(PORT);