import {
  Controller,
  Get,
  ImATeapotException,
  Param,
  Post,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get(':email')
  getUser(@Param('email') email: string): Promise<Object> {
    return this.usersService.findOneByEmail(email);
  }

  @Get()
  getUserUsername(@Query('username') username: string): Promise<User> {
    return this.usersService.findOneByUsername(username);
  }

  @Get()
  findAll(
    @Query('searchString') searchString: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.usersService.find(searchString || '', limit || 10, page || 0);
  }

  @Get('exists/:email')
  getUserExists(@Param('email') email: string): Promise<Boolean> {
    console.log(email);
    return this.usersService.findOneByEmail(email).then((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  }

  @Post()
  async createUser(@Req() req): Promise<User> {
    /*
    Expected request from Auth0:
    {
      params: {
        username: "john",
        email: "john@abc.com"
      }
    }
    */
    const userDto: UserDto = req.body.params;
    const user = await this.usersService.findOneByEmail(userDto.email);

    if (user !== null) {
      throw new ImATeapotException();
    }
    return this.usersService.create(userDto);
  }
}
