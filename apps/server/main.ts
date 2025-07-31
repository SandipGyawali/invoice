import 'dotenv/config';
import express, { type Application } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './router/index.ts';
import cors from 'cors';
import { connectDb } from './db/db.ts';
import { createContext } from './lib/context.ts';

class App {
  private app: Application;

  constructor() {
    // this.initialize();
    this.app = express();
    this.middlewares();
  }

  // private initialize(): void {}

  private async middlewares() {
    this.app.use(cors());
    this.app.set('trust proxy', 1);
    this.app.disable('x-powered-by');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    connectDb();
    this.app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
      })
    );
  }

  listen() {
    const PORT: number = 8000;
    this.app.listen(PORT, () => {
      console.log(`Application Listening to port: ${PORT}`);
    });
  }
}

const app = new App();
app.listen();
