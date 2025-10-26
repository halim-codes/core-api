import { IsDefined, IsNotEmpty, IsString, MaxLength, IsInt, Min } from 'class-validator';

export class CreateTranslationDto {
  @IsDefined({ message: 'Table name is required' })
  @IsNotEmpty({ message: 'Table name is required' })
  @IsString({ message: 'Table name must be a string' })
  @MaxLength(50, { message: 'Table name must be shorter than or equal to 50 characters' })
  tableName: string;

  @IsDefined({ message: 'Row ID is required' })
  @IsInt({ message: 'Row ID must be an integer' })
  @Min(1, { message: 'Row ID must be a positive number' })
  rowId: number;

  @IsDefined({ message: 'Field is required' })
  @IsNotEmpty({ message: 'Field is required' })
  @IsString({ message: 'Field must be a string' })
  @MaxLength(50, { message: 'Field must be shorter than or equal to 50 characters' })
  field: string;

  @IsDefined({ message: 'Language ID is required' })
  @IsInt({ message: 'Language ID must be an integer' })
  @Min(1, { message: 'Language ID must be a positive number' })
  languageId: number;

  @IsDefined({ message: 'Value is required' })
  @IsNotEmpty({ message: 'Value is required' })
  @IsString({ message: 'Value must be a string' })
  value: string;
}
