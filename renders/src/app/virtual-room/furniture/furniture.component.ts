import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Furniture } from 'src/app/shared/model/furniture.model';

@Component({
  selector: '[app-furniture]',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.scss'],
})
export class FurnitureComponent implements OnInit {
  @Input() furniture: Furniture;
  @Input() furnitureId: string;
  @Input() isTargeted: boolean;
  @Output() moveFurniture: EventEmitter<{ id: string; furniture: Furniture }> =
    new EventEmitter<{ id: string; furniture: Furniture }>();
  @Output() interactingFurniture: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() targetFurniture: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    // console.log(this.furniture);
  }

  furnitureMove(newFurniture: Furniture) {
    this.moveFurniture.emit({ id: this.furnitureId, furniture: newFurniture });
  }

  updateFurniturePosition(e: CustomEvent) {
    this.furniture.position = e.detail;
    this.furnitureMove(this.furniture);
  }

  updateFurnitureRotation(e: CustomEvent) {
    this.furniture.rotation = e.detail;
    this.furnitureMove(this.furniture);
  }

  updateFurnitureScale(e: CustomEvent) {
    this.furniture.scale = e.detail;
    this.furnitureMove(this.furniture);
  }

  updatingFurnitureStart(e: CustomEvent) {
    this.interactingFurniture.emit(e.detail);
  }

  updatingFurnitureEnd(e: CustomEvent) {
    this.interactingFurniture.emit(null);
  }

  targetingFurniture(e: CustomEvent) {
    this.targetFurniture.emit(e.detail);
  }
}
