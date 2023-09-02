import { PartialType } from '@nestjs/mapped-types';
import { CreateFurnitureTagDto } from './create-furniture-tag.dto';

export class UpdateFurnitureTagDto extends PartialType(CreateFurnitureTagDto) {}
