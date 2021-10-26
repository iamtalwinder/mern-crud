import mongoose, { Document, Model } from 'mongoose';
import { UserInterface } from '../interfaces';
import { UserSchemaName, UserSchema } from '../schemas';

export interface UserModelInterface extends UserInterface, Document {}

export const UserModel: Model<UserInterface> = mongoose.model(
  UserSchemaName,
  UserSchema
)
