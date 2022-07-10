import express, { Router } from 'express';
import { handleErrorMiddleware, handle404Middleware } from '@/middlewares/error-handle';
import db from '@/db';
import authController from '@/controllers/auth';
import { AppController } from '@/types';

const APP_PORT = process.env.APP_PORT || 3000;

class App {
  private app: express.Application = express();

  constructor() {
    this.initDb();
    this.initCommonMiddlewares();
    this.initControllers([authController]);
    this.initErrorHandling();
  }

  public listen() {
    return this.app.listen(APP_PORT, () => {
      console.log(`App started at http://localhost:${APP_PORT}`);
    });
  }

  private initCommonMiddlewares() {
    this.app.use(express.json());
  }

  private initErrorHandling() {
    this.app.use('*', handle404Middleware);
    this.app.use(handleErrorMiddleware);
  }

  private initControllers(controllers: AppController[]) {
    const apiRouter = Router();
    controllers.forEach((controller) => {
      apiRouter.use(controller.path, controller.router);
    });
    this.app.use('/api', apiRouter);
  }

  private initDb() {
    db.initDb();
  }
}

export default App;
