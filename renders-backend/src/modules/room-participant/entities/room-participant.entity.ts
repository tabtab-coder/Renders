import {
  ForeignKey,
  Table,
  Model,
  DataType,
  Column,
} from 'sequelize-typescript';
import { Room } from 'src/modules/room/entities/room.entity';
import { User } from 'src/modules/users/user.model';

@Table
export class RoomParticipant extends Model<RoomParticipant> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Room)
  @Column
  roomId: number;
}
