import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { ContextsModule } from './modules/contexts/contexts.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { LanguageKeyModule } from './modules/language-keys/language-key.module';
import { TranslationModule } from './modules/translations/translations.module';
import { RolePermissionModule } from './modules/role-permissions/role-permissions.module';

@Module({
  imports: [PrismaModule, LanguagesModule, ContextsModule, RolesModule, PermissionsModule, LanguageKeyModule, TranslationModule, RolePermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
