import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events.module';

import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './modules/users/user.model';
import { UsersModule } from './modules/users/user.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { userProviders } from './modules/users/user.providers';
import { FurnitureModule } from './modules/furniture/furniture.module';
import { RoomFurnitureModule } from './modules/room-furniture/room-furniture.module';
import { RoomModule } from './modules/room/room.module';
import { TagModule } from './modules/tag/tag.module';
import { FurnitureTagModule } from './modules/furniture-tag/furniture-tag.module';

import * as dotenv from 'dotenv';
import { Furniture } from './modules/furniture/entities/furniture.entity';
import { Room } from './modules/room/entities/room.entity';
import { RoomParticipantModule } from './modules/room-participant/room-participant.module';
import { RoomParticipant } from './modules/room-participant/entities/room-participant.entity';
import { RoomFurniture } from './modules/room-furniture/entities/room-furniture.entity';

dotenv.config();

@Module({
  imports: [
    EventsModule,
    SequelizeModule.forRoot({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      dialect: 'postgres',
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_DEVELOPMENT,
      models: [User, Furniture, Room, RoomParticipant, RoomFurniture],
      define: {
        timestamps: false,
      },
    }),
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FurnitureModule,
    RoomFurnitureModule,
    RoomModule,
    TagModule,
    FurnitureTagModule,
    RoomParticipantModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...userProviders],
})
export class AppModule {
  constructor() {}
}
