import Joi from 'joi';

export const waterPostSchema = Joi.object({
  date: Joi.string().required().messages({
    'string.base': '(date) should be a string',
    'any.required': '(date) is required',
  }),
  value: Joi.number().min(50).max(5000).required().messages({
    'number.base': '(value) should be a number',
    'number.min': '(value) cannot be less than 50',
    'number.max': '(value) cannot be more than 5000',
    'any.required': '(value) is required',
  }),
});
