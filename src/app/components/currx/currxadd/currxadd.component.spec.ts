import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrxaddComponent } from './currxadd.component';

describe('CurrxaddComponent', () => {
  let component: CurrxaddComponent;
  let fixture: ComponentFixture<CurrxaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrxaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrxaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
