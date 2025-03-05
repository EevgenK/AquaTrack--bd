import Joi from 'joi';
import { createGenderValidation } from './validationCommonParams.js';
export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(12),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  gender: createGenderValidation(),
});
