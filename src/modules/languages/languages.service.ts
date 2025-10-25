import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Language } from '@prisma/client';
import { formatSingle, formatList, wrapResponse, ApiResponse } from '../../common';

@Injectable()
export class LanguageService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------------- CREATE ----------------
  async create(data: Prisma.LanguageCreateInput): Promise<ApiResponse<Language>> {
    const language = await this.prisma.language.create({ data });
    return wrapResponse(formatSingle(language, '/languages'));
  }

  // ---------------- READ ALL ----------------
  async findAll(): Promise<ApiResponse<Language[]>> {
    const languages = await this.prisma.language.findMany();
    const { data, meta, links } = formatList(languages, '/languages');
    return wrapResponse(data, meta, links);
  }

  // ---------------- READ ONE ----------------
  async findOne(id: number): Promise<ApiResponse<Language>> {
    const language = await this.prisma.language.findUnique({ where: { id } });
    if (!language) throw new NotFoundException(`Language with id ${id} not found`);
    return wrapResponse(formatSingle(language, '/languages'));
  }

  // ---------------- UPDATE ----------------
  async update(id: number, data: Prisma.LanguageUpdateInput): Promise<ApiResponse<Language>> {
    const language = await this.prisma.language.update({ where: { id }, data });
    return wrapResponse(formatSingle(language, '/languages'));
  }

  // ---------------- DELETE ----------------
  async remove(id: number): Promise<ApiResponse<Language>> {
    const language = await this.prisma.language.delete({ where: { id } });
    return wrapResponse(formatSingle(language, '/languages'));
  }
}
