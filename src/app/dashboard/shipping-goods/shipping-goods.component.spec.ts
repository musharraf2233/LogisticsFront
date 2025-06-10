import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingGoodsComponent } from './shipping-goods.component';

describe('ShippingGoodsComponent', () => {
  let component: ShippingGoodsComponent;
  let fixture: ComponentFixture<ShippingGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingGoodsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
