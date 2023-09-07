/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

const uri = config.database_url as string;
// console.log(uri);
let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(uri);
    console.log('🛢 database connection successful✨');

    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect Database');
  }

  // process.on('unhandledRejection', error => {
  //   console.log('unhandledRejection is detected, we are closing our server');

  //   if (server) {
  //     server.close(() => {
  //       console.log(error);
  //       process.exit(1);
  //     });
  //   } else {
  //     process.exit(1);
  //   }
  // });
}

bootstrap();

process.on('SIGTERM', () => {
  console.log('Sigterm is received');
  if (server) {
    server.close();
  }
});
