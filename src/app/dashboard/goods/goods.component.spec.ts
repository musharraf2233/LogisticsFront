import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsComponent } from './goods.component';

describe('GoodsComponent', () => {
  let component: GoodsComponent;
  let fixture: ComponentFixture<GoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoodsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
