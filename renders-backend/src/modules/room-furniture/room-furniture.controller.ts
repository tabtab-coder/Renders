import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomFurnitureService } from './room-furniture.service';
import { CreateRoomFurnitureDto } from './dto/create-room-furniture.dto';
import { UpdateRoomFurnitureDto } from './dto/update-room-furniture.dto';

@Controller('room-furniture')
export class RoomFurnitureController {
  constructor(private readonly roomFurnitureService: RoomFurnitureService) {}

  @Post()
  create(@Body() createRoomFurnitureDto: CreateRoomFurnitureDto) {
    return this.roomFurnitureService.create(createRoomFurnitureDto);
  }

  @Get()
  findAll() {
    return this.roomFurnitureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomFurnitureService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomFurnitureDto: UpdateRoomFurnitureDto,
  ) {
    return this.roomFurnitureService.update(+id, updateRoomFurnitureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomFurnitureService.remove(+id);
  }
}
