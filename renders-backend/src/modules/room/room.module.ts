import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { roomProviders } from './room.providers';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [RoomController],
  providers: [RoomService, ...roomProviders],
})
export class RoomModule {}
