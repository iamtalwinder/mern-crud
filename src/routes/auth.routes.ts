import express, { Router } from 'express';
import { AuthController } from '../controllers';
import { ValidationMiddleware } from '../middlewares';
import { CreateUserDto, LoginDto } from '../dto';

const authRouter: Router = express.Router();

authRouter.post(
  '/register',
  ValidationMiddleware.validateBody(CreateUserDto),
  AuthController.register
);

authRouter.post(
  '/login',
  ValidationMiddleware.validateBody(LoginDto),
  AuthController.login
);

export default authRouter;
