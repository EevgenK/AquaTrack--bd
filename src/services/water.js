import { WaterCollection } from '../db/models/water.js';

export const postWaterAmount = async (payload) => {
  return await WaterCollection.create(payload);
};

export const updateWaterAmount = async () => {};

export const deleteWaterAmount = async (date) => {
  return await WaterCollection.findOneAndDelete({ date });
};

export const getWaterDaily = async (day) => {};

export const getWaterMonthly = async (month) => {};
