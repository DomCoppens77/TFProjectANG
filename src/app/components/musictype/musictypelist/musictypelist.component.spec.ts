import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusictypelistComponent } from './musictypelist.component';

describe('MusictypelistComponent', () => {
  let component: MusictypelistComponent;
  let fixture: ComponentFixture<MusictypelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusictypelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusictypelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
