import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerconnectorService {

  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors
  private handleError(error: any): Observable<never> {
    return throwError(error);
  }
}
