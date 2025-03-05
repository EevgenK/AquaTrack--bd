import { validationParams } from '../../validation/validationCommonParams.js';
import { model, Schema } from 'mongoose';
const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
        default: 0,
        min: 0,
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
        default: 0,
        min: 0,
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
        default: 1500,
        min: 0,
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
        'https://res.cloudinary.com/dobkaq79k/image/upload/v1738604656/ogeqhuxc…' /*Temporary*/,
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
