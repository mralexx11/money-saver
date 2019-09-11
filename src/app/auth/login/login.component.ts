import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersServices} from '../../shared/services/users.services';
import {UserModel} from '../../shared/models/user.model';

@Component({
  selector: 'ohr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private usersService: UsersServices
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: UserModel) => {
       if (user) {
         if (user.password === formData.password) {

         } else {
           alert('Wrong pass');
         }
       } else {
         alert('No user exist');
       }
      });
  }
}
