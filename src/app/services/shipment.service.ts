import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shipment } from '../model/shipment.model';

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  private apiUrl = 'http://localhost:8080/shipment'; // Change as needed

  constructor(private http: HttpClient) {}

  // Get all shipments
  getAllShipments(): Observable<any> {
    return this.http.get<Shipment[]>(`${this.apiUrl}/allShipments`);
  }

  // Get shipment by ID
  getShipmentById(id: number): Observable<Shipment> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Shipment>(`${this.apiUrl}/shipmentsById`, {
      params,
    });
  }

  // Update shipment by ID
  updateShipment(id: number, shipment: Shipment): Observable<Shipment> {
    return this.http.put<Shipment>(`${this.apiUrl}/update/${id}`, shipment);
  }

  // Delete shipment by ID
  deleteShipment(id: number): Observable<string> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<string>(`${this.apiUrl}/deleteShipment`, {
      params,
    });
  }
}
