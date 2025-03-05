import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';

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

// ! перевірити де генерується юзер айді

router.post(
  '/',
  jsonParser,
  validateBody(waterPostSchema),
  ctrlWrapper(postWaterAmountCtrl),
);

router.delete('/:id', ctrlWrapper(deleteWaterAmountCtrl));
// router.delete('/:id', isValidId, ctrlWrapper(deleteContactCtrl));

router.get('/:id', ctrlWrapper(getWaterDailyCtrl));

export default router;
