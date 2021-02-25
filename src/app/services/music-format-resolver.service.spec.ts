import { TestBed } from '@angular/core/testing';

import { MusicFormatResolverService } from './music-format-resolver.service';

describe('MusicFormatResolverService', () => {
  let service: MusicFormatResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicFormatResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
