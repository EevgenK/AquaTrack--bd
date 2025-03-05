import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    throw new Error('Missing userId in isValidId');
  }
  if (!isValidObjectId(userId)) {
    next(createHttpError(400, `"${userId}" is not valid id`));
  }

  next();
};
