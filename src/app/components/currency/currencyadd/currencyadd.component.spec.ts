import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyaddComponent } from './currencyadd.component';

describe('CurrencyaddComponent', () => {
  let component: CurrencyaddComponent;
  let fixture: ComponentFixture<CurrencyaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
