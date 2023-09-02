import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FurnitureType } from 'src/app/shared/model/furniture-type.model';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { faMouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss'],
})
export class HudComponent implements OnInit {
  @Input() currentFurniture: FurnitureType;
  @Input() furnitures: FurnitureType[];
  @Input() players;
  @Output() changeFurniture = new EventEmitter<FurnitureType>();
  @Output() searchFurniture = new EventEmitter();
  @Output() saveFurniture = new EventEmitter();
  @Output() disconnect = new EventEmitter();

  rightArrow = faArrowRight;
  leftArrow = faArrowLeft;
  downArrow = faArrowDown;
  upArrow = faArrowUp;
  backspace = faBackspace;
  mouse = faMouse;

  searchItem: string;
  menuClosed: boolean = true;
  timer: any;
  helpVisible: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  selectFurniture(e: FurnitureType) {
    // console.log(e);
    this.menuClosed = true;
    this.changeFurniture.emit(e);
  }

  search() {
    const queryParams = {
      searchString: this.searchItem,
      page: 0,
      limit: 6,
    };
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.searchFurniture.emit(queryParams);
    }, 300);
  }

  back() {
    this.disconnect.emit();
    this.router.navigate(['/dashboard']);
  }

  save() {
    this.saveFurniture.emit();
  }

  showHelp() {
    this.helpVisible = true;
  }
}
