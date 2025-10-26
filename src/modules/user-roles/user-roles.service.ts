import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';
import { wrapResponse, formatSingle, formatList, ApiResponse } from '../../common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';

@Injectable()
export class UserRolesService {
  constructor(private readonly prisma: PrismaService) { }

  // ---------------- CREATE ----------------
  async create(data: CreateUserRoleDto): Promise<ApiResponse<UserRole>> {
    try {
      const userRole = await this.prisma.userRole.create({
        data: {
          user: { connect: { id: data.userId } },
          role: { connect: { id: data.roleId } },
        },
      });
      return wrapResponse(formatSingle(userRole, '/user-roles'));
    } catch (error) {
      throw new BadRequestException(
        'Either userId or roleId does not exist, or this relation already exists.',
      );
    }
  }

  // ---------------- READ ALL ----------------
  async findAll(): Promise<ApiResponse<UserRole[]>> {
    const items = await this.prisma.userRole.findMany();
    const { data, meta, links } = formatList(items, '/user-roles');
    return wrapResponse(data, meta, links);
  }

  // ---------------- DELETE ----------------
  async remove(id: number): Promise<ApiResponse<UserRole>> {
    const item = await this.prisma.userRole.delete({
      where: { id },
    });
    return wrapResponse(formatSingle(item, '/user-roles'));
  }

}
