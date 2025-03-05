import {
  postWaterAmount,
  updateWaterAmount,
  deleteWaterAmount,
  getWaterDaily,
  getWaterMonthly,
} from '../services/water.js';

export const postWaterAmountCtrl = async (req, res) => {
  const { date, value } = req.body;

  const waterLog = await postWaterAmount({
    date,
    value,
  });

  res.status(201).send({
    status: 201,
    message: 'Posted water log successfully',
    data: waterLog,
  });
};

export const updateWaterAmountCtrl = async (req, res) => {};

export const deleteWaterAmountCtrl = async (req, res) => {};

export const getWaterDailyCtrl = async (req, res) => {};

export const getWaterMonthlyCtrl = async (req, res) => {};
