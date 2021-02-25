import { TestBed } from '@angular/core/testing';

import { MusicTypeResolverService } from './music-type-resolver.service';

describe('MusicTypeResolverService', () => {
  let service: MusicTypeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicTypeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
