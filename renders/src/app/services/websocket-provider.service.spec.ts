import { TestBed } from '@angular/core/testing';

import { WebsocketProviderService } from './websocket-provider.service';

describe('WebsocketProviderService', () => {
  let service: WebsocketProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
