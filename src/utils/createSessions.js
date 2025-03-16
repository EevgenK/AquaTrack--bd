import { randomBytes } from 'crypto';
import { SessionsCollection } from '../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/index.js';

export const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
    sameSite: 'None',
    secure: true,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
    sameSite: 'None',
    secure: true,
  });
};

export const createSessionById = async (id) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return await SessionsCollection.create({
    userId: id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  });
};
