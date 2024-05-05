import {AfterViewInit, Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {MatTooltip} from "@angular/material/tooltip";
import {NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-new-password',
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
    MatTooltip,
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './new-password.component.html',
  styleUrls: ['../../login-page.component.css','./new-password.component.css']
})
export class NewPasswordComponent implements AfterViewInit{
  public displayPasswordErrorChange = false;
  public displayPasswordSuccessChange = false;
  public tokenIsValid = false;
  public token! : string;
  constructor(public loginService : LoginService, public activatedRoute : ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
    this.loginService.validateToken(this.token)
      .subscribe({
        next: (resp) => {
          const response = <boolean>resp;
          if(response){
            this.tokenIsValid = true;
          }
          else{
            this.tokenIsValid = false;
            this.displayPasswordErrorChange = true;
            this.displayPasswordSuccessChange = false;
          }
        },
        error: (resp) => {
          this.tokenIsValid = false;
          this.displayPasswordErrorChange = true;
          this.displayPasswordSuccessChange = false;
        }
      })
  }
  changePassword(){
    if(!this.loginService.newPasswordForm.controls?.['password']?.value) return;
    this.loginService.changePassword(this.token, this.loginService.newPasswordForm.controls['password'].value)
      .subscribe({
        next: (resp) => {
          if(<boolean>resp){
            this.displayPasswordSuccessChange = true;
            this.tokenIsValid = false;
          }
          else this.displayPasswordErrorChange = true;
        },
        error: (resp) => {
          this.displayPasswordErrorChange = true;
    }
      })
  }
}
