import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { ContextsModule } from './modules/contexts/contexts.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [PrismaModule, LanguagesModule, ContextsModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
