import Config from './utils/config';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import logger from './utils/logger';
import { requestLogger } from './utils/middleware';

import questionsRouter from './routes/questions';
import userRouter from './routes/users';

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

// Root endpoint
app.get('/', async (_req: Request, res: Response): Promise<void> => {
  logger.info('someone pinged /');
  res.json({ message: 'root endpoint' });
});

// API endpoint
app.get('/api', async (_req: Request, res: Response): Promise<void> => {
  logger.info('someone pinged /api');
  res.json({ message: 'api endpoint' });
});

// Endpoint to test connection
app.get('/api/ping', async (_req: Request, res: Response): Promise<void> => {
  logger.info('someone pinged /api/ping');
  res.json({ message: 'pong' });
});

app.use('/api/questions', questionsRouter);
app.use('/api/users', userRouter);

export default app;
