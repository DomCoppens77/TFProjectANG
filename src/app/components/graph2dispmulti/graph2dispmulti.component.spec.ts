import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Graph2dispmultiComponent } from './graph2dispmulti.component';

describe('Graph2dispmultiComponent', () => {
  let component: Graph2dispmultiComponent;
  let fixture: ComponentFixture<Graph2dispmultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Graph2dispmultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Graph2dispmultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
