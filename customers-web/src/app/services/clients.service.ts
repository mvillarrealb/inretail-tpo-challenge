import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Customer } from '../interfaces/client';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { CustomerKpi } from '../interfaces/customer.kpi';
import * as moment from 'moment';
@Injectable({
    providedIn: 'root'
})
export class ClientsService {
    endpoint = environment.apiUrl;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(
      private firestore: AngularFirestore
    ) {}

    create(data: Customer) {
      return this.firestore.collection('challenge-customers').add(data);
    }

    async findKpis() {
      return new Promise((resolve) => {
        this.findAll().subscribe((customers: Customer[]) => {
          const ageStandardDeviation = this.calculateStandardDeviation(customers);
          const ageAverage = this.calculateAverage(customers);
          resolve(new CustomerKpi({
            ageAverage,
            ageStandardDeviation
          }));
        });
      });
    }
    calculateStandardDeviation(customersList: Customer[]) {
      const ageAverage = this.calculateAverage(customersList);
      const standardDeviation = customersList.map(customer => customer.age)
      .map(it => Math.pow((it - ageAverage), 2))
      .reduce((acc, curr) => acc + curr, 0.0);
      const divided = standardDeviation / customersList.length;
      return Math.sqrt(divided);
    }
    calculateAverage(customerList) {
      const ageSum = customerList.map(customer => customer.age).reduce((acc, curr) => acc + curr, 0);
      return ageSum / customerList.length;
    }

    findAll() {
      return this.firestore
      .collection('challenge-customers')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
              const data = a.payload.doc.data();
              const customer = data as Customer;
              customer.age = this.age(customer.birthDate);
              customer.probableDeathDate = this.probableDeathDate(customer.age);
              return customer;
          });
      }));
    }
    /**
     * Computes the age of a customer based on its birth date
     * @param customer The customer to calculate its age
     */
    age(birthDate: string) {
      return moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years');
    }
    /**
     * Computes the probable death date of a customer
     * @param customer  The customer to calculate its probable death date
     */
    probableDeathDate(age: number) {
      const deathRange = [70, 75, 80, 85, 90, 95, 100, 105];
      const ageOfDeath = deathRange[Math.floor(Math.random() * deathRange.length)];
      const necessaryAge = ageOfDeath - age;
      return moment().add(necessaryAge, 'years').format('YYYY-MM-DD');
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
