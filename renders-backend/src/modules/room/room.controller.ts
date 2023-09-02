import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomFurniture } from '../room-furniture/entities/room-furniture.entity';
import { UpdateRoomFurnitureDto } from '../room-furniture/dto/update-room-furniture.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Post('/:id/invite')
  addParticipant(@Param('id') id: string, @Body() participants: number[]) {
    return this.roomService.addParticipant(+id, participants);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }

  @Post(':id/furniture')
  setFurniture(
    @Param('id') id: string,
    @Body() furniture: UpdateRoomFurnitureDto[],
  ) {
    return this.roomService.setFurniture(+id, furniture);
  }

  @Get(':id/furniture')
  getFurniture(@Param('id') id: string) {
    return this.roomService.getFurniture(+id);
  }
}
