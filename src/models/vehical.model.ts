import mongoose, { Document, Model } from 'mongoose';
import { VehicleInterface } from '../interfaces';
import { VehicleSchemaName, VehicleSchema } from '../schemas';

export interface VehicleModelInterface extends VehicleInterface, Document {}

export const VehicleModel: Model<VehicleModelInterface> = mongoose.model(
  VehicleSchemaName,
  VehicleSchema
);
