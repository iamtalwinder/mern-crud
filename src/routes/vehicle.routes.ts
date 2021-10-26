import express, { Router } from 'express';
import { VehicleController } from '../controllers';
import {
  ValidationMiddleware,
  AuthMiddleware,
  AccessControllerMiddleware,
} from '../middlewares';
import { CreateVehicleDto, UpdateVehicleDto } from '../dto';

const vehicleRouter: Router = express.Router();

vehicleRouter.post(
  '/',
  AuthMiddleware.authorize,
  ValidationMiddleware.validateBody(CreateVehicleDto),
  VehicleController.createVehicle
);

vehicleRouter.get(
  '/',
  AuthMiddleware.authorize,
  VehicleController.getAllVehicles
);

vehicleRouter.patch(
  '/:vehicleId',
  AuthMiddleware.authorize,
  AccessControllerMiddleware.checkVehicleOwner,
  ValidationMiddleware.validateBody(UpdateVehicleDto),
  VehicleController.updateVehicle
);

vehicleRouter.delete(
  '/:vehicleId',
  AuthMiddleware.authorize,
  AccessControllerMiddleware.checkVehicleOwner,
  VehicleController.deleteVehicle
);

export default vehicleRouter;
