import { GoneException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async checkDb() {
    try {
      const response = await this.prisma.$queryRaw`SELECT 1;`;
      if (response) {
        return { message: 'db connected successfully!' };
      }
    } catch (error) {
      console.log('Error connnection to the database:', error);
      throw new GoneException('connection to the db server went down');
    }
  }
}
