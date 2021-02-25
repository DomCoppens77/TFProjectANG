import { TestBed } from '@angular/core/testing';

import { MusicFormatService } from './music-format.service';

describe('MusicFormatService', () => {
  let service: MusicFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
