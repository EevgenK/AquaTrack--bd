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
