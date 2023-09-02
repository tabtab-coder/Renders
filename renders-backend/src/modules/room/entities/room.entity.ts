import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsToMany,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { RoomParticipant } from 'src/modules/room-participant/entities/room-participant.entity';
import { User } from 'src/modules/users/user.model';
import { RoomFurniture } from 'src/modules/room-furniture/entities/room-furniture.entity';

@Table
export class Room extends Model<Room> {
  @ForeignKey(() => User)
  roomOwner: number;

  @BelongsTo(() => User)
  owner: User;

  @Column(DataType.STRING)
  name: string;

  @BelongsToMany(() => User, () => RoomParticipant)
  roomParticipants: User[];

  @Column({ type: DataType.ARRAY(DataType.JSON) })
  floorPlan: [];

  @HasMany(() => RoomFurniture)
  roomFurniture: RoomFurniture[];

  @Column(DataType.BLOB)
  document: Uint8Array;
}
