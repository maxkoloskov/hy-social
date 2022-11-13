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

export type Nullable<V> = V | null;

export interface PaginationOpts {
  limit?: number;
  offset?: number;
}

export interface Items<T> {
  items: T[];
  count: number;
}
