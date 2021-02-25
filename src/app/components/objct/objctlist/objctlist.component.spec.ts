import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjctlistComponent } from './objctlist.component';

describe('ObjctlistComponent', () => {
  let component: ObjctlistComponent;
  let fixture: ComponentFixture<ObjctlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjctlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjctlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
