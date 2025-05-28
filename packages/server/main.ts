import "dotenv/config";
import express, { type Application } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router/index.ts";
import cors from "cors";

// created for each request
const createContext = ({
  req: Request,
  res: Response,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

class App {
  private app: Application;

  constructor() {
    // this.initialize();
    this.app = express();
    this.middlewares();
  }

  // private initialize(): void {}

  private middlewares() {
    this.app.use(cors());
    this.app.set("trust proxy", 1);
    this.app.disable("x-powered-by");
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      "/trpc",
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
