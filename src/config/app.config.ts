import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  protocol: process.env.PROTOCOL || 'http',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  corsOrigins: process.env.CORS_ORIGINS,
}));
