import { Furniture } from 'src/modules/furniture/entities/furniture.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';

export class CreateFurnitureTagDto {
  readonly tag: Tag;
  readonly furniture: Furniture;
}
