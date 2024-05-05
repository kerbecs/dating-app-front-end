import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,
        MatCheckbox,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatSuffix,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './login.component.html',
  styleUrl: '../../login-page.component.css'
})
export class LoginComponent {
  constructor(public loginService : LoginService,private _snackBar: MatSnackBar) {
    this.loginService.errorSubject.subscribe(resp => {
      if(resp) this.openSnackBar("Invalid email or/and password", 'Close')
    })

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 5000});
  }
  closeSnackBar(){
    this._snackBar.dismiss();
  }
}
