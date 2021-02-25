import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicdetComponent } from './musicdet.component';

describe('MusicdetComponent', () => {
  let component: MusicdetComponent;
  let fixture: ComponentFixture<MusicdetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicdetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
