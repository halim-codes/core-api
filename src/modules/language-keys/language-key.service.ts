import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, LanguageKey } from '@prisma/client';
import { formatSingle, formatList, wrapResponse, ApiResponse } from '../../common';
import { CreateLanguageKeyDto } from './dto/create-language-key.dto';
import { UpdateLanguageKeyDto } from './dto/update-language-key.dto';

@Injectable()
export class LanguageKeyService {
  constructor(private readonly prisma: PrismaService) { }

  // ---------------- CREATE ----------------
  async create(data: CreateLanguageKeyDto): Promise<ApiResponse<LanguageKey>> {
    const languageKey = await this.prisma.languageKey.create({
      data: {
        keyName: data.keyName,
        value: data.value,
        language: { connect: { id: data.languageId } },
        context: { connect: { id: data.contextId } },
      },
    });

    return wrapResponse(formatSingle(languageKey, '/language-keys'));
  }

  // ---------------- READ ALL ----------------
  async findAll(): Promise<ApiResponse<LanguageKey[]>> {
    const keys = await this.prisma.languageKey.findMany();
    const { data, meta, links } = formatList(keys, '/language-keys');
    return wrapResponse(data, meta, links);
  }

  // ---------------- READ ONE ----------------
  async findOne(id: number): Promise<ApiResponse<LanguageKey>> {
    const key = await this.prisma.languageKey.findUnique({ where: { id } });
    if (!key) throw new NotFoundException(`Language key with id ${id} not found`);
    return wrapResponse(formatSingle(key, '/language-keys'));
  }

  // ---------------- UPDATE ----------------
  async update(
    id: number,
    data: UpdateLanguageKeyDto, 
  ): Promise<ApiResponse<LanguageKey>> {

    const updateData: Prisma.LanguageKeyUpdateInput = {
      keyName: data.keyName,
      value: data.value,
    };

    if (data.languageId) {
      updateData.language = { connect: { id: data.languageId } };
    }

    if (data.contextId) {
      updateData.context = { connect: { id: data.contextId } };
    }

    const key = await this.prisma.languageKey.update({
      where: { id },
      data: updateData,
    });

    return wrapResponse(formatSingle(key, '/language-keys'));
  }

  // ---------------- DELETE ----------------
  async remove(id: number): Promise<ApiResponse<LanguageKey>> {
    const key = await this.prisma.languageKey.delete({ where: { id } });
    return wrapResponse(formatSingle(key, '/language-keys'));
  }
}
