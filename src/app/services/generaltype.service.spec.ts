import { TestBed } from '@angular/core/testing';

import { GeneraltypeService } from './generaltype.service';

describe('GeneraltypeService', () => {
  let service: GeneraltypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneraltypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
