import Config from './utils/config';
import app from './app';
import { createServer, Server } from 'http';
import logger from './utils/logger';
import { Server as SocketServer } from 'socket.io';
import { setListeners } from './websockets/listeners';

const server: Server = createServer(app);
export const ioSocket = new SocketServer(server, { cors: { origin: true } });
setListeners(ioSocket);

try {
  server.listen(Config.PORT, (): void => {
    logger.info(`Connected successfully on port ${Config.PORT}`);
  });
} catch (error) {
  logger.error(`Error occurred ${(error as any).message}`);
}
