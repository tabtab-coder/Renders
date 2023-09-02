export class CreateRoomDto {
  readonly roomOwner: number;
  readonly name: string;
  readonly roomParticipants: number[];
  readonly floorPlan: []; //{ x: number; y: number; width: number; height: number }
}
