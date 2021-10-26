import { Schema } from 'mongoose';
import { UserSchemaName } from './users.schema';
import { v4 as uuid } from 'uuid';

export const VehicleSchemaName = 'vehicle';

export const VehicleSchema: Schema = new Schema({
  _id: { type: String, default: uuid },
  year: { type: Number, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  owner: { type: String, ref: UserSchemaName },
});


