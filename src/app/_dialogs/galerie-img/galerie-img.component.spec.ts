import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalerieImgComponent } from './galerie-img.component';

describe('GalerieImgComponent', () => {
  let component: GalerieImgComponent;
  let fixture: ComponentFixture<GalerieImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalerieImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalerieImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
