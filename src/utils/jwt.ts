import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export function signJwt<T extends object>(data: T, options?: jwt.SignOptions) {
  return jwt.sign(data, JWT_SECRET, options);
}

export function verifyJwt<T extends object>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}
