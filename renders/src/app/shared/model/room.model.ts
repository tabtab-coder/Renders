import { Room2D } from './floor-plan.model';
import { User } from './user.model';

export class Room {
  id: number;
  roomOwner: number;
  name: string;
  roomParticipants: User[];
  floorPlan: Room2D[];
}
