import jwt from 'jsonwebtoken';
import { environment } from '../environment';
import { UserInterface } from '../interfaces';

export class JwtService {
  constructor() {}

  public generateJwt(user: UserInterface): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(
      { ...user },
      environment.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    );
    const refreshToken = jwt.sign(
      { ...user, refresh: true },
      environment.JWT_SECRET as string,
      {
        expiresIn: '30 days',
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}

export const jwtService: JwtService = new JwtService();
