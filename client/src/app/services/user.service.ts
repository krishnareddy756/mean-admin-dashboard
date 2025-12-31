import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:5000/api/users';
  private tok: string | null;

  constructor(private http: HttpClient) {
    this.tok = localStorage.getItem('token');
  }

  // GET ALL USERS
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url, {
      headers: { Authorization: `Bearer ${this.tok}` },
    });
  }

  // GET USER BY ID
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`, {
      headers: { Authorization: `Bearer ${this.tok}` },
    });
  }

  // UPDATE USER
  update(id: string, usr: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, usr, {
      headers: { Authorization: `Bearer ${this.tok}` },
    });
  }

  // DELETE USER
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`, {
      headers: { Authorization: `Bearer ${this.tok}` },
    });
  }

  // TOGGLE STATUS
  toggleStatus(id: string, status: string): Observable<any> {
    return this.http.patch<any>(
      `${this.url}/${id}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${this.tok}` },
      }
    );
  }
}
