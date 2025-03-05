import Joi from 'joi';
export const validationParams = {
  min: 3,
  max: 12,
  gender: ['woman', 'man'],
  stringTypeMessageGenerator(el) {
    return {
      'string.base': `(${el}) should be a string`,
      'string.min': `(${el}) should have at least {#limit} characters`,
      'string.max': `(${el}) should have not more than {#limit} characters`,
    };
  },
  makeStringWithSymbol(el, symbol) {
    return this[el].map((type) => `'${type}'`).join(` ${symbol} `);
  },
};
/*MAKES JOY VALIDATION FOR elements required/not required with min:3, max:12, defaultValue*/
export const createCommonStringValidation = (
  element,
  required,
  defaultValue,
) => {
  let validation = Joi.string()
    .min(validationParams.min)
    .max(validationParams.max)
    .messages(validationParams.stringTypeMessageGenerator(element));
  if (defaultValue) {
    validation = validation.default(defaultValue);
  }
  if (required) {
    validation = validation.required().messages({
      ...validationParams.stringTypeMessageGenerator(element),
      'any.required': `(${element}) is required`,
    });
  }
  return validation;
};
/*MAKES JOY VALIDATION FOR elements which are objects with "value"&"unit"&min, max, default inside */
export const createNumberUnitValidation = (
  element,
  unit,
  minValue,
  maxValue,
  defaultValue,
) => {
  return Joi.object({
    value: Joi.number()
      .min(minValue)
      .max(maxValue)
      .default(defaultValue)
      .messages({
        'number.base': `${element} value should be a number`,
        'number.min': `${element} value cannot be negative`,
        'number.max': `${element} value cannot be more than ${maxValue}`,
      }),
    unit: Joi.string()
      .valid(unit)
      .default(unit)
      .messages({
        'string.base': `${element} unit should be a string`,
        'any.only': `${element} unit must be (${unit})`,
      }),
  });
};
/*MAKES JOY VALIDATION FOR elements which "enum" inside and min:3, max:12*/
export const createGenderValidation = () =>
  Joi.string()
    .min(validationParams.min)
    .max(validationParams.max)
    .valid(...validationParams.gender)
    .messages({
      ...validationParams.stringTypeMessageGenerator('contactType'),
      'any.only': `(contactType) should be one of the following: ${validationParams.makeStringWithSymbol(
        'gender',
        'or',
      )}`,
    });
