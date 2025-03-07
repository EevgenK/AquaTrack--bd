import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

import { waterPostSchema } from '../validation/water.js';

import {
  postWaterAmountCtrl,
  updateWaterAmountCtrl,
  deleteWaterAmountCtrl,
  getWaterDailyCtrl,
  getWaterMonthlyCtrl,
} from '../controllers/water.js';

const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);

router.post(
  '/',
  jsonParser,
  validateBody(waterPostSchema),
  ctrlWrapper(postWaterAmountCtrl),
);

router.delete('/:id', ctrlWrapper(deleteWaterAmountCtrl));

router.get('/:id', ctrlWrapper(getWaterDailyCtrl));

export default router;
