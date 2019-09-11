import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';

@Injectable()

export class UsersServices {
  constructor(private http: HttpClient) {

  }
  getUserByEmail(email: string): Observable<UserModel> {
    return this.http.get<UserModel>(`http://localhost:3000/users?email=${email}`);
  }
}
