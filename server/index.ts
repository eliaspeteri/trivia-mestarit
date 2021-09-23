import Config from './utils/config';
import app from './app';
import { createServer, Server } from 'http';
import logger from './utils/logger';

// Importing question router
import questionsRouter from './routes/questions';
// Importing user router
import userRouter from './routes/users';

const server: Server = createServer(app);

// endpoint to test connection
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.header('Access-Control-Allow-Origin', '*');
  res.send('pong');
});

// Router endpoint to fetch questions
app.use('/api/questions', questionsRouter);
// Router endpoint to fetch users
app.use('/api/users', userRouter);
try {
  server.listen(Config.PORT, (): void => {
    logger.info(`Connected successfully on port ${Config.PORT}`);
  });
} catch (error) {
  logger.error(`Error occurred ${(error as any).message}`);
}
