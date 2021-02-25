import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrxupdComponent } from './currxupd.component';

describe('CurrxupdComponent', () => {
  let component: CurrxupdComponent;
  let fixture: ComponentFixture<CurrxupdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrxupdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrxupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
