import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import { Room } from '../room/entities/room.entity';
import { Op } from 'sequelize';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findAllId(id: number[]) {
    return this.userRepository.findAll({ where: { id: id } });
  }

  find(
    searchString: string = '',
    limit: number = 5,
    page: number = 0,
  ): Promise<User[]> {
    let options = {
      limit: limit,
      offset: page * limit,
    };
    if (searchString.length > 0) {
      // return all if search string is empty
      options['where'] = {
        username: {
          [Op.iLike]: `%${searchString}%`,
        },
      };
    }
    return this.userRepository.findAll(options);
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async create(user: UserDto): Promise<User> {
    console.log(user);
    return await this.userRepository.create({
      username: user.username,
      email: user.email,
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne<User>({
      where: { email },
      include: [
        {
          model: Room,
          as: 'rooms',
          attributes: ['id', 'name'],
        },
        {
          model: Room,
          as: 'participatingRooms',
          attributes: ['id', 'name', 'roomOwner'],
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'username'],
            },
          ],
        },
      ],
    });
    return user;
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async findOneByUsername(username: string) {
    if (username) {
      return await this.userRepository.findOne<User>({
        where: { username: username },
      });
    } else {
      throw new HttpException(
        'Username undefined',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
