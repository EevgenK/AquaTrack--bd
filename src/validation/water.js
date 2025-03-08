import Joi from 'joi';

import { createNumberValidation } from '../utils/validationCommonParams.js';
import { dateRegEx } from './validationRegEx.js';

export const waterPostSchema = Joi.object({
  date: Joi.string().pattern(dateRegEx).required().messages({
    'string.base': `date value should be a string`,
    'string.pattern.base': `date should be in follow format {#pattern}`,
    'any.required': '(date) is required',
  }),
  value: createNumberValidation('value', 'required', 50, 5000).required(),
});

export const waterPutSchema = waterPostSchema;
