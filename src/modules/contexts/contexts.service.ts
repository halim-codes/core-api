import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Context } from '@prisma/client';
import { formatSingle, formatList, wrapResponse, ApiResponse } from '../../common';

@Injectable()
export class ContextService {
  constructor(private readonly prisma: PrismaService) { }

  // ---------------- CREATE ----------------
  async create(data: Prisma.ContextCreateInput): Promise<ApiResponse<Context>> {
    const context = await this.prisma.context.create({ data });
    return wrapResponse(formatSingle(context, '/contexts'));
  }

  // ---------------- READ ALL ----------------
  async findAll(): Promise<ApiResponse<Context[]>> {
    const contexts = await this.prisma.context.findMany();
    const { data, meta, links } = formatList(contexts, '/contexts');
    return wrapResponse(data, meta, links);
  }

  // ---------------- READ ONE ----------------
  async findOne(id: number): Promise<ApiResponse<Context>> {
    const context = await this.prisma.context.findUnique({ where: { id } });
    if (!context) throw new NotFoundException(`Context with id ${id} not found`);
    return wrapResponse(formatSingle(context, '/contexts'));
  }

  // ---------------- UPDATE ----------------
  async update(id: number, data: Prisma.ContextUpdateInput): Promise<ApiResponse<Context>> {
    const context = await this.prisma.context.update({ where: { id }, data });
    return wrapResponse(formatSingle(context, '/contexts'));
  }

  // ---------------- DELETE ----------------
  async remove(id: number): Promise<ApiResponse<Context>> {
    const context = await this.prisma.context.delete({ where: { id } });
    return wrapResponse(formatSingle(context, '/contexts'));
  }
}
