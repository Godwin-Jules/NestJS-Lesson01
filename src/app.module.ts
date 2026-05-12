import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      skipProcessEnv: true,
      envFilePath: '.env.local',
      load: [appConfig, dbConfig],
      cache: true,
    }),
    UsersModule,
    EmployeesModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
