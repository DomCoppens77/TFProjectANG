import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrydetComponent } from './countrydet.component';

describe('CountrydetComponent', () => {
  let component: CountrydetComponent;
  let fixture: ComponentFixture<CountrydetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrydetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrydetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
