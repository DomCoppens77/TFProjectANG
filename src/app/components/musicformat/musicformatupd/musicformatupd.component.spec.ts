import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicformatupdComponent } from './musicformatupd.component';

describe('MusicformatupdComponent', () => {
  let component: MusicformatupdComponent;
  let fixture: ComponentFixture<MusicformatupdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicformatupdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicformatupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
