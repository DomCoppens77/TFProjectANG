import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusictypeupdComponent } from './musictypeupd.component';

describe('MusictypeupdComponent', () => {
  let component: MusictypeupdComponent;
  let fixture: ComponentFixture<MusictypeupdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusictypeupdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusictypeupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
