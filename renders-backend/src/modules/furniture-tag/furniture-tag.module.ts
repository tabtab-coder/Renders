import { Module } from '@nestjs/common';
import { FurnitureTagService } from './furniture-tag.service';
import { FurnitureTagController } from './furniture-tag.controller';

@Module({
  controllers: [FurnitureTagController],
  providers: [FurnitureTagService],
})
export class FurnitureTagModule {}
