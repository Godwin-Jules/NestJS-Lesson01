import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const prot = configService.getOrThrow<string>('app.protocol');
  const host = configService.getOrThrow<string>('app.host');
  const port = configService.getOrThrow<number>('app.port');
  const corsOrigins =
    configService
      .get<string>('app.corsOrigins')
      ?.split(',')
      .map((origin) => origin.trim()) ?? [];

  app.enableCors({ origin: corsOrigins });
  app.setGlobalPrefix('api');
  await app.listen(port, host);

  console.log(`\n🚀 Our App is running on ${prot}://${host}:${port}/api/\n`);
}
bootstrap().catch((error) => {
  Logger.error('Error starting the server:', error);
  process.exit(1);
});
