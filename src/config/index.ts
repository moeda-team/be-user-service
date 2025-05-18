import dotenv from 'dotenv';

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'cafe_db',
  password: process.env.DB_PASSWORD || 'postgres',
  dbport: parseInt(process.env.DB_PORT || '5432'),
  dburl: process.env.DATABASE_URL || '5432',
} as const;

export const isProduction = config.nodeEnv === 'production';
