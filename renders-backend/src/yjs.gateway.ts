/* eslint-disable @typescript-eslint/no-empty-function */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Request } from 'express';
import { Server } from 'ws';
import {
  setupWSConnection,
  getPersistence,
  docs,
  setPersistence,
} from 'y-websocket/bin/utils';
import { RoomService } from './modules/room/room.service';
import * as Y from 'yjs';
import { fromUint8Array, toUint8Array } from 'js-base64';

// https://github.com/gondar00/yjs-websocket-server-with-nestjs
@WebSocketGateway({ path: '/yjs' })
export class YjsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly roomService: RoomService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(connection: WebSocket, req: Request): void {
    // We can handle authentication of user like below

    // const token = getCookie(request?.headers?.cookie, 'auth_token');
    // const ERROR_CODE_WEBSOCKET_AUTH_FAILED = 4000;
    // if (!token) {
    //   connection.close(ERROR_CODE_WEBSOCKET_AUTH_FAILED);
    // } else {
    //   const signedJwt = this.authService.verifyToken(token);
    //   if (!signedJwt) connection.close(ERROR_CODE_WEBSOCKET_AUTH_FAILED);
    //   else {
    //     const docName = getCookie(request?.headers?.cookie, 'roomName');
    //     setupWSConnection(connection, request, { ...(docName && { docName }) });
    //   }
    // }

    // const docName = getCookie(req?.headers?.cookie, 'roomName');

    setPersistence({
      bindState: async (roomName, ydoc) => {
        // this is where you initialize the ydoc
        return this.roomService
          .getRoomState(+roomName)
          .then((res) => {
            if (res?.document) {
              // Transform Base64-String back to an Uint8Array
              // const binaryEncoded = toUint8Array(res.document);
              Y.applyUpdate(ydoc, res.document);
              console.log(`populated room ${roomName}`);
            }
          })
          .catch((e) => console.log('Error loading data into YDoc', e));
      },
      writeState: (roomName, ydoc) => {
        // This is where you store the Yjs document to your database. This is called when all clients disconnect
        // await saveContent(roomName, Y.encodeDocumentAsUpdate(ydoc));
        const state = Buffer.from(Y.encodeStateAsUpdate(ydoc));
        // Transform Uint8Array to a Base64-String
        const base64Encoded = fromUint8Array(state);
        const roomFurniture = ydoc.getMap('furniture').toJSON();

        return this.roomService
          .setRoomState(+roomName, state)
          .then((res) => console.log(`saved room ${roomName}`))
          .catch((e) => console.log('Error setting room state', e));
      },
    });

    const matches = req.url.match(/roomName=([^&]*)/);
    if (matches) {
      const docName = matches[1];
      setupWSConnection(connection, req, { ...(docName && { docName }) });
    }
  }

  handleDisconnect(connection: WebSocket): void {
    // console.log('disconnected', this.server);
    // console.log('connection', connection);
    // console.log('persistentece', getPersistence());
    // console.log('docs', docs);
  }
}
