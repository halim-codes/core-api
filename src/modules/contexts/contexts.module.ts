import { Module } from '@nestjs/common';
import { ContextService } from './contexts.service';
import { ContextController } from './contexts.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ContextService],
  controllers: [ContextController]
})
export class ContextsModule {}
