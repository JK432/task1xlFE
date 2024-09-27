import { TestBed } from '@angular/core/testing';

import { PresurveyCalculationsService } from './presurvey-calculations.service';

describe('PresurveyCalculationsService', () => {
  let service: PresurveyCalculationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresurveyCalculationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
