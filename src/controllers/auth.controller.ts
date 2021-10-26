import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { UserModelInterface } from '../models';
import { userService, jwtService } from '../services';

export class AuthController {
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const isEmailTaken: boolean = !!(await userService.getUserByEmail(email));

      if (isEmailTaken) {
        res.status(400).send({ message: 'Email already taken' });
        return;
      }

      const createdUser: UserModelInterface = await userService.createUser({
        name,
        email,
        password: bcrypt.hashSync(password, 8),
      });

      res.status(201).send({
        user: createdUser,
        tokens: jwtService.generateJwt(createdUser),
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal Server error' });
    }
  }

  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result: any = await new Promise((resolve, reject) => {
        passport.authenticate('user-local-login', async (error, user) => {
          if (error) {
            resolve({ success: false, error: error });
          } else {
            delete user.password;
            resolve({ success: true, user: user });
          }
        })(req, res, next);
      });

      if (!result.success) {
        res.status(400).send(result);
        return;
      }

      res.status(200).send({
        user: result.user,
        tokens: jwtService.generateJwt(result.user),
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal Server error' });
    }
  }
}
