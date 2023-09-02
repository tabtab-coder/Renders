import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.model';
import { Room } from 'src/modules/room/entities/room.entity';
import { RoomParticipant } from 'src/modules/room-participant/entities/room-participant.entity';
import { Furniture } from 'src/modules/furniture/entities/furniture.entity';
import { RoomFurniture } from 'src/modules/room-furniture/entities/room-furniture.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      config = databaseConfig.development;
      const sequelize = new Sequelize({
        ...config,
        ...{
          define: {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
          },
        },
      });
      sequelize.addModels([
        User,
        Room,
        RoomParticipant,
        Furniture,
        RoomFurniture,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
