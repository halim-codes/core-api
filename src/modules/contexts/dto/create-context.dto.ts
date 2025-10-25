import { IsDefined, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateContextDto {
    @IsDefined({ message: 'Name is required' })
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    @MaxLength(50, { message: 'the error not from here' })
    name: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    @MaxLength(255, { message: 'Description must be shorter than or equal to 255 characters' })
    description?: string;
}
