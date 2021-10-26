import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { NextFunction, Request, Response } from 'express';
import { authService } from '../services';
import { environment } from '../environment';
import { VerifyCallback } from 'jsonwebtoken';

passport.use(
  'user-local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    } as any,
    authService.loginLocalStrategy as any
  )
);

passport.use(
  'user-jwt',
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.JWT_SECRET,
    },
    async (payload: any, done: VerifyCallback) => {
      try {
        return done(null, payload);
      } catch (error: any) {
        return done(error, payload);
      }
    }
  )
);

export class AuthMiddleware {
  public static async authorize(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return passport.authenticate(
      'user-jwt',
      {
        session: false,
      },
      (error, user, info) => {
        console
        if (error || !user) {
          return res.status(401).send({
            success: false,
            message: 'Unauthorized access',
            data: {},
            err: info ? info.name : info,
          });
        }

        req.userId = user._doc._id;

        next();
      }
    )(req, res, next);
  }
}
