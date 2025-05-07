import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import { errorHandler, notFoundHandler } from './middleware';
import { routes } from './routes';
import { logger } from './utils/logger';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
  }),
);
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(config.apiPrefix, routes);
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
