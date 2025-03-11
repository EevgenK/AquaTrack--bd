import createHttpError from 'http-errors';
import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';

export const getFileUrlByFeatureFlag = async (file, featureFlag) => {
  if (!file) {
    throw createHttpError(400, 'Should be a file in request');
  }
  if (getEnvVar(featureFlag) === 'true') {
    return await saveFileToCloudinary(file);
  } else {
    return await saveFileToUploadDir(file);
  }
};
