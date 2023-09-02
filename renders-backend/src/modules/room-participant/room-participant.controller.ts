import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomParticipantService } from './room-participant.service';
import { CreateRoomParticipantDto } from './dto/create-room-participant.dto';
import { UpdateRoomParticipantDto } from './dto/update-room-participant.dto';

@Controller('room-participant')
export class RoomParticipantController {
  constructor(
    private readonly roomParticipantService: RoomParticipantService,
  ) {}

  @Post()
  create(@Body() createRoomParticipantDto: CreateRoomParticipantDto) {
    return this.roomParticipantService.create(createRoomParticipantDto);
  }

  @Get()
  findAll() {
    return this.roomParticipantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomParticipantService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomParticipantDto: UpdateRoomParticipantDto,
  ) {
    return this.roomParticipantService.update(+id, updateRoomParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomParticipantService.remove(+id);
  }
}
