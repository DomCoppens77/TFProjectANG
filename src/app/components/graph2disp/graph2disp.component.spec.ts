import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Graph2dispComponent } from './graph2disp.component';

describe('Graph2dispComponent', () => {
  let component: Graph2dispComponent;
  let fixture: ComponentFixture<Graph2dispComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Graph2dispComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Graph2dispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
