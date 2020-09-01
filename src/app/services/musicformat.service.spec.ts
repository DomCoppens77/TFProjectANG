import { TestBed } from '@angular/core/testing';

import { MusicformatService } from './musicformat.service';

describe('MusicformatService', () => {
  let service: MusicformatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicformatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
