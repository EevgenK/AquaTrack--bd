import createHttpError from 'http-errors';
import moment from 'moment';

export const isValidDate = (dateFormat) => (req, res, next) => {
  const { date, month } = req.params;

  if (!moment(date || month, dateFormat, true).isValid()) {
    throw createHttpError(400, `Invalid date format. Expected: ${dateFormat}`);
  }
  next();
};
