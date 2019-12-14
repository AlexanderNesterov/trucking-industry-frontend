import {Component,} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logining = false;
  hide = true;
  wrongParameters = false;

  loginFormControl = new FormControl('', Validators.required);

  passwordFormControl = new FormControl('', Validators.required);
  loginFormGroup = new FormGroup({
    login: this.loginFormControl,
    password: this.passwordFormControl
  });

  constructor(private loginService: LoginService, private router: Router) {
  }

  login() {
    this.logining = true;
    this.wrongParameters = false;

    const user = {
      login: this.loginFormGroup.controls.login.value,
      password: this.loginFormGroup.controls.password.value
    };

    this.loginService.login(user).subscribe(result => {
      this.logining = false;
      this.router.navigate(['/homepage']);
    }, error => {
      console.log(error);
      if (error.status === 403) {
        this.wrongParameters = true;
      }
      this.logining = false;
    });
  }
}
