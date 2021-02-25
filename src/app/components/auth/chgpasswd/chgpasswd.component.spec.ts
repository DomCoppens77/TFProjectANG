import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChgpasswdComponent } from './chgpasswd.component';

describe('ChgpasswdComponent', () => {
  let component: ChgpasswdComponent;
  let fixture: ComponentFixture<ChgpasswdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChgpasswdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChgpasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
