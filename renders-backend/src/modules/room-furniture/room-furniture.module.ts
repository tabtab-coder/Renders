import { Module } from '@nestjs/common';
import { RoomFurnitureService } from './room-furniture.service';
import { RoomFurnitureController } from './room-furniture.controller';

@Module({
  controllers: [RoomFurnitureController],
  providers: [RoomFurnitureService],
})
export class RoomFurnitureModule {}
