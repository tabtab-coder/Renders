import { Component } from '@angular/core';
import { Vector3 } from 'three';
import { v4 as uuidv4 } from 'uuid';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { YMap } from 'yjs/dist/src/internals';

// aframe components
import { AframeProviderService } from 'src/app/services/aframe-provider.service';

// app components
import { FurnitureService } from 'src/app/services/furniture.service';
import { Furniture } from 'src/app/shared/model/furniture.model';
import { FurnitureType } from 'src/app/shared/model/furniture-type.model';
import { Room2D } from 'src/app/shared/model/floor-plan.model';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/model/user.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  providers: [FurnitureService],
})
export class RoomComponent {
  mousePosition: { x: number; y: number } = { x: 0, y: 0 };
  furnitures: Map<string, Furniture>;
  availableFurnitures: Array<FurnitureType> = [];
  toLoadFurnitures: Array<FurnitureType> = [];
  currentFurniture: FurnitureType | undefined;
  ghostFurniturePosition: Vector3 = new Vector3();
  nextId = 0;
  floorPlan: Room2D[] = [];
  availableFurnituresLoaded: boolean = false;
  doc: Y.Doc;
  ymap: YMap<any>;
  wsProvider: WebsocketProvider;

  aframe = (window as any).AFRAME;
  user: User;
  userColor: string;
  states: Map<number, Object> = new Map<number, Object>();
  otherPlayersStates: Map<number, Object> = new Map<number, Object>();
  awareness;
  targetedFurniture: string = null;

  constructor(
    private furnitureService: FurnitureService,
    private roomService: RoomService,
    private userService: UserService,
    private route: ActivatedRoute,
    private aframeProvider: AframeProviderService
  ) {}

  placeNewYFurniture(uuid: string, furniture: Furniture): void {
    // console.log('placing new furniture', furniture);
    const yfunriture = {
      furnitureType: furniture.furnitureType,
      position: furniture.position,
      rotation: furniture.rotation,
      scale: furniture.scale,
    };
    this.ymap.set(uuid, yfunriture);
  }

  randomColorGenerator() {
    let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    while (color.length < 6) {
      color = color + '0';
    }
    return color;
  }

  onRightClickPressed(e: Event) {
    e.preventDefault();
  }

  // initialize util component
  ngOnInit() {
    this.userColor = this.randomColorGenerator();
    this.doc = new Y.Doc();

    this.route.queryParams.subscribe((params) => {
      this.roomService.getRoom(params['roomId']).subscribe((room) => {
        this.floorPlan = room.floorPlan;
        document.cookie = `roomName = ${room.id}; roomOwner = ${params['roomOwner']}`;

        this.wsProvider = new WebsocketProvider(
          environment.socketUrl, // don't change this!
          'yjs', // don't change this!
          this.doc,
          { params: { roomName: room.id.toString() } }
        );
        this.awareness = this.wsProvider.awareness;

        this.ymap = this.doc.getMap('furniture');

        this.ymap.forEach((key) => {
          this.loadNewFurniture(key, this.ymap.get(key));
        });

        this.ymap.observe((ymapEvent) => {
          ymapEvent.changes.keys.forEach((change, key) => {
            if (change.action == 'delete') {
              this.furnitures.delete(key);
            } else {
              // add or update event
              this.loadNewFurniture(key, this.ymap.get(key));
            }
          });
        });

        this.userService.getCurrentUser().subscribe((user) => {
          this.user = user;

          this.awareness.setLocalState({
            id: this.user.id,
            username: this.user.username,
            color: this.userColor,
            position: { x: 0, y: 1.6, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            interactingFurniture: null,
          });

          this.states = this.awareness.getStates();
          this.otherPlayersStates = new Map(
            JSON.parse(JSON.stringify(Array.from(this.states)))
          );
          this.otherPlayersStates.delete(this.awareness.clientID);

          this.awareness.on('change', (changes) => {
            this.states = this.awareness.getStates();
            this.otherPlayersStates = new Map(
              JSON.parse(JSON.stringify(Array.from(this.states)))
            );
            this.otherPlayersStates.delete(this.awareness.clientID);
          });
        });
      });
    });

    this.furnitures = new Map<string, Furniture>();

    // get available furnitures
    this.furnitureService.searchFurniture('', 6, 0).subscribe((furniture) => {
      this.availableFurnitures = furniture;

      // default selected furniture
      this.currentFurniture = this.availableFurnitures[0];
      this.availableFurnituresLoaded = true;
    });

    this.furnitureService.searchFurniture('', 20, 0).subscribe((furniture) => {
      this.toLoadFurnitures = furniture;
    });

    // disable right click menu
    document.addEventListener('contextmenu', this.onRightClickPressed, false);

    document.addEventListener('keydown', (e) => {
      if (this.targetedFurniture !== null) {
        if (e.code === 'Backspace') {
          this.ymap.delete(this.targetedFurniture);
          this.targetFurniture(this.targetedFurniture); // set to null
        }

        const furniture = this.ymap.get(this.targetedFurniture);
        if (furniture) {
          if (e.code === 'Equal') {
            let scale = (furniture.scale.x += 0.01);
            furniture.scale = new Vector3(scale, scale, scale);
          }
          if (e.code === 'Minus') {
            let scale = (furniture.scale.x -= 0.01);
            furniture.scale = new Vector3(scale, scale, scale);
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.disconnect();
  }

  loadNewFurniture(uuid: string, furniture: Furniture) {
    // console.log('loading new furniture', furniture)
    this.furnitures.set(uuid, furniture);
  }

  updateFurniture(furniture: { id: string; furniture: Furniture }) {
    // console.log('updating furniture', furniture)
    this.placeNewYFurniture(furniture.id, furniture.furniture);
  }

  placeFurniture(e: CustomEvent) {
    const mouseEvent = e.detail.mouseEvent;
    // console.log('placing2 furniture');

    if (
      this.mousePosition.x === mouseEvent.screenX &&
      this.mousePosition.y === mouseEvent.screenY
    ) {
      const newUuid = uuidv4();
      const newFurniture = new Furniture(
        this.currentFurniture,
        0,
        e.detail.intersection.point,
        this.currentFurniture.defaultScale
      );
      this.furnitures.set(newUuid, newFurniture);
      this.placeNewYFurniture(newUuid, newFurniture);
      this.updatePlayerInteractFurniture(newUuid);
    }
  }

  mouseDown($e: CustomEvent) {
    this.mousePosition = {
      x: $e.detail.mouseEvent.screenX,
      y: $e.detail.mouseEvent.screenY,
    };
  }

  changeFurniture(e: FurnitureType) {
    this.currentFurniture = e;
  }

  searchFurniture(e) {
    this.furnitureService
      .searchFurniture(e.searchString, e.limit, e.page)
      .subscribe((furniture) => {
        this.availableFurnitures = furniture;
      });
  }

  trackFurniture(index: number, furniture: any) {
    return furniture.key;
  }

  saveFurniture() {
    this.route.queryParams.subscribe((params) => {
      this.roomService
        .saveFurniture(params['roomId'], Array.from(this.furnitures.values()))
        .subscribe((furniture) => {
          console.log('furniture saved');
        });
    });
  }

  disconnect() {
    this.wsProvider.disconnect();
    this.awareness.destroy();
  }

  updatePlayerPosition(position) {
    if (this.awareness) {
      this.awareness.setLocalStateField('position', position.detail.position);
      this.awareness.setLocalStateField('rotation', position.detail.rotation);
    }
  }

  updatePlayerInteractFurniture(id: string) {
    if (this.awareness) {
      this.awareness.setLocalStateField('interactingFurniture', id);
    }
  }

  targetFurniture(id: string) {
    if (typeof id === 'string') {
      if (this.targetedFurniture === id) {
        this.targetedFurniture = null;
      } else {
        this.targetedFurniture = id;
      }

      if (this.awareness) {
        this.awareness.setLocalStateField(
          'interactingFurniture',
          this.targetedFurniture
        );
      }
    }
  }
}
