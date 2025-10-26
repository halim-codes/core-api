import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, RolePermission } from '@prisma/client';
import { formatSingle, formatList, wrapResponse, ApiResponse } from '../../common';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';

@Injectable()
export class RolePermissionService {
  constructor(private readonly prisma: PrismaService) { }

  // ---------------- CREATE ----------------
  async create(data: CreateRolePermissionDto): Promise<ApiResponse<RolePermission>> {
    const existing = await this.prisma.rolePermission.findFirst({
      where: { roleId: data.roleId, permissionId: data.permissionId },
    });
    if (existing) {
      throw new BadRequestException('This role-permission relation already exists.');
    }

    const rolePermission = await this.prisma.rolePermission.create({
      data: {
        role: { connect: { id: data.roleId } },
        permission: { connect: { id: data.permissionId } },
      },
    });
    return wrapResponse(formatSingle(rolePermission, '/role-permissions'));
  }

  // ---------------- READ ALL ----------------
  async findAll(): Promise<ApiResponse<RolePermission[]>> {
    const items = await this.prisma.rolePermission.findMany();
    const { data, meta, links } = formatList(items, '/role-permissions');
    return wrapResponse(data, meta, links);
  }

  // ---------------- READ ONE ----------------
  async findOne(id: number): Promise<ApiResponse<RolePermission>> {
    const item = await this.prisma.rolePermission.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundException('RolePermission not found');
    return wrapResponse(formatSingle(item, '/role-permissions'));
  }

  // ---------------- UPDATE ----------------
  async update(
    id: number,
    data: UpdateRolePermissionDto,
  ): Promise<ApiResponse<RolePermission>> {
    throw new BadRequestException(
      'Cannot update roleId or permissionId of a RolePermission. Delete and recreate instead.',
    );
  }

  // ---------------- DELETE ----------------
  async remove(id: number): Promise<ApiResponse<RolePermission>> {
    const item = await this.prisma.rolePermission.delete({
      where: { id },
    });
    return wrapResponse(formatSingle(item, '/role-permissions'));
  }

}
