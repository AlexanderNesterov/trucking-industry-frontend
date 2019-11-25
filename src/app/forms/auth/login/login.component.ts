import {Component,} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../services/login.service';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;

  loginFormControl = new FormControl('', Validators.required);
  passwordFormControl = new FormControl('', Validators.required);

  loginFormGroup = new FormGroup({
    login: this.loginFormControl,
    password: this.passwordFormControl
  });

  constructor(private loginService: LoginService, private router: Router) {
  }

  login() {
    const user = {
      login: this.loginFormGroup.controls.login.value,
      password: this.loginFormGroup.controls.password.value
    };

    this.loginService.login(user).subscribe(result => {
      console.log(result);
      this.router.navigate(['/driver-info']);
    });
  }
}
