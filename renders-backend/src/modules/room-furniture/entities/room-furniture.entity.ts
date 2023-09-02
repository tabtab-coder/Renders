import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  Is,
} from 'sequelize-typescript';
import { Furniture } from 'src/modules/furniture/entities/furniture.entity';
import { Room } from 'src/modules/room/entities/room.entity';

@Table
export class RoomFurniture extends Model<RoomFurniture> {
  @ForeignKey(() => Room)
  @Column
  roomId: number;

  @BelongsTo(() => Room)
  room: Room;

  @ForeignKey(() => Furniture)
  @Column
  furnitureId: number;

  @Column({
    type: DataType.JSON,
  })
  position: JSON;

  @Column({
    type: DataType.JSON,
  })
  rotation: JSON;

  @Column({
    type: DataType.JSON,
  })
  scale: JSON;
}
