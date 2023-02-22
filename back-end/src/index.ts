import express from 'express';
import 'dotenv/config';
import 'reflect-metadata';
import { AppDataSource } from './lib/dataSource';
import router from './router';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import { handlerError } from './lib/error-handling';
import { RabbitMQ } from './utils/rabbitmq';
import cors from 'cors';

const bootstrap = async () => {
  const app = express();

  app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    })
  );
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(methodOverride());

  app.use(String(process.env.PREFIX), router);

  app.use(handlerError);

  const PORT = process.env.PORT || 3000;

  await RabbitMQ.getInstance().connect();

  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

bootstrap();
