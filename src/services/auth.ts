import { CreateUserDto, LoginUserCredentialsDto } from '@/models/user';
import usersRepository from '@/repositories/users';
import { AccessTokenStoredData } from '@/types';
import { signJwt } from '@/utils/jwt';
import { hashPassword } from '@/utils/password-hash';
import { compare } from 'bcrypt';

class AuthService {
  async register(userData: CreateUserDto) {
    const user = await usersRepository.findByEmail(userData.email);

    if (user) {
      throw new Error('User with this email already exists');
    }

    const passwordHash = await hashPassword(userData.password);

    const newUserId = await usersRepository.create({
      ...userData,
      password: passwordHash,
    });

    const accessToken = this.generateAccessToken(newUserId);

    return {
      accessToken,
    };
  }

  async login(userData: LoginUserCredentialsDto) {
    const user = await usersRepository.findByEmail(userData.email);

    if (!user) {
      throw new Error('Wrong credentials');
    }

    const isPasswordMatched = await compare(userData.password, user.password);

    if (!isPasswordMatched) {
      throw new Error('Wrong credentials');
    }

    const accessToken = this.generateAccessToken(user.id);

    return {
      accessToken,
    };
  }

  private generateAccessToken(userId: number) {
    return signJwt<AccessTokenStoredData>({ userId }, { expiresIn: '1m' });
  }
}

const authService = new AuthService();

export default authService;
