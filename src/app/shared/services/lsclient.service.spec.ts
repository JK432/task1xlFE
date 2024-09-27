import { TestBed } from '@angular/core/testing';

import { LsclientService } from './lsclient.service';

describe('LsclientService', () => {
  let service: LsclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LsclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
