import { Injectable } from '@nestjs/common';
import { CreateFurnitureTagDto } from './dto/create-furniture-tag.dto';
import { UpdateFurnitureTagDto } from './dto/update-furniture-tag.dto';

@Injectable()
export class FurnitureTagService {
  create(createFurnitureTagDto: CreateFurnitureTagDto) {
    return 'This action adds a new furnitureTag';
  }

  findAll() {
    return `This action returns all furnitureTag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} furnitureTag`;
  }

  update(id: number, updateFurnitureTagDto: UpdateFurnitureTagDto) {
    return `This action updates a #${id} furnitureTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} furnitureTag`;
  }
}
