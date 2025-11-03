import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';
import { formatSingle, formatList, wrapResponse, ApiResponse } from '../../common';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------------- CREATE ----------------
  async create(data: Prisma.RoleCreateInput): Promise<ApiResponse<Role>> {
    const role = await this.prisma.role.create({ data });
    return wrapResponse(formatSingle(role, '/roles'));
  }

  // ---------------- READ ALL ----------------
  async findAll(): Promise<ApiResponse<Role[]>> {
    const roles = await this.prisma.role.findMany();
    const { data, meta, links } = formatList(roles, '/roles');
    return wrapResponse(data, meta, links);
  }

  // ---------------- READ ONE ----------------
  async findOne(id: number): Promise<ApiResponse<Role>> {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException(`Role with id ${id} not found`);
    return wrapResponse(formatSingle(role, '/roles'));
  }

  // ---------------- UPDATE ----------------
  async update(id: number, data: Prisma.RoleUpdateInput): Promise<ApiResponse<Role>> {
    const role = await this.prisma.role.update({ where: { id }, data });
    return wrapResponse(formatSingle(role, '/roles'));
  }

  // ---------------- DELETE ----------------
  async remove(id: number): Promise<ApiResponse<Role>> {
    const role = await this.prisma.role.delete({ where: { id } });
    return wrapResponse(formatSingle(role, '/roles'));
  }

  // ---------------- GET ROLE PERMISSIONS ----------------
  async getRolePermissions(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        rolePermissions: {
          include: { permission: true },
        },
      },
    });

    if (!role) throw new NotFoundException(`Role with id ${id} not found`);

    const permissions = role.rolePermissions.map((rp) => rp.permission);
    return wrapResponse({ roleId: id, permissions });
  }

  // ---------------- UPDATE ROLE PERMISSIONS ----------------
  async updateRolePermissions(id: number, permissionIds: number[]) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException(`Role with id ${id} not found`);

    await this.prisma.rolePermission.deleteMany({ where: { roleId: id } });

    const newLinks = permissionIds.map((permissionId) => ({
      roleId: id,
      permissionId,
    }));

    if (newLinks.length > 0) {
      await this.prisma.rolePermission.createMany({ data: newLinks });
    }

    const updatedPermissions = await this.prisma.rolePermission.findMany({
      where: { roleId: id },
      include: { permission: true },
    });

    return wrapResponse({
      message: 'Role permissions updated successfully',
      roleId: id,
      permissions: updatedPermissions.map((rp) => rp.permission),
    });
  }
}
