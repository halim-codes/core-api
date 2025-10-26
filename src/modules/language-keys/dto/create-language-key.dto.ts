import { IsDefined, IsNotEmpty, IsString, MaxLength, IsInt, Min } from 'class-validator';

export class CreateLanguageKeyDto {
  @IsDefined({ message: 'Key name is required' })
  @IsNotEmpty({ message: 'Key name is required' })
  @IsString({ message: 'Key name must be a string' })
  @MaxLength(150, { message: 'Key name must be shorter than or equal to 150 characters' })
  keyName: string;

  @IsDefined({ message: 'Value is required' })
  @IsNotEmpty({ message: 'Value is required' })
  @IsString({ message: 'Value must be a string' })
  value: string;

  @IsDefined({ message: 'Language ID is required' })
  @IsInt({ message: 'Language ID must be an integer' })
  @Min(1, { message: 'Language ID must be a positive number' })
  languageId: number;

  @IsDefined({ message: 'Context ID is required' })
  @IsInt({ message: 'Context ID must be an integer' })
  @Min(1, { message: 'Context ID must be a positive number' })
  contextId: number;
}
