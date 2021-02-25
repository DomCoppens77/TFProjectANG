import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicupdComponent } from './musicupd.component';

describe('MusicupdComponent', () => {
  let component: MusicupdComponent;
  let fixture: ComponentFixture<MusicupdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicupdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
