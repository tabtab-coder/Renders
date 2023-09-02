import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FurnitureTagService } from './furniture-tag.service';
import { CreateFurnitureTagDto } from './dto/create-furniture-tag.dto';
import { UpdateFurnitureTagDto } from './dto/update-furniture-tag.dto';

@Controller('furniture-tag')
export class FurnitureTagController {
  constructor(private readonly furnitureTagService: FurnitureTagService) {}

  @Post()
  create(@Body() createFurnitureTagDto: CreateFurnitureTagDto) {
    return this.furnitureTagService.create(createFurnitureTagDto);
  }

  @Get()
  findAll() {
    return this.furnitureTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnitureTagService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFurnitureTagDto: UpdateFurnitureTagDto,
  ) {
    return this.furnitureTagService.update(+id, updateFurnitureTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnitureTagService.remove(+id);
  }
}
