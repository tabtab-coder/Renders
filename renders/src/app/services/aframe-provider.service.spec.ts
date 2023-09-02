import { TestBed } from '@angular/core/testing';

import { AframeProviderService } from './aframe-provider.service';

describe('AframeProviderService', () => {
  let service: AframeProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AframeProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
