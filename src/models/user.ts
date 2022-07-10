export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginUserCredentialsDto {
  email: string;
  password: string;
}
