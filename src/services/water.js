import createHttpError from 'http-errors';
import { WaterCollection } from '../db/models/water.js';

export const postWaterAmount = async (payload) => {
  return await WaterCollection.create(payload);
};

export const updateWaterAmount = async (id, payload) => {
  return await WaterCollection.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

export const deleteWaterAmount = async (id) => {
  return await WaterCollection.findByIdAndDelete(id);
};

export const getWaterDaily = async (userId, date) => {
  const result = await WaterCollection.find({
    userId,
    date: { $regex: `^${date}T` },
  }).sort({ date: 1 });
  if (!result.length) {
    throw createHttpError(404, 'Date not found');
  }
  return result;
};

export const getWaterMonthly = async (userId, month) => {
  const result = await WaterCollection.find({
    userId,
    date: { $regex: `^${month}-` },
  }).sort({ date: 1 });

  if (!result.length) {
    throw createHttpError(404, 'Month not found');
  }
  return result;
};
