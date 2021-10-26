import Joi from 'joi';

export const CreateUserDto = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required().messages({
    'string.empty': 'email: Email is required.',
    'string.email': 'email: Invalid email',
  }),
  password: Joi.string().required().min(6).messages({
    'string.empty': 'password: Password is required.',
  }),
});
