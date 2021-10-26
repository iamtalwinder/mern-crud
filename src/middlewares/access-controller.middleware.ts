import { Request, Response, NextFunction } from 'express';
import { vehicleService } from '../services';

export class AccessControllerMiddleware {
  public static async checkVehicleOwner(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId: string = req.userId;
    const vehicleId: string = req.params.vehicleId;

    const isOwner: boolean = await vehicleService.isOwner(userId, vehicleId);

    if (!isOwner) {
      res.status(400).send({ message: "You don't own this vehicle" });
      return;
    }

    next();
  }
}
