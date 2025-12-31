import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.apiUrl}/auth`;
  private currUser$ = new BehaviorSubject<any>(null);
  public currentUser$ = this.currUser$.asObservable();

  constructor(private http: HttpClient) {
    this.load();
  }

  // EMAIL LOGIN
  emailLogin(email: string, pwd: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { email, pwd }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.currUser$.next(res.user);
      })
    );
  }

  // GOOGLE LOGIN
  googleLogin(gId: string, email: string, name: string, pic: string): Observable<any> {
    return this.http
      .post(`${this.url}/google-login`, { googleId: gId, email, name, profilePicture: pic })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
          this.currUser$.next(res.user);
        })
      );
  }

  // GET CURRENT USER
  getCurrent(): Observable<any> {
    return this.http.get(`${this.url}/me`, {
      headers: { Authorization: `Bearer ${this.getTok()}` },
    });
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem('token');
    this.currUser$.next(null);
  }

  // GET TOKEN
  getTok(): string | null {
    return localStorage.getItem('token');
  }

  // CHECK IF LOGGED IN
  isLoggedIn(): boolean {
    return !!this.getTok();
  }

  // CHECK IF ADMIN
  isAdmin(): boolean {
    const usr = this.currUser$.value;
    return usr && usr.role === 'Admin';
  }

  // LOAD USER ON INIT
  private load(): void {
    const tok = this.getTok();
    if (tok) {
      this.getCurrent().subscribe(
        (usr) => this.currUser$.next(usr),
        () => this.logout()
      );
    }
  }
}
