import { Injectable } from '@nestjs/common';
import { CreateRoomParticipantDto } from './dto/create-room-participant.dto';
import { UpdateRoomParticipantDto } from './dto/update-room-participant.dto';

@Injectable()
export class RoomParticipantService {
  create(createRoomParticipantDto: CreateRoomParticipantDto) {
    return 'This action adds a new roomParticipant';
  }

  findAll() {
    return `This action returns all roomParticipant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomParticipant`;
  }

  update(id: number, updateRoomParticipantDto: UpdateRoomParticipantDto) {
    return `This action updates a #${id} roomParticipant`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomParticipant`;
  }
}
