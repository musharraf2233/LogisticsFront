import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Goods } from '../model/goods.model';
import { Observable } from 'rxjs';
import { HsCode } from '../model/hscode.model';

@Injectable({
  providedIn: 'root',
})
export class GoodsServiceService {
  private baseUrl = 'http://localhost:8080/goods';

  constructor(private http: HttpClient) {}

  // Get all goods
  getGoods(): Observable<Goods[]> {
    return this.http.get<Goods[]>(`${this.baseUrl}/getGoods`);
  }

  // Get goods by ID
  getGoodsById(id: number): Observable<Goods> {
    return this.http.get<Goods>(`${this.baseUrl}/getGoods/${id}`);
  }

  // Search HS Codes by keyword (commodity name)
  searchHsCode(keyword: string): Observable<HsCode[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<HsCode[]>(`${this.baseUrl}/byName`, { params });
  }

  // Get all HS Codes
  getHsCodes(): Observable<HsCode[]> {
    return this.http.get<HsCode[]>(`${this.baseUrl}`);
  }
}
