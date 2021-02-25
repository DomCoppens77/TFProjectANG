import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GentypelistComponent } from './gentypelist.component';

describe('GentypelistComponent', () => {
  let component: GentypelistComponent;
  let fixture: ComponentFixture<GentypelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GentypelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GentypelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
