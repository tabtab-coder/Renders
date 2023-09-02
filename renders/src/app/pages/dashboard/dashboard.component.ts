import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user.model';
import { Room } from 'src/app/shared/model/room.model';
import { UserService } from 'src/app/services/user.service';
import { RoomService } from 'src/app/services/room.service';
import { faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userRoom: Room = null;
  user: User;
  manageRooms: boolean = false;
  roomOptions: any;
  stateOptions: any[];
  value1: string = 'off';

  configIcon = faGear;

  constructor(
    private userService: UserService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    const html = document.documentElement;
    if (html) {
      // aframe bug that doesn't remove fullscreen after exitin
      html.classList.remove('a-fullscreen');
    }
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
    this.stateOptions = [
      { label: 'Off', value: 'off' },
      { label: 'On', value: 'on' },
    ];
    this.roomOptions = [
      {
        name: 'Join room',
        value: false,
      },
      {
        name: 'Manage room',
        value: true,
      },
    ];
  }

  navigateToRoom(e: number) {
    if (this.manageRooms) {
      this.roomService.manageRoom(e, this.user.id);
    } else {
      this.roomService.openRoom(e, this.user.id);
    }
  }
}
