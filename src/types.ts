import { Request, Router } from 'express';

export interface AccessTokenStoredData {
  userId: number;
}

export interface RequestWithUserId extends Request {
  userId?: number;
}

export interface AppController {
  path: string;
  router: Router;
}
