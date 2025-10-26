import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { UsersModule } from './modules/users/users.module';
import { UserRolesModule } from './modules/user-roles/user-roles.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    LanguagesModule,
    ContextsModule,
    RolesModule,
    PermissionsModule,
    LanguageKeyModule,
    TranslationModule,
    RolePermissionModule,
    UsersModule,
    UserRolesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
