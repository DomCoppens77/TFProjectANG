import { TestBed } from '@angular/core/testing';

import { CurrxResolverService } from './currx-resolver.service';

describe('CurrxResolverService', () => {
  let service: CurrxResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrxResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
