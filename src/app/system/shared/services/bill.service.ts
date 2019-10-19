import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BillModel} from '../models/bill.model';
import {BaseApi} from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<BillModel> {
    return this.get(`/bill`);
  }
  getCurrency(base: string = 'USD'): Observable<any> {
return this.http.get(`https://api.exchangeratesapi.io/latest?base=${base}`);
  }
}
