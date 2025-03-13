import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidObjId } from '../middlewares/isValidObjId.js';

import { waterPostSchema, waterPutSchema } from '../validation/water.js';

import {
  postWaterAmountCtrl,
  updateWaterAmountCtrl,
  deleteWaterAmountCtrl,
  getWaterDailyCtrl,
  getWaterMonthlyCtrl,
} from '../controllers/water.js';
import { isValidDate } from '../middlewares/isValidDate.js';

const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);

router.post(
  '/',
  jsonParser,
  validateBody(waterPostSchema),
  ctrlWrapper(postWaterAmountCtrl),
);
router.put(
  '/:id',
  isValidObjId,
  jsonParser,
  validateBody(waterPutSchema),
  ctrlWrapper(updateWaterAmountCtrl),
);
router.delete('/:id', isValidObjId, ctrlWrapper(deleteWaterAmountCtrl));

router.get(
  '/daily/:date',
  isValidDate('YYYY-MM-DD'),
  ctrlWrapper(getWaterDailyCtrl),
);
router.get(
  '/monthly/:month',
  isValidDate('YYYY-MM'),
  ctrlWrapper(getWaterMonthlyCtrl),
);

export default router;
