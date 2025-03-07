import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidObjId } from '../middlewares/isValidObjId.js';

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
router.put('/daily/:id', isValidObjId, ctrlWrapper(updateWaterAmountCtrl));

router.delete('/daily/:id', isValidObjId, ctrlWrapper(deleteWaterAmountCtrl));

router.get('/daily/:id', ctrlWrapper(getWaterDailyCtrl));
router.get('/monthly/:month', ctrlWrapper(getWaterMonthlyCtrl));

export default router;
