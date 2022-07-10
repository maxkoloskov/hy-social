import { ErrorRequestHandler, RequestHandler } from 'express';
import { AppHttpError, HttpStatusCode } from '@/common/errors';

export const handleErrorMiddleware: ErrorRequestHandler = (err: Error | AppHttpError, _req, res, _next) => {
  if (err instanceof AppHttpError) {
    res.status(err.httpCode).json({ message: err.message });
    return;
  }
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
};

export const handle404Middleware: RequestHandler = (_req, res) => {
  res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Not Found' });
};

export default handleErrorMiddleware;
