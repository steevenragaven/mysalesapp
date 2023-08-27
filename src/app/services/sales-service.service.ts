import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sale } from '../models/sale.model';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private apiUrl = 'https://saleapi-mfk5.onrender.com';

  constructor(private http: HttpClient) {}

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/sales`);
  }

  getSalesForDate(date: string): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/sales?date=${date}`);
  }

  getSalesByStoreId(storeId: string): Observable<Sale[]> {
    const numericStoreId = parseInt(storeId, 10); // Convert the string to a number
    return this.http.get<Sale[]>(`${this.apiUrl}/sales?storeid=${numericStoreId}`);
  }
  
  moveSalesToCompleted(sales: Sale[]): Observable<any> {
    // Assuming the completed sales endpoint is '/completed-sales'
    return this.http.post(`${this.apiUrl}/completed-sales`, sales);
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
  archiveSales(sale: Sale[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/sale`, sale);
  }
  
  removeSales(saleId: string): Observable<void> {
    const url = `${this.apiUrl}/sales/${saleId}`;
    return this.http.delete<void>(url);
  }
  
}
