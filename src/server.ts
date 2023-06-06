/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { loggerError, loggerInfo } from './shared/logger';

process.on('uncaughtException', error => {
  loggerError.error(error);
  process.exit(1);
});

const uri = config.database_url as string;
// console.log(uri);
let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(uri);
    loggerInfo.info('🛢 database connection successful✨');

    server = app.listen(config.port, () => {
      loggerInfo.info(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    loggerError.error('Failed to connect Database');
  }

  process.on('unhandledRejection', error => {
    console.log('unhandledRejection is detected, we are closing our server');

    if (server) {
      server.close(() => {
        loggerError.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  loggerError.error('Sigterm is received');
  if (server) {
    server.close();
  }
});
