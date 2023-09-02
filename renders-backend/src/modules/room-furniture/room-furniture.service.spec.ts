import { Test, TestingModule } from '@nestjs/testing';
import { RoomFurnitureService } from './room-furniture.service';

describe('RoomFurnitureService', () => {
  let service: RoomFurnitureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomFurnitureService],
    }).compile();

    service = module.get<RoomFurnitureService>(RoomFurnitureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
