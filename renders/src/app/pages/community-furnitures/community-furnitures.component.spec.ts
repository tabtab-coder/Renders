import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityFurnituresComponent } from './community-furnitures.component';

describe('CommunityFurnituresComponent', () => {
  let component: CommunityFurnituresComponent;
  let fixture: ComponentFixture<CommunityFurnituresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityFurnituresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityFurnituresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
