import { Request, Response } from 'express';
import { VehicleModelInterface } from '../models';
import { vehicleService } from '../services';

export class VehicleController {
  public static async createVehicle(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const vehicle: VehicleModelInterface = await vehicleService.createVehicle(
        {
          ...req.body,
          owner: req.userId,
        }
      );

      res.status(201).send(vehicle);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal Server error' });
    }
  }

  public static async getAllVehicles(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const vehicles: VehicleModelInterface[] =
        await vehicleService.getAllVehicleOfOwner(req.userId);

      res.status(200).send(vehicles);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal Server error' });
    }
  }

  public static async updateVehicle(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const vehicleId: string = req.params.vehicleId;
      const updatedVehicle: VehicleModelInterface | null =
        await vehicleService.updateVehicle(vehicleId, req.body);

      res.status(200).send(updatedVehicle);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal Server error' });
    }
  }

  public static async deleteVehicle(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const vehicleId: string = req.params.vehicleId;

      const deletedVehicle: VehicleModelInterface | null =
        await vehicleService.deleteVehicleById(vehicleId);

      res.status(200).send(deletedVehicle);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal Server error' });
    }
  }
}
