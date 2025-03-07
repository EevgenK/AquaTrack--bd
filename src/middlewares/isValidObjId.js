import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidObjId = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(createHttpError(400, 'Missing id in isValidObjId'));
  }

  if (!isValidObjectId(id)) {
    return next(createHttpError(400, 'Invalid id format'));
  }

  next();
};
