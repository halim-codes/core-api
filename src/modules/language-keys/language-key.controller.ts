import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { LanguageKeyService } from './language-key.service';
import { CreateLanguageKeyDto } from './dto/create-language-key.dto';
import { UpdateLanguageKeyDto } from './dto/update-language-key.dto';

@Controller('language-keys')
export class LanguageKeyController {
  constructor(private readonly languageKeyService: LanguageKeyService) { }

  // ---------------- CREATE ----------------
  @Post()
  async create(@Body() data: CreateLanguageKeyDto) {
    return this.languageKeyService.create(data);
  }

  // ---------------- READ ALL ----------------
  @Get()
  async findAll() {
    return this.languageKeyService.findAll();
  }

  // ---------------- READ ONE ----------------
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.languageKeyService.findOne(Number(id));
  }

  // ---------------- UPDATE ----------------
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateLanguageKeyDto) {
    return this.languageKeyService.update(Number(id), data);
  }

  // ---------------- DELETE ----------------
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.languageKeyService.remove(Number(id));
  }
}
