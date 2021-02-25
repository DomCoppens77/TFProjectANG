import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrxlistComponent } from './currxlist.component';

describe('CurrxlistComponent', () => {
  let component: CurrxlistComponent;
  let fixture: ComponentFixture<CurrxlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrxlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrxlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
