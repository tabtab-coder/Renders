import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { User } from 'src/modules/users/user.model';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  readonly roomParticipants: number[];
}
