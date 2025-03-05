import { WaterCollection } from '../db/models/water.js';

export const postWaterAmount = async () => {};

export const updateWaterAmount = async () => {};

export const deleteWaterAmount = async (id) => {
  return await WaterCollection.findByIdAndDelete(id);
};

export const getWaterDaily = async (day) => {};

export const getWaterMonthly = async (month) => {
  x;
};
