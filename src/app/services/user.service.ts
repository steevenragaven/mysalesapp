import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000'; // Update with your API endpoint URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`);
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`);
  }

  updateUser(id: number, updatedUser: User): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/user/${id}`, updatedUser);
  }

  createUser(newUser: User): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/user`, newUser);
  }
}
