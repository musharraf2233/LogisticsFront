import { TestBed } from '@angular/core/testing';

import { GoodsServiceService } from './goods-service.service';

describe('GoodsServiceService', () => {
  let service: GoodsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
