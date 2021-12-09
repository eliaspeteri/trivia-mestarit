import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';

/** Controllers */
import questionController from './controllers/question';
import userController from './controllers/user';

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

app.use(express.static('../client/build'));

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(requestLogger);
app.use('/api/questions', questionController);
app.use('/api/users', userController);

export default app;
