import Joi from 'joi';
import {
  createCommonStringValidation,
  createGenderValidation,
  createNumberUnitValidation,
} from './validationCommonParams.js';

export const registerUserSchema = Joi.object({
  name: createCommonStringValidation('name', false, 'User'),
  email: Joi.string()
    .email()
    .required()
    .messages({ 'any.required': `(email) is required` }),
  password: Joi.string()
    .required()
    .messages({ 'any.required': `(password) is required` }),
  gender: createGenderValidation(),
  weight: createNumberUnitValidation('weight', 'kg', 0, 500, 65),
  dailySportTime: createNumberUnitValidation(
    'dailySportTime',
    'hours',
    0,
    24,
    0,
  ),
  dailyWaterNorm: createNumberUnitValidation(
    'dailyWaterNorm',
    'ml',
    500,
    15000,
    1500,
  ),
  avatar: Joi.string().messages({
    'string.base': `(avatar) should be a string`,
  }),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
