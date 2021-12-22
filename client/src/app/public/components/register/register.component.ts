import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserService } from '../../services/user-service/user.service';
import { CustomValidator } from '../../_helpers/customer-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  formRegister: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    conformPassword: new FormControl(null, [Validators.required])
  },//to use the abstract controller validation
  {validators:CustomValidator.passwordMatching}
  );

  constructor(private userService: UserService, private router: Router) {}

  get email(): FormControl {
    return this.formRegister.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.formRegister.get('password') as FormControl;
  }

  get conformPassword(): FormControl {
    return this.formRegister.get('conformPassword') as FormControl;
  }


  register(){
    if(this.formRegister.valid) {
      this.userService.create({
        email: this.email.value,
        password: this.password.value,
      }).pipe(
        tap(() => this.router.navigate(['../login']))
      ).subscribe((result) => {
      });
    }
    else {
      console.log('error occur');
    }
  }
}
