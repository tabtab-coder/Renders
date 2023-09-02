import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/model/user.model';
import { Room } from 'src/app/shared/model/room.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.scss'],
  providers: [MessageService],
})
export class ManageRoomComponent implements OnInit {
  currentUser: User;
  room: Room;

  users: User[] = [];
  selectedUsers: User[] = [];
  invitedUsers: Map<number, User> = new Map<number, User>();

  dirty: boolean = false;
  saving: boolean = false;

  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.roomService.getRoom(params['roomId']).subscribe((room) => {
        this.room = room;
        this.room.roomParticipants.forEach((user) => {
          this.invitedUsers.set(user.id, user);
        });
      });
    });
  }

  ngOnInit(): void {
    this.userService
      .getCurrentUser()
      .subscribe((user) => (this.currentUser = user));
  }

  invitedUsersChange(e) {
    this.invitedUsers = e;
    this.dirty = true;
  }

  save() {
    this.saving = true;
    console.log(this.invitedUsers);
    this.roomService
      .saveRoomParticipants(this.room.id, Array.from(this.invitedUsers.keys()))
      .subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Save room success',
          detail: 'Saved!',
        });
        this.dirty = false;
        this.saving = false;
      });
  }

  back() {
    this.router.navigate(['/dashboard']);
  }
}
