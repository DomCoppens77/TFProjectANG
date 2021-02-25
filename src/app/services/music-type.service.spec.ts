import { TestBed } from '@angular/core/testing';

import { MusicTypeService } from './music-type.service';

describe('MusicTypeService', () => {
  let service: MusicTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
