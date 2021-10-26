import { UserModelInterface, UserModel } from '../models';
import { UserInterface } from '../interfaces';

export class UserService {
  constructor() {}

  public async createUser(dto: UserInterface): Promise<UserModelInterface> {
    return UserModel.create(dto);
  }

  public async getUserByEmail(email: string): Promise<UserModelInterface | null> {
    return UserModel.findOne({ email });
  }

}

export const userService: UserService = new UserService();
