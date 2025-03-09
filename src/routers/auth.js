import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  updateCurrentDataSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  getCurrentDataController,
  getUsersCountController,
  requestResetEmailController,
  resetPasswordController,
  updateCurrentDataController,
  loadAvatarController,
} from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.get('/data', authenticate, ctrlWrapper(getCurrentDataController));

router.get('/count', ctrlWrapper(getUsersCountController));

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

router.patch(
  '/data',
  authenticate,
  validateBody(updateCurrentDataSchema),
  ctrlWrapper(updateCurrentDataController),
);
router.put(
  '/data-avatar-load',
  authenticate,
  upload.single('photo'),
  ctrlWrapper(loadAvatarController),
);

export default router;
