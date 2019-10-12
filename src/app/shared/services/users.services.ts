import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import { map } from 'rxjs/operators';
import {BaseApi} from '../core/base-api';

@Injectable()

export class UsersServices extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }
  getUserByEmail(email: string): Observable<UserModel> {
    return this.get(`/users?email=${email}`)
      .pipe(
        map((user: UserModel) => user[0] ? user[0] : undefined)
      );
  }

  createNewUser(user: UserModel): Observable<any> {
    return this.post(`/users`, user);
  }
}
