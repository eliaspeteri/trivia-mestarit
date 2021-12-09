/** Components */
import app from './app';
import { socketController } from './controllers/socket';

/** 3rd dependencies */
import { createServer, Server } from 'http';
import { Server as SocketServer } from 'socket.io';

/** Utils */
import logger from './utils/logger';

import Config from './utils/config';

const server: Server = createServer(app);
export const ioSocket = new SocketServer(server, { cors: { origin: true } });
socketController(ioSocket);

try {
  server.listen(Config.PORT, (): void => {
    logger.info(`Connected successfully on port ${Config.PORT}`);
  });
} catch (error) {
  logger.error(`Error occurred ${(error as any).message}`);
}
