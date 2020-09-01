import { TestBed } from '@angular/core/testing';

import { CurrxchgService } from './currxchg.service';

describe('CurrxchgService', () => {
  let service: CurrxchgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrxchgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
