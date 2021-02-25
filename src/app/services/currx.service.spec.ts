import { TestBed } from '@angular/core/testing';

import { CurrxService } from './currx.service';

describe('CurrxService', () => {
  let service: CurrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
