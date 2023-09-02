import { Injectable } from '@nestjs/common';
import { CreateRoomFurnitureDto } from './dto/create-room-furniture.dto';
import { UpdateRoomFurnitureDto } from './dto/update-room-furniture.dto';

@Injectable()
export class RoomFurnitureService {
  create(createRoomFurnitureDto: CreateRoomFurnitureDto) {
    return 'This action adds a new roomFurniture';
  }

  findAll() {
    return `This action returns all roomFurniture`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomFurniture`;
  }

  update(id: number, updateRoomFurnitureDto: UpdateRoomFurnitureDto) {
    return `This action updates a #${id} roomFurniture`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomFurniture`;
  }
}
