import createHttpError from 'http-errors';
export const notFoundHandler = () => {
  throw createHttpError(404, 'Route not found');
};
