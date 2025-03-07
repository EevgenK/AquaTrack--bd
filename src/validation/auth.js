import Joi from 'joi';
import {
  createCommonStringValidation,
  createEnumValidation,
  createNumberValidation,
} from '../utils/validationCommonParams.js';

export const registerUserSchema = Joi.object({
  name: createCommonStringValidation('name', false, 3, 12),
  email: createCommonStringValidation('email', 'required', 3, 50),
  password: createCommonStringValidation('password', 'required', 3, 50),
  gender: createEnumValidation('gender'),

  weight: createNumberValidation('weight', 0, 500),
  dailySportTime: createNumberValidation('dailySportTime', 0, 24),
  dailyWaterNorm: createNumberValidation('dailyWaterNorm', 500, 15000),
  avatar: Joi.string().messages({
    'string.base': `(avatar) should be a string`,
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
