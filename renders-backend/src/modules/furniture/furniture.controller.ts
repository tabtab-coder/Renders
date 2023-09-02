import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FurnitureService } from './furniture.service';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';

@Controller('furniture')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Post()
  create(@Body() createFurnitureDto: CreateFurnitureDto) {
    return this.furnitureService.create(createFurnitureDto);
  }

  @Get()
  findAll(
    @Query('searchString') searchString: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.furnitureService.find(
      searchString || '',
      limit || 10,
      page || 0,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnitureService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFurnitureDto: UpdateFurnitureDto,
  ) {
    return this.furnitureService.update(+id, updateFurnitureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnitureService.remove(+id);
  }
}
