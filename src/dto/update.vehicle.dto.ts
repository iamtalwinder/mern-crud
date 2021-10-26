import Joi from 'joi';

export const UpdateVehicleDto = Joi.object().keys({
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()),
  make: Joi.string().min(1),
  model: Joi.string().min(1),
});
