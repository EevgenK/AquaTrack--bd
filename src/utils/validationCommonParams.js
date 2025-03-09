import Joi from 'joi';

/*MAKES JOY VALIDATION FOR elements required/not required with min:3, max:12, */
export const createCommonStringValidation = (
  element,
  required,
  minValue = 0,
  maxValue = 0,
) => {
  let validation = Joi.string()
    .min(minValue)
    .max(maxValue)
    .messages({
      'string.base': `${element} value should be a string`,
      'string.min': `${element} should have at least {#limit} characters`,
      'string.max': `${element} should have not more than {#limit} characters`,
    });
  if (required) {
    validation = validation.required().messages({
      'any.required': `${element} is required`,
    });
  }
  return validation;
};
/*MAKES JOY VALIDATION FOR elements type:number which are тще required & and have min, max values */
export const createNumberValidation = (
  element,
  required,
  minValue,
  maxValue,
) => {
  let validation = Joi.number()
    .min(minValue)
    .max(maxValue)
    .messages({
      'number.base': `${element} value should be a number`,
      'number.min': `${element} value cannot be less than {#limit}`,
      'number.max': `${element} value cannot be more than {#limit}`,
    });
  if (required) {
    validation = validation.required().messages({
      'any.required': `${element} is required`,
    });
  }
  return validation;
};
/*MAKES JOY VALIDATION FOR elements which "enum" inside */
export const createEnumValidation = (el) =>
  Joi.string()
    .valid('woman', 'man')
    .messages({
      'string.base': `${el} should be a string`,
      'any.only': `${el} should be either 'woman' or 'man'`,
    });
