import { Injectable } from '@angular/core';
import { NaturalSizeComponent } from '../virtual-room/room/aframe-components/natural-size.component';
import { DraggableComponent } from '../virtual-room/room/aframe-components/draggable.component';
import { SpinnableComponent } from '../virtual-room/room/aframe-components/spinnable.component';
import { TrackPlayerPosition } from '../virtual-room/room/aframe-components/track-player-position.component';
import { AFrame } from 'aframe';

@Injectable({
  providedIn: 'root',
})
export class AframeProviderService {
  aframe: AFrame = (window as any).AFRAME;
  constructor() {
    this.aframe.registerComponent('natural-size', NaturalSizeComponent);

    this.aframe.registerComponent('draggable', DraggableComponent);

    this.aframe.registerComponent('spinnable', SpinnableComponent);

    this.aframe.registerComponent('track-player-position', TrackPlayerPosition);
  }
}
