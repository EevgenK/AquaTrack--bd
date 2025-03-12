import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import createHttpError from 'http-errors';
import { SwaggerTheme } from 'swagger-themes';
import { SWAGGER_PATH } from '../constants/index.js';
const theme = new SwaggerTheme();
const options = {
  explorer: true,
  customCss: theme.getBuffer('dark'),
};
export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc, options)];
  } catch (err) {
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
