import { model, Schema } from 'mongoose';
import createHttpError from 'http-errors';

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

waterSchema.post('save', (error, data, next) => {
  if (error) {
    next(createHttpError(400, `${error.message}`));
  } else {
    next();
  }
});

export const WaterCollection = model('water', waterSchema);
