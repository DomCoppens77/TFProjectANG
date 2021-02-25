import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusictypeaddComponent } from './musictypeadd.component';

describe('MusictypeaddComponent', () => {
  let component: MusictypeaddComponent;
  let fixture: ComponentFixture<MusictypeaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusictypeaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusictypeaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
