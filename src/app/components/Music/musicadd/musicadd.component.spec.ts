import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicaddComponent } from './musicadd.component';

describe('MusicaddComponent', () => {
  let component: MusicaddComponent;
  let fixture: ComponentFixture<MusicaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
