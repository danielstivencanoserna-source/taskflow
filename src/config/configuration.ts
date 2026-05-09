// src/config/configuration.ts
export default () => ({
  port: parseInt(process.env.API_PORT ??'', 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '', 10) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'secret',
    name: process.env.DATABASE_NAME || 'taskflowdb',
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'default-access-secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },
});