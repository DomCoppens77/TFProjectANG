import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyupdComponent } from './currencyupd.component';

describe('CurrencyupdComponent', () => {
  let component: CurrencyupdComponent;
  let fixture: ComponentFixture<CurrencyupdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyupdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
