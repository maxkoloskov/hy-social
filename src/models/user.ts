import { Nullable } from '@/types';

export type Gender = 'M' | 'F';

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: Nullable<Gender>;
  birthdate: Nullable<string>;
  bio: Nullable<string>;
}

export interface UserCreateDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserLoginCredentialsDto {
  email: string;
  password: string;
}
