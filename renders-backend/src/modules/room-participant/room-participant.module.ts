import { Module } from '@nestjs/common';
import { RoomParticipantService } from './room-participant.service';
import { RoomParticipantController } from './room-participant.controller';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RoomParticipantController],
  providers: [RoomParticipantService],
})
export class RoomParticipantModule {}
