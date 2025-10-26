import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RolePermissionService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';

@Controller('role-permissions')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) { }

  // ---------------- CREATE ----------------
  @Post()
  async create(@Body() data: CreateRolePermissionDto) {
    return this.rolePermissionService.create(data);
  }

  // ---------------- READ ALL ----------------
  @Get()
  async findAll() {
    return this.rolePermissionService.findAll();
  }

  // ---------------- READ ONE ----------------
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolePermissionService.findOne(id);
  }

  // ---------------- UPDATE ----------------
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRolePermissionDto,
  ) {
    return this.rolePermissionService.update(id, data);
  }

  // ---------------- DELETE ----------------
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolePermissionService.remove(id);
  }
}
