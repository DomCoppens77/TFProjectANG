import { TestBed } from '@angular/core/testing';

import { GentypeService } from './gentype.service';

describe('GentypeService', () => {
  let service: GentypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GentypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
