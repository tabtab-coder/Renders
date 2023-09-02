import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { RoomParticipant } from '../room-participant/entities/room-participant.entity';
import { Room } from '../room/entities/room.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @HasMany(() => Room, 'roomOwner')
  rooms: Room[];

  @BelongsToMany(() => Room, () => RoomParticipant)
  participatingRooms: Room[];
}
