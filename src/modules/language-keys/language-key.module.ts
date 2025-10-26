import { Module } from '@nestjs/common';
import { LanguageKeyService } from './language-key.service';
import { LanguageKeyController } from './language-key.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LanguageKeyService],
  controllers: [LanguageKeyController],
})
export class LanguageKeyModule {}
