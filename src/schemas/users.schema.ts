import { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export const UserSchemaName = 'user';

export const UserSchema: Schema = new Schema({
  _id: { type: String, default: uuid },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
