import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicformatlistComponent } from './musicformatlist.component';

describe('MusicformatlistComponent', () => {
  let component: MusicformatlistComponent;
  let fixture: ComponentFixture<MusicformatlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicformatlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicformatlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
