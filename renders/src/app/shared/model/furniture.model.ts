import { Vector3 } from 'three';
import { FurnitureType } from './furniture-type.model';

export class Furniture {
  id: number;
  furnitureType: FurnitureType; // foreign key
  roomId: number;
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;

  constructor(
    furnitureType: FurnitureType,
    roomId: number,
    position: any,
    scale: number
  ) {
    this.furnitureType = furnitureType;
    this.roomId = roomId;
    this.position = position;
    this.rotation = new Vector3();
    this.scale = new Vector3(scale, scale, scale);
  }
}
