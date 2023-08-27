import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sale } from '../models/sale.model';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private apiUrl = 'http://localhost:3000'; // Replace with your server URL

  constructor(private http: HttpClient) {}

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/sales`);
  }

  getSalesForDate(date: string): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/sales?date=${date}`);
  }

  addSale(sale: Sale): Observable<any> {
    return this.http.post(`${this.apiUrl}/sales`, sale);
  }

  editSale(sale: Sale): Observable<any> {
    return this.http.put(`${this.apiUrl}/sales/${sale.id}`, sale);
  }

  removeSale(saleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/sales/${saleId}`);
  }
}
