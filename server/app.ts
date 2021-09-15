import Config from './utils/config';
import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import logger from './utils/logger';

const app: Application = express();

mongoose
  .connect(Config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((err) => {
    logger.info('error connecting to MongoDB', err.message);
  });

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

export default app;
