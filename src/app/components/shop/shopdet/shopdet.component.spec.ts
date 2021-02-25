import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopdetComponent } from './shopdet.component';

describe('ShopdetComponent', () => {
  let component: ShopdetComponent;
  let fixture: ComponentFixture<ShopdetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopdetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
