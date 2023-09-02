import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ROOM_REPOSITORY } from 'src/core/constants';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomFurniture } from '../room-furniture/entities/room-furniture.entity';
import { UpdateRoomFurnitureDto } from '../room-furniture/dto/update-room-furniture.dto';
import { UserService } from '../users/user.service';
import { RoomParticipant } from '../room-participant/entities/room-participant.entity';

@Injectable()
export class RoomService {
  constructor(
    @Inject(ROOM_REPOSITORY) private roomRepository: typeof Room,
    private userService: UserService,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = await this.roomRepository.create({
      name: createRoomDto.name,
      roomOwner: createRoomDto.roomOwner,
      floorPlan: createRoomDto.floorPlan,
    });

    const users = await this.userService.findAllId(
      createRoomDto.roomParticipants,
    );

    const newUsersRooms = users.map((u) => {
      return {
        roomId: room.id,
        userId: u.id,
      };
    });
    RoomParticipant.bulkCreate(newUsersRooms);

    return room;
  }

  async addParticipant(id: number, participants: number[]) {
    const room = await this.roomRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!room?.id) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    const users = await this.userService.findAllId(participants);
    const newUsersRooms = users.map((u) => {
      return {
        roomId: id,
        userId: u.id,
      };
    });

    await RoomParticipant.destroy({ where: { roomId: id } });

    return RoomParticipant.bulkCreate(newUsersRooms);
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return this.roomRepository.findOne({
      where: {
        id: id,
      },
      include: 'roomParticipants',
    });
  }

  getRoomState(roomId: number) {
    return this.roomRepository.findOne({
      where: { id: roomId },
      attributes: ['document'],
    });
  }

  async setRoomState(roomId: number, document: Uint8Array) {
    console.log('roomid', roomId);
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
    });
    if (room) {
      room.document = document;
      room.save();
    } else {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }

  async setFurniture(id: number, furniture: UpdateRoomFurnitureDto[]) {
    // furniture structure:
    // [
    //   {
    //     furnitureType:
    //        {
    //          id: 1,
    //          model: 'Chair',
    //          modelPath: 'assets/chair.glb',
    //        },
    //     position: { x: 0, y: 0, z: 0 },
    //     rotation: { x: 0, y: 0, z: 0 },
    //     scale: { x: 0, y: 0, z: 0 },
    //   },
    // ]

    const room = await this.roomRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!room?.id) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    // delete old furniture
    await RoomFurniture.destroy({
      where: {
        roomId: id,
      },
    });

    // add new furniture
    const newRoomFurniture = furniture.map((f) => {
      return {
        roomId: room.id,
        furnitureId: f.furnitureType.id,
        position: f.position,
        rotation: f.rotation,
        scale: f.scale,
      };
    });

    console.log(newRoomFurniture);
    return RoomFurniture.bulkCreate(newRoomFurniture);
  }

  getFurniture(id: number) {
    return this.roomRepository.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: RoomFurniture,
          as: 'roomFurniture',
        },
      ],
    });
  }
}
