import { Test, TestingModule } from '@nestjs/testing';
import { FurnitureTagController } from './furniture-tag.controller';
import { FurnitureTagService } from './furniture-tag.service';

describe('FurnitureTagController', () => {
  let controller: FurnitureTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FurnitureTagController],
      providers: [FurnitureTagService],
    }).compile();

    controller = module.get<FurnitureTagController>(FurnitureTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
