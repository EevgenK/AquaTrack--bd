import createHttpError from 'http-errors';

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
  });

  res.status(201).send({
    status: 201,
    message: 'Posted water record successfully',
    data: waterLog,
  });
};

export const updateWaterAmountCtrl = async (req, res) => {
  const { date } = req.params;
  const { value } = req.body;

  const existingRecord = await WaterCollection.findOne({ date });
  if (!existingRecord) {
    throw new createHttpError.NotFound(
      `Water record not found for date: ${date}`,
    );
  }

  const updatedRecord = {
    date,
    value,
  };

  const result = updateWaterAmount(updatedRecord);
};

export const deleteWaterAmountCtrl = async (req, res) => {
  const { date } = req.params;

  const record = await deleteWaterAmount(date);
  if (!record) {
    throw new createHttpError.NotFound(
      `Water record not found for date: ${date}`,
    );
  }

  res.status(204).send();
};

export const getWaterDailyCtrl = async (req, res) => {};

export const getWaterMonthlyCtrl = async (req, res) => {};
