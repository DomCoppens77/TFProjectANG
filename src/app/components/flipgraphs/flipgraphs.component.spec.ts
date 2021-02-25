import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipgraphsComponent } from './flipgraphs.component';

describe('FlipgraphsComponent', () => {
  let component: FlipgraphsComponent;
  let fixture: ComponentFixture<FlipgraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipgraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipgraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
