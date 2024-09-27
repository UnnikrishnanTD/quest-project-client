import { TestBed } from '@angular/core/testing';

import { ServerconnectorService } from './serverconnector.service';

describe('ServerconnectorService', () => {
  let service: ServerconnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerconnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
