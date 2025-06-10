import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShipmentGoods } from '../model/shipment-goods.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShipmentGoodsService {
  private baseUrl = 'http://localhost:8080/shipmentGoods'; // update this if your backend root URL changes

  constructor(private http: HttpClient) {}

  // Add Shipment + Goods
  addShipmentGoods(sg: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addShipmentGoods`, sg);
  }

  // Get all ShipmentGoods
  getAllShipmentGoods(): Observable<ShipmentGoods[]> {
    return this.http.get<ShipmentGoods[]>(`${this.baseUrl}/getShipmentGoods`);
  }

  // Get ShipmentGoods by ID
  getShipmentGoodsById(id: number): Observable<ShipmentGoods> {
    return this.http.get<ShipmentGoods>(
      `${this.baseUrl}/getShipmentGoodsById/${id}`
    );
  }

  // Update ShipmentGoods
  updateShipmentGoods(
    id: number,
    sg: ShipmentGoods
  ): Observable<ShipmentGoods> {
    return this.http.put<ShipmentGoods>(
      `${this.baseUrl}/updateShipmentGoods/${id}`,
      sg
    );
  }
}
