import { Module } from '@nestjs/common';
import { FurnitureService } from './furniture.service';
import { FurnitureController } from './furniture.controller';
import { furnitureProviders } from './furniture.providers';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FurnitureController],
  providers: [FurnitureService, ...furnitureProviders],
})
export class FurnitureModule {}
