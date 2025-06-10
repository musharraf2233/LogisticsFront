import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HsCode } from '../model/hscode.model';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HscodeService {
  private baseUrl = 'http://localhost:8080/hscode';

  constructor(private http: HttpClient) {}

  // GET: /hscode
  getAllHsCodes(): Observable<HsCode[]> {
    return this.http.get<HsCode[]>(`${this.baseUrl}`);
  }

  searchHsCode(keyword: string): Observable<HsCode[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<HsCode[]>(`${this.baseUrl}/byName`, { params });
  }

  // GET: /hscode/byName?keyword=abc
  findHsCodeByKeyword(keyword: string): Observable<HsCode[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<HsCode[]>(`${this.baseUrl}/byName`, { params });
  }

  findHsCodeByDescription(description: string): Observable<HsCode[]> {
    const params = new HttpParams().set('keyword', description);
    return this.http.get<HsCode[]>(`${this.baseUrl}/byName`, { params });
  }
}
