import { IsDefined, IsNotEmpty, IsOptional, IsString, MaxLength, IsEmail, IsEnum, IsInt, Min } from 'class-validator';
import { UserStatus } from '@prisma/client';

export class CreateUserDto {
  @IsDefined({ message: 'Username is required' })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MaxLength(50, { message: 'Username must be shorter than or equal to 50 characters' })
  username: string;

  @IsDefined({ message: 'Email is required' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  @MaxLength(50, { message: 'Email must be shorter than or equal to 50 characters' })
  email: string;

  @IsDefined({ message: 'Password is required' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MaxLength(50, { message: 'Password must be shorter than or equal to 50 characters' })
  password: string;

  @IsOptional()
  @IsEnum(UserStatus, { message: 'Status must be either active or inactive' })
  status?: UserStatus;

  @IsOptional()
  @IsInt({ message: 'Role ID must be an integer' })
  @Min(1, { message: 'Role ID must be a positive number' })
  roleId?: number;

  @IsOptional()
  @IsInt({ message: 'Language ID must be an integer' })
  @Min(1, { message: 'Language ID must be a positive number' })
  languageId?: number;
}
