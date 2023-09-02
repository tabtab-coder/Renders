import { Test, TestingModule } from '@nestjs/testing';
import { RoomParticipantService } from './room-participant.service';

describe('RoomParticipantService', () => {
  let service: RoomParticipantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomParticipantService],
    }).compile();

    service = module.get<RoomParticipantService>(RoomParticipantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
