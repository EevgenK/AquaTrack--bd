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
  '/daily',
  jsonParser,
  validateBody(waterPostSchema),
  ctrlWrapper(postWaterAmountCtrl),
);
router.put('/daily/:date', ctrlWrapper(updateWaterAmountCtrl));
router.delete('/daily/:date', ctrlWrapper(deleteWaterAmountCtrl));

router.get('/daily/:date', ctrlWrapper(getWaterDailyCtrl));
router.get('/monthly/:date', ctrlWrapper(getWaterMonthlyCtrl));

export default router;
