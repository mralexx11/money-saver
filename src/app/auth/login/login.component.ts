import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {UsersServices} from '../../shared/services/users.services';
import {UserModel} from '../../shared/models/user.model';
import {MessageModel} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'ohr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: MessageModel;

  constructor(
    private usersService: UsersServices,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.message = new MessageModel('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage('Now you can login', 'success');
      }
    });


    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
      this.message = new MessageModel(type, text);
      window.setTimeout(() => {
        this.message.text = '';
      }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: UserModel) => {
       if (user) {
         if (user.password === formData.password) {
           this.message.text = '';
           window.localStorage.setItem('user', JSON.stringify(user));
           this.authService.login();
           this.router.navigate(['/system', 'bill']);
         } else {
           this.showMessage('Wrong pass');
         }
       } else {
         this.showMessage('No user exist');
       }
      });
  }
}
