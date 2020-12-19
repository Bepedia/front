import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NendoroidsComponent } from './nendoroids.component';

describe('NendoroidsComponent', () => {
  let component: NendoroidsComponent;
  let fixture: ComponentFixture<NendoroidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NendoroidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NendoroidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
