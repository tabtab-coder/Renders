import { Module, Inject } from '@nestjs/common';
import { YjsGateway } from './yjs.gateway';
import { RoomService } from './modules/room/room.service';
import { RoomModule } from './modules/room/room.module';
import { roomProviders } from './modules/room/room.providers';
import { UsersModule } from './modules/users/user.module';

// https://github.com/gondar00/yjs-websocket-server-with-nestjs
@Module({
  providers: [YjsGateway, RoomService, ...roomProviders],
  imports: [RoomModule, UsersModule],
})
export class EventsModule {}
