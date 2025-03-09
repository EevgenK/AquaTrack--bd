import Joi from 'joi';
import {
  createCommonStringValidation,
  createEnumValidation,
  createNumberValidation,
} from '../utils/validationCommonParams.js';

export const updateCurrentDataSchema = Joi.object({
  name: createCommonStringValidation('name', false, 3, 12),
  email: createCommonStringValidation('email', false, 3, 50),
  gender: createEnumValidation('gender'),
  weight: createNumberValidation('weight', false, 0, 500),
  dailySportTime: createNumberValidation('dailySportTime', false, 0, 24),
  dailyWaterNorm: createNumberValidation('dailyWaterNorm', false, 500, 15000),
});

export const loginUserSchema = Joi.object({
  email: createCommonStringValidation('email', 'required', 3, 50),
  password: createCommonStringValidation('password', 'required', 3, 50),
});
export const requestResetEmailSchema = Joi.object({
  email: createCommonStringValidation('email', 'required', 3, 50),
});

export const resetPasswordSchema = Joi.object({
  password: createCommonStringValidation('password', 'required', 3, 50),
  token: Joi.string().required(),
});

export const registerUserSchema = Joi.object({
  email: createCommonStringValidation('email', 'required', 3, 50),
  password: createCommonStringValidation('password', 'required', 3, 50),
});

export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});
