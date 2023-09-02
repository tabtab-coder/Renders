import { Test, TestingModule } from '@nestjs/testing';
import { FurnitureTagService } from './furniture-tag.service';

describe('FurnitureTagService', () => {
  let service: FurnitureTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FurnitureTagService],
    }).compile();

    service = module.get<FurnitureTagService>(FurnitureTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
