import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // ---------------- CREATE ----------------
  @Post()
  async create(@Body() data: CreateRoleDto) {
    return this.rolesService.create(data);
  }

  // ---------------- READ ALL ----------------
  @Get()
  async findAll() {
    return this.rolesService.findAll();
  }

  // ---------------- READ ONE ----------------
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  // ---------------- UPDATE ----------------
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, data);
  }

  // ---------------- DELETE ----------------
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }

  // ---------------- GET ROLE PERMISSIONS ----------------
  @Get(':id/permissions')
  async getRolePermissions(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.getRolePermissions(id);
  }

  // ---------------- UPDATE ROLE PERMISSIONS ----------------
  @Patch(':id/permissions')
  async updateRolePermissions(
    @Param('id', ParseIntPipe) id: number,
    @Body('permissionIds') permissionIds: number[],
  ) {
    return this.rolesService.updateRolePermissions(id, permissionIds);
  }
}
