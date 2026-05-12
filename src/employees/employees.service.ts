import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.prismaService.employee.create({ data: createEmployeeDto });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) return this.prismaService.employee.findMany({ where: { role } });

    return this.prismaService.employee.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.employee.findUnique({ where: { id } });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.prismaService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.employee.delete({ where: { id } });
  }
}
