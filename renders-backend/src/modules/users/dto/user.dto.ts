import { Room } from 'src/modules/room/entities/room.entity';

export class UserDto {
  readonly username: string;
  readonly email: string;
  readonly rooms: Room[];
}
