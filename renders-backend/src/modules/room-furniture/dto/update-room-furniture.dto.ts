import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomFurnitureDto } from './create-room-furniture.dto';

export class UpdateRoomFurnitureDto extends PartialType(
  CreateRoomFurnitureDto,
) {
  readonly position: JSON;
  readonly rotation: JSON;
  readonly scale: JSON;
}
