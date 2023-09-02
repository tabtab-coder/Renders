import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { mergeMap, Observable } from 'rxjs';
import { Room } from '../shared/model/room.model';
import { Furniture } from '../shared/model/furniture.model';
import { Room2D } from '../shared/model/floor-plan.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  backendUrl = environment.backendUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  getRoom(roomId: number): Observable<Room> {
    return this.http.get<Room>(`${this.backendUrl}/api/v1/rooms/${roomId}`);
  }

  openRoom(roomId: number, roomOwner: number): void {
    this.router.navigate([`/virtual-room`], {
      queryParams: {
        roomOwner: roomOwner,
        roomId: roomId,
      },
    });
  }

  manageRoom(roomId: number, roomOwner: number): void {
    this.router.navigate([`/manage-room`], {
      queryParams: {
        roomOwner: roomOwner,
        roomId: roomId,
      },
    });
  }

  saveRoomParticipants(roomId: number, roomParticipants: number[]) {
    return this.http.post<Room>(
      `${this.backendUrl}/api/v1/rooms/${roomId}/invite`,
      roomParticipants
    );
  }

  getUserRoom(userId: number): Observable<Room> {
    return this.http.get<Room>(
      `${this.backendUrl}/api/v1/users/${userId}/room`
    );
  }

  getRoomFurnitures(roomId: number): Observable<{ furnitures: Furniture[] }> {
    return this.http.get<{ furnitures: Furniture[] }>(
      `${this.backendUrl}/api/v1/rooms/${roomId}/furniture`
    );
  }

  createRoom(
    name: string,
    floorPlan: Room2D[],
    participants: number[]
  ): Observable<Room> {
    return this.userService.getCurrentUser().pipe(
      mergeMap((user) =>
        this.http.post<Room>(`${this.backendUrl}/api/v1/rooms`, {
          name: name,
          roomOwner: user.id,
          roomParticipants: participants,
          floorPlan,
        })
      )
    );
  }

  saveFurniture(roomId: number, furniture: Furniture[]): Observable<Furniture> {
    return this.http.post<Furniture>(
      `${this.backendUrl}/api/v1/rooms/${roomId}/furniture`,
      furniture
    );
  }
}
