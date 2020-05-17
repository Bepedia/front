import { TestBed } from '@angular/core/testing';

import { MobileLoaderService } from './mobile-loader.service';

describe('MobileLoaderService', () => {
  let service: MobileLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
