import { IsDefined, IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CreateLanguageDto {
  @IsDefined({ message: 'Key is required'})
  @IsNotEmpty({ message: 'Key is required'})
  @Length(2, 2, { message: 'Key must be exactly 2 characters' })
  @IsString({ message: 'Key must be a string' })
  key: string;

  @IsDefined({ message: 'Name is required'})
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MaxLength(50, { message: 'Name must be shorter than or equal to 50 characters' })
  name: string;
}
