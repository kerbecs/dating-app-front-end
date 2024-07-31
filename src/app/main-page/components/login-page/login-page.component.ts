import {Component} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {RouterLink, RouterOutlet} from "@angular/router";
import {LoginService} from "./service/login.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {LoginComponent} from "./component/login/login.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    MatCheckbox,
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    MatButton,
    LoginComponent,
    RouterOutlet
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  providers: [LoginService]
})
export class LoginPageComponent {
}
