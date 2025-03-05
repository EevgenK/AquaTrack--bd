import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';

import {
  postWaterAmountCtrl,
  updateWaterAmountCtrl,
  deleteWaterAmountCtrl,
  getWaterDailyCtrl,
  getWaterMonthlyCtrl,
} from '../controllers/water.js';

const router = express.Router();
const jsonParser = express.json();

router.post('/', jsonParser, validateBody(), ctrlWrapper(postWaterAmountCtrl));

router.delete('/:id', ctrlWrapper(deleteWaterAmountCtrl));
// router.delete('/:id', isValidId, ctrlWrapper(deleteContactCtrl));

router.get('/:id', ctrlWrapper(getWaterDailyCtrl));

export default router;
