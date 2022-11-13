import { AppHttpError, HttpStatusCode } from '@/common/errors';
import authMiddleware from '@/middlewares/auth';
import { profilesService } from '@/services/profiles';
import { AppController, RequestWithUserId } from '@/types';
import { Router, Request, Response, NextFunction } from 'express';

class ProfilesController implements AppController {
  router: Router = Router();
  path = '/profiles';

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/current', authMiddleware, this.getCurrentUserProfile);
    this.router.get('/:id(\\d+)', authMiddleware, this.getProfileById);
    this.router.get('/search', authMiddleware, /* TODO: validationMiddleware, */ this.search);
  }

  private async getCurrentUserProfile(req: RequestWithUserId, res: Response, next: NextFunction) {
    const userId = req.userId;

    if (!userId) {
      next(
        new AppHttpError({
          httpCode: HttpStatusCode.UNAUTHORIZED,
          message: 'Unauthorized',
        }),
      );
      return;
    }

    const profile = await profilesService.getById(userId);

    if (!profile) {
      next(
        new AppHttpError({
          httpCode: HttpStatusCode.NOT_FOUND,
          message: 'Profile by specified user_id not found',
        }),
      );
      return;
    }

    res.json(profile);
  }

  private async getProfileById(req: RequestWithUserId, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    if (!id) {
      next(
        new AppHttpError({
          httpCode: HttpStatusCode.BAD_REQUEST,
          message: `Invalid id: ${req.params.id}`,
        }),
      );
      return;
    }

    const profile = await profilesService.getById(id);

    if (!profile) {
      next(
        new AppHttpError({
          httpCode: HttpStatusCode.NOT_FOUND,
          message: 'Profile not found',
        }),
      );
      return;
    }

    res.json(profile);
  }

  // TODO: validate request fields
  private async search(req: RequestWithUserId, res: Response) {
    const userId = req.userId;
    const params = req.query;

    const profiles = await profilesService.searchByAnthroponym({
      anthroponym: String(params.anthroponym),
      excludeUserId: userId,
      limit: Number(params.limit) || 0,
      offset: Number(params.offset) || 0,
    });

    res.json(profiles);
  }
}

const profilesController = new ProfilesController();
export { profilesController };
