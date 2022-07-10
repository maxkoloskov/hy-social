import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
