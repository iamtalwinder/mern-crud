import dotenv from 'dotenv';
import { EnvironmentInterface } from '../interfaces';
dotenv.config();

export const environment: EnvironmentInterface  = {
    DB_URI: process.env.DB_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
}
