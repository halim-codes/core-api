import { PartialType } from '@nestjs/mapped-types';
import { CreateLanguageKeyDto } from './create-language-key.dto';

export class UpdateLanguageKeyDto extends PartialType(CreateLanguageKeyDto) {}
