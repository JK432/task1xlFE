import { TestBed } from '@angular/core/testing';

import { IndexdbClientService } from './indexdb-client.service';

describe('IndexdbClientService', () => {
  let service: IndexdbClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexdbClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
