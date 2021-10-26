import { VehicleModelInterface, VehicleModel } from '../models';
import { VehicleInterface } from '../interfaces';

export class VehicleService {
  constructor() {}

  public async createVehicle(
    dto: VehicleInterface
  ): Promise<VehicleModelInterface> {
    return VehicleModel.create(dto);
  }

  public async getVehicleById(
    id: string
  ): Promise<VehicleModelInterface | null> {
    return VehicleModel.findOne({ _id: id });
  }

  public async getAllVehicleOfOwner(
    owner: string
  ): Promise<VehicleModelInterface[]> {
    return VehicleModel.find({ owner });
  }

  public async updateVehicle(
    id: string,
    dto: VehicleInterface
  ): Promise<VehicleModelInterface | null> {
    return VehicleModel.findOneAndUpdate({ _id: id }, dto, {
      new: true,
    }).exec();
  }

  public async deleteVehicleById(
    id: string
  ): Promise<VehicleModelInterface | null> {
    return VehicleModel.findOneAndDelete({ _id: id });
  }

  public async isOwner(userId: string, vehicleId: string): Promise<boolean> {
    const vehicle: VehicleInterface | null = await VehicleModel.findOne({
      _id: vehicleId,
      owner: userId,
    });

    return !!vehicle;
  }
}

export const vehicleService: VehicleService = new VehicleService();
