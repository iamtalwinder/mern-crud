import bcrypt from 'bcryptjs';
import { VerifyFunction } from 'passport-local';
import { UserModelInterface } from '../models';
import { userService } from './user.service';

export class AuthService {
  constructor() {}

  public async loginLocalStrategy(
    email: string,
    password: string,
    done: VerifyFunction
  ) {
    try {
      const user: UserModelInterface | null = await userService.getUserByEmail(
        email
      );

      if (!user) {
        done(
          { message: 'Username or password is invalid' } as any,
          null as any,
          null as any
        );
        return;
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        done(
          { message: 'Username or password is invalid' } as any,
          null as any,
          null as any
        );
        return;
      }

      done(null as any, user as any, null as any);
    } catch (error: any) {
      done(error as any, null as any, null as any);
    }
  }
}

export const authService: AuthService = new AuthService();
