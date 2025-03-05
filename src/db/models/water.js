import { model, Schema } from 'mongoose';

const waterSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 50,
      max: 5000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const WaterCollection = model('water', waterSchema);
