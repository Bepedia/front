import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NendoroidsHomeComponent } from './nendoroids-home.component';

describe('NendoroidsHomeComponent', () => {
  let component: NendoroidsHomeComponent;
  let fixture: ComponentFixture<NendoroidsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NendoroidsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NendoroidsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
