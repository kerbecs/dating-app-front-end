import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-forgot-password',
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
    RouterLink,
    NgIf
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: '../../login-page.component.css'
})
export class ForgotPasswordComponent {
  public tokenCreated = false;

  constructor(public loginService: LoginService) {

  }

  public createResetPasswordToken() {
    this.loginService.createResetPasswordToken()
      .subscribe(resp => this.tokenCreated = true);
  }

}
