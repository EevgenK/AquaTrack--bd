import {
  getCurrentData,
  getUsersCount,
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
  resetPassword,
  requestResetToken,
  updateData,
  loginOrSignupWithGoogle,
} from '../services/auth.js';
import { setupSession } from '../utils/createSessions.js';
import { generateAuthUrl } from '../utils/googleOAuthClient.js';
import { getFileUrlByFeatureFlag } from '../utils/getFileUrlByFeatureFlag.js';

export const registerUserController = async (req, res, next) => {
  const user = await registerUser(req.body);
  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  setupSession(res, session);
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  setupSession(res, session);
  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const getCurrentDataController = async (req, res, next) => {
  const currentData = await getCurrentData(req.user._id);

  res.json({
    status: 200,
    message: "Successfully recieved user's current data",
    data: currentData,
  });
};

export const getUsersCountController = async (req, res, next) => {
  const totalCount = await getUsersCount();

  res.json({
    status: 200,
    message: 'Successfully get count of all users',
    data: totalCount,
  });
};
export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};

export const updateCurrentDataController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const result = await updateData(userId, req.body);

  res.json({
    status: 200,
    message: `Successfully updated user's data!`,
    data: result.data,
  });
};

export const loadAvatarController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const avatar = req.file;

  const avatarUrl = await getFileUrlByFeatureFlag(avatar, 'ENABLE_CLOUDINARY');
  const result = await updateData(userId, { avatar: avatarUrl });
  res.json({
    status: 200,
    message: `Successfully updated user's avatar!`,
    data: result.data.avatar,
  });
};

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);
  if (!session) throw new Error('Session creation failed');
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
