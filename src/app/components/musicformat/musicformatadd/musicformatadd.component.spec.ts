import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicformataddComponent } from './musicformatadd.component';

describe('MusicformataddComponent', () => {
  let component: MusicformataddComponent;
  let fixture: ComponentFixture<MusicformataddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicformataddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicformataddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
