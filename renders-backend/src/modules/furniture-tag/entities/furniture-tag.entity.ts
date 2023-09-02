import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToAssociation,
  BelongsTo,
} from 'sequelize-typescript';
import { Furniture } from 'src/modules/furniture/entities/furniture.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';

@Table
export class FurnitureTag extends Model<FurnitureTag> {
  @BelongsTo(() => Furniture)
  furniture: Furniture;

  @BelongsTo(() => Tag)
  tag: Tag;
}
