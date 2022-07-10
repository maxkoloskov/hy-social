import { Response, NextFunction } from 'express';
import { AccessTokenStoredData, RequestWithUserId } from '@/types';
import { AppHttpError, HttpStatusCode } from '@/common/errors';
import { verifyJwt } from '@/utils/jwt';

async function authMiddleware(req: RequestWithUserId, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization || '';
  const accessToken = authorizationHeader.replace(/^Bearer\s/, '');

  if (!accessToken) {
    return next(
      new AppHttpError({
        httpCode: HttpStatusCode.UNAUTHORIZED,
        message: 'Authentication token missing',
      }),
    );
  }

  const tokenData = verifyJwt<AccessTokenStoredData>(accessToken);
  if (!tokenData) {
    return next(
      new AppHttpError({
        httpCode: HttpStatusCode.UNAUTHORIZED,
        message: 'Wrong authentication token',
      }),
    );
  }

  req.userId = tokenData.userId;
  next();
}

export default authMiddleware;
