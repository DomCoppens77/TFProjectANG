import { TestBed } from '@angular/core/testing';

import { MusicResolverService } from './musicresolver.service';

describe('MusicresolverService', () => {
  let service: MusicResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
