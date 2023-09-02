import { Test, TestingModule } from '@nestjs/testing';
import { RoomFurnitureController } from './room-furniture.controller';
import { RoomFurnitureService } from './room-furniture.service';

describe('RoomFurnitureController', () => {
  let controller: RoomFurnitureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomFurnitureController],
      providers: [RoomFurnitureService],
    }).compile();

    controller = module.get<RoomFurnitureController>(RoomFurnitureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
