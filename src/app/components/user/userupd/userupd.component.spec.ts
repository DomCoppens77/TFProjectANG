import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserupdComponent } from './userupd.component';

describe('UserupdComponent', () => {
  let component: UserupdComponent;
  let fixture: ComponentFixture<UserupdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserupdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
