import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = 'http://localhost:3000'; // Replace with your server URL

  constructor(private http: HttpClient) {}

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiUrl}/store`);
  }

  getStoreById(id: number): Observable<Store | undefined> {
    return this.http.get<Store>(`${this.apiUrl}/store/${id}`);
  }

  closeStore(storeId: string): Observable<any> {
    const url = `${this.apiUrl}/stores/${storeId}`;
    return this.http.delete(url);
  }

  addStore(store: Store): Observable<any> {
    return this.http.post(`${this.apiUrl}/store`, store);
  }
}
