import { Component, OnInit, ViewChild } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';
import { Room2D } from 'src/app/shared/model/floor-plan.model';
import { User } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-room-creation',
  templateUrl: './room-creation.component.html',
  styleUrls: ['./room-creation.component.scss'],
})
export class RoomCreationComponent implements OnInit {
  items: ['Floor plan', 'Invite friends'];
  activeIndex: number;

  @ViewChild('canvas') canvas: any;
  isDown: boolean = false;
  isLinked: boolean = true;
  hasDrawn: boolean = false;
  valid: boolean = true;
  startPos: { x: number; y: number } = { x: 0, y: 0 };
  ctx: CanvasRenderingContext2D;
  roomLoading: boolean = false;
  loadIcon = faSpinner;
  room2dDimension: { width: number; height: number } = { width: 0, height: 0 };
  scale: number = 1.0;

  canvasWidth: number = 300;
  canvasHeight: number = 300;

  currentRect: { x: number; y: number; width: number; height: number };

  floorPlan = [];
  roomName: string = '';

  errorMessage: string = ' ';
  createFailed: boolean = false;

  currentUser: User;
  invitedUsers: Map<number, User> = new Map<number, User>();

  constructor(
    private roomService: RoomService,
    private userService: UserService
  ) {
    this.userService
      .getCurrentUser()
      .subscribe((user) => (this.currentUser = user));
  }

  ngOnChanges() {
    this.canvasWidth = window.innerWidth * 0.9;
    this.canvasHeight = window.innerHeight * 0.5;
  }

  ngOnInit(): void {
    this.canvasWidth = window.innerWidth * 0.9;
    this.canvasHeight = window.innerHeight * 0.5;
  }

  ngAfterViewChecked(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.lineWidth = 1;
  }

  invitedUsersChange(e) {
    this.invitedUsers = e;
  }

  clientMousePosition(x: number, y: number) {
    return {
      x: x - this.canvas.nativeElement.offsetLeft + window.scrollX,
      y: y - this.canvas.nativeElement.offsetTop + window.scrollY,
    };
  }

  // http://jsfiddle.net/m1erickson/6E2yd/
  mouseDown(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.isDown = true;
    this.startPos = this.clientMousePosition(e.clientX, e.clientY);
  }

  mouseUp(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.isDown = false;

    if (
      !(
        this.floorPlan.length >= 3 ||
        !(this.isLinked && this.hasDrawn && this.valid)
      )
    ) {
      this.saveCurrentRect();
    }
  }

  drawFloorplanRects() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.beginPath();

    for (let rect of this.floorPlan) {
      this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    }
  }

  mouseMove(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (this.isDown) {
      const currentPos = this.clientMousePosition(e.clientX, e.clientY);
      this.isLinked = false;
      this.hasDrawn = true;

      let diff = {
        x: currentPos.x - this.startPos.x,
        y: currentPos.y - this.startPos.y,
      };

      const minX = Math.min(this.startPos.x, currentPos.x);
      const minY = Math.min(this.startPos.y, currentPos.y);
      const maxX = Math.max(this.startPos.x, currentPos.x);
      const maxY = Math.max(this.startPos.y, currentPos.y);

      let lengthToDraw = diff;

      this.drawFloorplanRects();

      for (let rect of this.floorPlan) {
        const rectMinX = Math.min(rect.x, rect.x + rect.width);
        const rectMaxX = Math.max(rect.x, rect.x + rect.width);
        const rectMinY = Math.min(rect.y, rect.y + rect.height);
        const rectMaxY = Math.max(rect.y, rect.y + rect.height);

        const intersectX = rectMinX <= maxX && rectMaxX >= minX;
        const intersectY = rectMinY <= maxY && rectMaxY >= minY;
        if (intersectX && intersectY) {
          if (
            this.startPos.x > rectMinX &&
            this.startPos.x < rectMaxX &&
            this.startPos.y > rectMinY &&
            this.startPos.y < rectMaxY
          ) {
            // contained
            this.valid = false;
          } else {
            this.valid = true;
          }

          this.isLinked = true;
          if (this.startPos.x > rectMaxX || this.startPos.y > rectMaxY) {
            if (Math.abs(rectMaxX - minX) > Math.abs(rectMaxY - minY)) {
              lengthToDraw.y = rectMaxY - this.startPos.y;
            } else {
              lengthToDraw.x = rectMaxX - this.startPos.x;
            }
          } else {
            if (Math.abs(maxX - rectMinX) > Math.abs(maxY - rectMinY)) {
              lengthToDraw.y = rect.y - this.startPos.y;
            } else {
              lengthToDraw.x = rect.x - this.startPos.x;
            }
          }
        }
      }
      if (this.floorPlan.length === 0) {
        this.isLinked = true;
        this.valid = true;
        this.room2dDimension = {
          width: Math.abs(lengthToDraw.x) / 10,
          height: Math.abs(lengthToDraw.y) / 10,
        };
      }

      if (this.valid) {
        this.ctx.strokeRect(
          this.startPos.x,
          this.startPos.y,
          lengthToDraw.x,
          lengthToDraw.y
        );
      }

      this.currentRect = {
        x: this.startPos.x,
        y: this.startPos.y,
        width: lengthToDraw.x,
        height: lengthToDraw.y,
      };
    }
  }

  mouseOut(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.isDown = false;
  }

  saveCurrentRect() {
    this.floorPlan.push(this.currentRect);
    this.hasDrawn = false;
  }

  undoLastRect() {
    this.floorPlan.pop();
    console.log(this.floorPlan);
    this.hasDrawn = false;

    this.drawFloorplanRects();
  }

  createRoom() {
    if (this.roomName.length === 0) {
      this.createFailed = true;
      this.errorMessage = 'Room name is empty!';
      return;
    } else {
      this.createFailed = false;
      this.errorMessage = '';
    }

    this.roomLoading = true;

    let processedRooms: Room2D[] = [];

    this.floorPlan.forEach((room, index) => {
      if (room.width < 0) {
        room.x += room.width;
        room.width = Math.abs(room.width);
      }
      if (room.height < 0) {
        room.y += room.height;
        room.height = Math.abs(room.height);
      }
    });

    const roomOriginX = this.floorPlan[0].x;
    const roomOriginY = this.floorPlan[0].y;

    // shift to origin
    this.floorPlan.forEach((room, index) => {
      room.x -= roomOriginX;
      room.y -= roomOriginY;
    });

    // scale
    this.floorPlan.forEach((room, index) => {
      room.x *= this.scale * 0.1;
      room.y *= this.scale * 0.1;
      room.width = Math.abs(room.width * this.scale * 0.1);
      room.height = Math.abs(room.height * this.scale * 0.1);
    });

    // shift to middle of room
    this.floorPlan.forEach((room, index) => {
      const widthOffset = Math.abs(room.width / 2);
      const heightOffset = Math.abs(room.height / 2);
      room.x += widthOffset;
      room.y += heightOffset;
    });

    const roomScaledOriginX = this.floorPlan[0].x;
    const roomScaledOriginY = this.floorPlan[0].y;

    this.floorPlan.forEach((room, index) => {
      processedRooms.push(
        new Room2D(
          room.x - roomScaledOriginX,
          room.y - roomScaledOriginY,
          room.width,
          room.height
        )
      );
    });

    this.roomService
      .createRoom(
        this.roomName,
        processedRooms,
        Array.from(this.invitedUsers.keys())
      )
      .subscribe((res) => {
        this.roomService.openRoom(res.id, res.roomOwner);
      });
  }
}
