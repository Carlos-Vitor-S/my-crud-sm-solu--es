import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inUser, inUserResponse } from 'src/app/interfaces/in-user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private url: string = `${environment.baseUrl}/users?page=1`;

  private baseUrl: string = `${environment.baseUrl}`;

  getUsers(numberPage: number): Observable<inUserResponse> {
    return this.http.get<inUserResponse>(
      `${this.baseUrl}users?page=${numberPage}`
    );
  }

  addUser(user: inUser): Observable<inUser> {
    return this.http.post<inUser>(`${this.baseUrl}users?page=2`, user);
  }

  deleteUser(id: number): Observable<inUser> {
    return this.http.delete<inUser>(`${this.baseUrl}users/${id}`);
  }

  updateUser(user: inUser): Observable<inUser> {
    return this.http.put<inUser>(`${this.baseUrl}user/${user.id}`, user);
  }
}
