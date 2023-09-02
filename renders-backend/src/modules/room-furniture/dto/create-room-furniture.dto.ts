import { Furniture } from 'src/modules/furniture/entities/furniture.entity';
import { Room } from 'src/modules/room/entities/room.entity';

export class CreateRoomFurnitureDto {
  readonly room: Room;
  readonly furnitureType: Furniture;
}
