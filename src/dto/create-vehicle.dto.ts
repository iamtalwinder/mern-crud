import Joi from 'joi';

export const CreateVehicleDto = Joi.object().keys({
  year: Joi.number().integer().required().min(1900).max(new Date().getFullYear()),
  make: Joi.string().required().min(1),
  model: Joi.string().required().min(1),
});
