import { Nullable } from '@/types';

export type Gender = 'M' | 'F';

export interface Profile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: Nullable<Gender>;
  birthdate: Nullable<string>;
  bio: Nullable<string>;
}
