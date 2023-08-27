import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://saleapi-mfk5.onrender.com';
  private currentUserKey = 'currentUser'; // Key for localStorage

  constructor(private http: HttpClient) {}

  authenticateUser(username: string, userPass: string): Observable<User | null> {
    const apiUrl = `${this.apiUrl}/user?username=${username}&userPass=${userPass}`;
    return this.http.get<User[]>(apiUrl).pipe(
      map(users => {
        const user = users.length > 0 ? users[0] : null;
        if (user) {
          localStorage.setItem(this.currentUserKey, JSON.stringify(user.managesStoreId));
          console.log('User data stored in local storage:', user);
        }
        return user;
      })
    );
  }
  
  

  getCurrentUserStoreId(): string | null {
    const userData = localStorage.getItem(this.currentUserKey);
    if (userData) {
      const user = JSON.parse(userData);
      return user.storeid;
    }
    return null;
  }

  clearCurrentUser() {
    localStorage.removeItem(this.currentUserKey);
  }
  public getUserId(): string  {
    const userData = localStorage.getItem(this.currentUserKey);
    if (userData) {
      const user = JSON.parse(userData);
      return user;
    }
    return '';
  }
  
}
