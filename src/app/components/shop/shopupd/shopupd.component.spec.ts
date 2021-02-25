import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopupdComponent } from './shopupd.component';

describe('ShopupdComponent', () => {
  let component: ShopupdComponent;
  let fixture: ComponentFixture<ShopupdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopupdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
