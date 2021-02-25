import { TestBed } from '@angular/core/testing';

import { User2ResolverService } from './user2-resolver.service';

describe('User2ResolverService', () => {
  let service: User2ResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(User2ResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
