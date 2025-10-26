import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @IsDefined({ message: 'Email is required' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsDefined({ message: 'Password is required' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}
