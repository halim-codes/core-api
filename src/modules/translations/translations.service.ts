import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Translation } from '@prisma/client';
import { formatSingle, formatList, wrapResponse, ApiResponse } from '../../common';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';

@Injectable()
export class TranslationService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------------- CREATE ----------------
  async create(data: CreateTranslationDto): Promise<ApiResponse<Translation>> {
    const translation = await this.prisma.translation.create({
      data: {
        tableName: data.tableName,
        rowId: data.rowId,
        field: data.field,
        value: data.value,
        language: { connect: { id: data.languageId } },
      },
    });
    return wrapResponse(formatSingle(translation, '/translations'));
  }

  // ---------------- READ ALL ----------------
  async findAll(): Promise<ApiResponse<Translation[]>> {
    const translations = await this.prisma.translation.findMany();
    const { data, meta, links } = formatList(translations, '/translations');
    return wrapResponse(data, meta, links);
  }

  // ---------------- READ ONE ----------------
  async findOne(id: number): Promise<ApiResponse<Translation>> {
    const translation = await this.prisma.translation.findUnique({ where: { id } });
    if (!translation) throw new NotFoundException(`Translation with id ${id} not found`);
    return wrapResponse(formatSingle(translation, '/translations'));
  }

  // ---------------- UPDATE ----------------
  async update(id: number, data: UpdateTranslationDto): Promise<ApiResponse<Translation>> {
    const updateData: Prisma.TranslationUpdateInput = {
      tableName: data.tableName,
      rowId: data.rowId,
      field: data.field,
      value: data.value,
    };

    if (data.languageId) {
      updateData.language = { connect: { id: data.languageId } };
    }

    const translation = await this.prisma.translation.update({
      where: { id },
      data: updateData,
    });
    return wrapResponse(formatSingle(translation, '/translations'));
  }

  // ---------------- DELETE ----------------
  async remove(id: number): Promise<ApiResponse<Translation>> {
    const translation = await this.prisma.translation.delete({ where: { id } });
    return wrapResponse(formatSingle(translation, '/translations'));
  }
}
