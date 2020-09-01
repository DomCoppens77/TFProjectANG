import { TestBed } from '@angular/core/testing';

import { ApiResolverService } from './api-resolver.service';

describe('ApiResolverService', () => {
  let service: ApiResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
