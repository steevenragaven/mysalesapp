import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = 'https://saleapi-mfk5.onrender.com';

  constructor(private http: HttpClient) {}

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiUrl}/store`);
  }
  updateStore(storeId: number, updatedStore: Store): Observable<any> {
    const url = `${this.apiUrl}/store/${storeId}`;
    return this.http.put(url, updatedStore);
  }
  getStoreById(id: number): Observable<Store | undefined> {
    return this.http.get<Store>(`${this.apiUrl}/store/${id}`);
  }

  closeStore(storeId: string): Observable<any> {
    const url = `${this.apiUrl}/store/${storeId}`;
    return this.http.delete(url);
  }

  addStore(store: Store): Observable<any> {
    return this.http.post(`${this.apiUrl}/store`, store);
  }
  updateStoreTotalSales(storeId: string, additionalSales: number): Observable<any> {
    const url = `${this.apiUrl}/store/${storeId}`;
  
    // Fetch the current store data from the server
    return this.http.get(url).pipe(
      switchMap((storeData: any) => {
        const currentTotalSales = storeData.totalsales;
        const newTotalSales = currentTotalSales + additionalSales;
  
        // Prepare the updated data to send to the server
        const updatedData = { totalsales: newTotalSales };
  
        // Update the store data on the server
        return this.http.patch(url, updatedData);
      })
    );
  }
  
}
