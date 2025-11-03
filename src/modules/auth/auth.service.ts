import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { AuthLoginDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    if (user.status === 'inactive') {
      throw new ForbiddenException(
        'Your account is inactive. Please contact the administrator.',
      );
    }

    return user;
  }

  async login(data: AuthLoginDto) {
    const user = await this.validateUser(data.email, data.password);
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      accessToken: token,
      userId: user.id,
    };
  }

  async getCurrentUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: { permission: true },
            },
          },
        },
        language: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const permissions =
      user.role?.rolePermissions?.map((rp) => ({
        id: rp.permission.id,
        name: rp.permission.name,
        endpoint: rp.permission.endpoint,
      })) || [];

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      status: user.status,
      role: user.role
        ? {
            id: user.role.id,
            name: user.role.name,
          }
        : null,
      language: user.language
        ? {
            id: user.language.id,
            key: user.language.key,
            name: user.language.name,
          }
        : null,
      permissions,
    };
  }
}
