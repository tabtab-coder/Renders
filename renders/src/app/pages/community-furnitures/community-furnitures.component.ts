import { Component, OnInit } from '@angular/core';
import { FurnitureService } from 'src/app/services/furniture.service';
import { FurnitureType } from 'src/app/shared/model/furniture-type.model';

@Component({
  selector: 'app-community-furnitures',
  templateUrl: './community-furnitures.component.html',
  styleUrls: ['./community-furnitures.component.scss'],
})
export class CommunityFurnituresComponent implements OnInit {
  furniture: FurnitureType[];
  selectedFurniture: FurnitureType;
  searchFurniture: string;
  timer: any;
  constructor(private furnitureService: FurnitureService) {}

  ngOnInit(): void {
    this.furnitureService.searchFurniture('', 20, 0).subscribe((furniture) => {
      this.furniture = furniture;
      this.selectedFurniture = furniture[0];
    });
  }

  changeFurniture(f: FurnitureType) {
    this.selectedFurniture = f;
  }

  search() {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.furnitureService
        .searchFurniture(this.searchFurniture, 20, 0)
        .subscribe((furniture) => {
          this.furniture = furniture;
        });
    }, 300);
  }
}
