import { Test, TestingModule } from '@nestjs/testing';
import { RoomParticipantController } from './room-participant.controller';
import { RoomParticipantService } from './room-participant.service';

describe('RoomParticipantController', () => {
  let controller: RoomParticipantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomParticipantController],
      providers: [RoomParticipantService],
    }).compile();

    controller = module.get<RoomParticipantController>(
      RoomParticipantController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
