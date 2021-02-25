import { TestBed } from '@angular/core/testing';

import { LstbandResolverService } from './lstband-resolver.service';

describe('LstbandResolverService', () => {
  let service: LstbandResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LstbandResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
