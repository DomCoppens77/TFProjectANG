import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryupdComponent } from './countryupd.component';

describe('CountryupdComponent', () => {
  let component: CountryupdComponent;
  let fixture: ComponentFixture<CountryupdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryupdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
