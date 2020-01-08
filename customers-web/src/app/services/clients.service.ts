import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Customer } from '../interfaces/client';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClientsService {
    endpoint = 'http://localhost:8080/';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http: HttpClient) {}

    create(data: Customer) {
        const apiUrl = `${this.endpoint}/customers`;
        return this.http.post(apiUrl, data)
          .pipe(
            catchError(this.errorMgmt)
          );
    }

    findKpis() {
        const apiUrl = `${this.endpoint}/customers/kpis`;
        return this.http.get(apiUrl);
    }

    findAll() {
        const apiUrl = `${this.endpoint}/customers`;
        return this.http.get(apiUrl);
    }

    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      }
}
