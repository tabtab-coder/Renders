import { Injectable, Inject } from '@nestjs/common';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { Furniture } from './entities/furniture.entity';
import { FURNITURE_REPOSITORY } from 'src/core/constants';
import { Op } from 'sequelize';

@Injectable()
export class FurnitureService {
  constructor(
    @Inject(FURNITURE_REPOSITORY) private furnitureRepository: typeof Furniture,
  ) {}
  create(createFurnitureDto: CreateFurnitureDto) {
    return 'This action adds a new furniture';
  }

  findAll() {
    return `This action returns all furniture`;
  }

  find(
    searchString: string = '',
    limit: number = 5,
    page: number = 0,
  ): Promise<Furniture[]> {
    let options = {
      limit: limit,
      offset: page * limit,
      order: ['id'],
    };
    if (searchString.length > 0) {
      // return all if search string is empty
      options['where'] = {
        name: {
          [Op.iLike]: `%${searchString}%`,
        },
      };
    }
    return this.furnitureRepository.findAll(options);
  }

  findOne(id: number) {
    return `This action returns a #${id} furniture`;
  }

  update(id: number, updateFurnitureDto: UpdateFurnitureDto) {
    return `This action updates a #${id} furniture`;
  }

  remove(id: number) {
    return `This action removes a #${id} furniture`;
  }
}
