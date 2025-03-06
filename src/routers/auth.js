import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginWithGoogleOAuthSchema,
  registerUserSchema,
} from '../validation/auth.js';
import {
  getGoogleOAuthUrlController,
  loginWithGoogleController,
  registerUserController,
} from '../controllers/auth.js';
const router = Router();
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

router.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default router;
