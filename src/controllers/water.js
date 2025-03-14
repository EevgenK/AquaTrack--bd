import createHttpError from 'http-errors';
import moment from 'moment';

import {
  postWaterAmount,
  updateWaterAmount,
  deleteWaterAmount,
  getWaterDaily,
  getWaterMonthly,
} from '../services/water.js';

import { WaterCollection } from '../db/models/water.js';

export const postWaterAmountCtrl = async (req, res) => {
  const { date, value } = req.body;

  const waterLog = await postWaterAmount({
    date,
    value,
    userId: req.user._id,
  });

  res.status(201).send({
    status: 201,
    message: 'Successfully posted water record',
    data: waterLog,
  });
};

export const updateWaterAmountCtrl = async (req, res) => {
  const { id } = req.params;
  const { date, value } = req.body;

  const existingRecord = await WaterCollection.findById(id);
  if (!existingRecord) {
    throw new createHttpError.NotFound('Water record not found');
  }

  if (existingRecord.userId.toString() !== req.user._id.toString()) {
    throw new createHttpError.NotFound('Water record not found');
  }

  const updatedRecord = {
    date,
    value,
  };

  const result = await updateWaterAmount(id, updatedRecord);
  if (!result) {
    throw new createHttpError.NotFound('Water record not found');
  }

  console.log(result);

  res.status(200).send({
    status: 200,
    message: 'Water record updated successfully',
    data: result,
  });
};

export const deleteWaterAmountCtrl = async (req, res) => {
  const { id } = req.params;

  const record = await deleteWaterAmount(id);
  if (!record) {
    throw new createHttpError.NotFound('Water record not found');
  }

  if (record.userId.toString() !== req.user._id.toString()) {
    throw new createHttpError.NotFound('Record not found');
  }

  res.status(204).send();
};

export const getWaterDailyCtrl = async (req, res) => {
  const { date } = req.params;
  const userId = req.user._id;

  const records = await getWaterDaily(userId, date);

  res.status(200).send({
    status: 200,
    message: `Successfully fetched water records for ${date}`,
    data: records,
  });
};

export const getWaterMonthlyCtrl = async (req, res) => {
  const { month } = req.params;
  const userId = req.user._id;
  console.log('PARAMS=>>>', req.params);
  const records = await getWaterMonthly(userId, month);

  res.status(200).send({
    status: 200,
    message: `Successfully fetched water records for ${month}`,
    data: records,
  });
};
