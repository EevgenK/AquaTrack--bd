import { validationParams } from '../../validation/validationCommonParams.js';
import { model, Schema } from 'mongoose';
const usersSchema = new Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 12,
      default: 'User',
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: validationParams.gender,
      default: 'woman',
    },
    weight: {
      value: {
        type: Number,
        min: 0,
        max: 500,
        default: 65,
      },
      unit: {
        type: String,
        enum: ['kg'],
        default: 'kg',
      },
    },
    dailySportTime: {
      value: {
        type: Number,
        min: 0,
        max: 24,
        default: 0,
      },
      unit: {
        type: String,
        enum: ['hours'],
        default: 'hours',
      },
    },
    dailyWaterNorm: {
      value: {
        type: Number,
        min: 500,
        max: 15000,
        default: 1500,
      },
      unit: {
        type: String,
        enum: ['ml'],
        default: 'ml',
      },
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dobkaq79k/image/upload/v1739270697/lz54yboqjkimsheddhoj.jpg',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export const UsersCollection = model('users', usersSchema);
