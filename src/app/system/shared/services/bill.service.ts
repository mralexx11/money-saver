import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BillModel} from '../models/bill.model';

@Injectable()
export class BillService {

  constructor(private http: HttpClient) {}

  public url = 'http://localhost:3000';

  getBill(): Observable<BillModel> {
    return this.http.get<BillModel>(`${this.url}/bill`);
  }
  getCurrency(base: string = 'UAH'): Observable<any> {
return this.http.get(`https://api.exchangeratesapi.io/latest?base=${base}`);
  }
}
