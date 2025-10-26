import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { formatSingle, formatList, wrapResponse, ApiResponse } from '../../common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  // ---------------- CREATE ----------------
  async create(data: Prisma.UserCreateInput): Promise<ApiResponse<User>> {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    const user = await this.prisma.user.create({ data });
    return wrapResponse(formatSingle(user, '/users'));
  }

  // ---------------- READ ALL ----------------
  async findAll(): Promise<ApiResponse<User[]>> {
    const users = await this.prisma.user.findMany();
    const { data, meta, links } = formatList(users, '/users');
    return wrapResponse(data, meta, links);
  }

  // ---------------- READ ONE ----------------
  async findOne(id: number): Promise<ApiResponse<User>> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return wrapResponse(formatSingle(user, '/users'));
  }

  // ---------------- UPDATE ----------------
  async update(id: number, data: Prisma.UserUpdateInput): Promise<ApiResponse<User>> {
    const user = await this.prisma.user.update({ where: { id }, data });
    return wrapResponse(formatSingle(user, '/users'));
  }

  // ---------------- DELETE ----------------
  async remove(id: number): Promise<ApiResponse<User>> {
    const user = await this.prisma.user.delete({ where: { id } });
    return wrapResponse(formatSingle(user, '/users'));
  }
}
