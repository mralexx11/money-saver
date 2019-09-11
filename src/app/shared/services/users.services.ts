import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable()

export class UsersServices {
  constructor(private http: HttpClient) {

  }
  public url = 'http://localhost:3000';
  getUserByEmail(email: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.url}/users?email=${email}`, {responseType: 'json'})
      .pipe(
        map((user: UserModel) => user[0] ? user[0] : undefined)
      );
  }
}
