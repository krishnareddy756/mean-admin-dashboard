import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private url = `${environment.apiUrl}/analytics`;
  private tok: string | null;

  constructor(private http: HttpClient) {
    this.tok = localStorage.getItem('token');
  }

  // GET ANALYTICS DATA
  getData(startDate?: string, endDate?: string): Observable<any[]> {
    let endpoint = this.url;
    if (startDate && endDate) {
      endpoint += `?startDate=${startDate}&endDate=${endDate}`;
    }

    return this.http.get<any[]>(endpoint, {
      headers: { Authorization: `Bearer ${this.tok}` },
    });
  }

  // GET SUMMARY STATS
  getSummary(startDate?: string, endDate?: string): Observable<any> {
    let endpoint = `${this.url}/summary`;
    if (startDate && endDate) {
      endpoint += `?startDate=${startDate}&endDate=${endDate}`;
    }

    return this.http.get<any>(endpoint, {
      headers: { Authorization: `Bearer ${this.tok}` },
    });
  }
}
