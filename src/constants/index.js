import path from 'node:path';
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
