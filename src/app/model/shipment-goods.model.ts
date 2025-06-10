import { Goods } from './goods.model';
import { Shipment } from './shipment.model';

export interface ShipmentGoods {
  shipment: Shipment;
  goodsList: Goods[];
}
