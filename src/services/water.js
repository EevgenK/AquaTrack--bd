import createHttpError from 'http-errors';
import { WaterCollection } from '../db/models/water.js';
import { UsersCollection } from '../db/models/user.js';

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

// export const getWaterMonthly = async (userId, month) => {
// const result = await WaterCollection.find({
//   userId,
//   date: { $regex: `^${month}-` },
// }).sort({ date: 1 });

// if (!result.length) {
//   throw createHttpError(404, 'Month not found');
// }
//   return result;
// };

export const getWaterMonthly = async (userId, month) => {
  const { dailyWaterNorm } = await UsersCollection.findOne({ _id: userId });

  const find = await WaterCollection.find({
    userId,
    date: { $regex: `^${month}-` },
  });

  if (!find.length) {
    throw createHttpError(404, 'Month not found');
  }

  const records = await WaterCollection.aggregate([
    {
      $match: {
        userId,
        date: { $regex: `^${month}-` },
      },
    },
    {
      $project: {
        date: { $substr: ['$date', 0, 10] },
        value: 1,
      },
    },
    {
      $group: {
        _id: '$date',
        totalAmount: { $sum: '$value' },
      },
    },
    {
      $project: {
        _id: 0, // Видаляємо MongoDB _id
        date: '$_id', // Встановлюємо дату
        totalAmount: 1, // Додаємо totalAmount
        percentage: {
          $round: [
            {
              $min: [
                {
                  $multiply: [
                    { $divide: ['$totalAmount', dailyWaterNorm] },
                    100,
                  ],
                },
                100, // Обмеження максимум 100
              ],
            },
            0, // Округлення до цілого числа
          ],
        },
      },
    },
    { $sort: { date: 1 } },
  ]);

  return records;
};
