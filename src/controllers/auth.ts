import { AppHttpError, HttpStatusCode } from '@/common/errors';
import authMiddleware from '@/middlewares/auth';
import { UserCreateDto, UserLoginCredentialsDto } from '@/models/user';
import authService from '@/services/auth';
import { AppController, RequestWithUserId } from '@/types';
import { Router, Request, Response, NextFunction } from 'express';

class AuthController implements AppController {
  router: Router = Router();
  path = '/auth';

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/register', /* TODO: validationMiddleware, */ this.register);
    this.router.post('/login', /* TODO: validationMiddleware, */ this.login);
    this.router.get('/secret', authMiddleware, this.secret);
  }

  private async secret(req: RequestWithUserId, res: Response) {
    res.json(`Hello, user#${req.userId}`);
  }

  private async register(req: Request, res: Response, next: NextFunction) {
    const createUserDto = req.body as UserCreateDto;
    try {
      const { accessToken } = await authService.register(createUserDto);
      return res.json({ accessToken });
    } catch (error) {
      next(
        new AppHttpError({
          httpCode: HttpStatusCode.BAD_REQUEST,
          message: (error as Error).message,
        }),
      );
      return;
    }
  }

  private async login(req: Request, res: Response, next: NextFunction) {
    const credentials = req.body as UserLoginCredentialsDto;
    try {
      const { accessToken } = await authService.login(credentials);
      return res.json({ accessToken });
    } catch (error) {
      next(
        new AppHttpError({
          httpCode: HttpStatusCode.BAD_REQUEST,
          message: (error as Error).message,
        }),
      );
      return;
    }
  }
}

const authController = new AuthController();
export { authController };
