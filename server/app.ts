import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';

/** Controllers */
import questionsRouter from './routes/questions';
import userRouter from './routes/users';

/** Utils */
import Config from './utils/config';
import logger from './utils/logger';
import { requestLogger } from './utils/middleware';

const app: Application = express();

mongoose
  .connect(Config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err) => {
    logger.error('Failed to connect MongoDB, message: ', err.message);
  });

app.use(express.static('build'));

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(requestLogger);
app.use('/api/questions', questionsRouter);
app.use('/api/users', userRouter);

export default app;
