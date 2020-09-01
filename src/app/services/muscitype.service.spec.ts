import { TestBed } from '@angular/core/testing';

import { MuscitypeService } from './muscitype.service';

describe('MuscitypeService', () => {
  let service: MuscitypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuscitypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
