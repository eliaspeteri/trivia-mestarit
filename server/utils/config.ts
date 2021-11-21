import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: (process.env.PORT as string) || '8080',
  MONGODB_URI: process.env.MONGODB_URI as string
};
