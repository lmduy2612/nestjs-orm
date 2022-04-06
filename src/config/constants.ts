import * as dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const EXPIRES_TIME = process.env.EXPIRES_TIME;
export const APP_PORT = process.env.APP_PORT;
