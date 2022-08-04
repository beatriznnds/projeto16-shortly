import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import authRouter from './routes/authRouter.js';
import urlsRouter from './routes/urlsRouter.js';
import userRouter from './routes/userRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(urlsRouter);
app.use(userRouter);

const PORT = process.env.PORT;
app.listen(PORT);