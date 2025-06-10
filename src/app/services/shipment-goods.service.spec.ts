import { TestBed } from '@angular/core/testing';

import { ShipmentGoodsService } from './shipment-goods.service';

describe('ShipmentGoodsService', () => {
  let service: ShipmentGoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentGoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
