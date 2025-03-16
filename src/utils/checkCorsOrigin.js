import { ORIGINSALLOWED } from '../constants/index.js';

export const checkCorsOrigin = (origin, callback) => {
  console.log('INCOMING ORIGIN:', origin);
  const isAllowed = !origin || ORIGINSALLOWED.includes(origin);
  callback(isAllowed ? null : new Error('Not allowed by CORS'), isAllowed);
};
