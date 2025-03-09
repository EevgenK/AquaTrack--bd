import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';
import createHttpError from 'http-errors';

export const saveFileToUploadDir = async (file) => {
  if (!file) {
    throw createHttpError(400, 'Should be a file in request');
  }
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
};
