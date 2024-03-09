import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {NgIf} from "@angular/common";
import {RegisterUserService} from "../../service/register-user-service";
import {UserRegister} from "../../utility/user-register";
import {FormControlService} from "../../service/form-control-service";

@Component({
  selector: 'app-agrements',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    MatCheckbox,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './agrements.component.html',
  styleUrl: './agrements.component.css'
})
export class AgrementsComponent {
  constructor(public formControlService : FormControlService, private registerUserService : RegisterUserService) {
  }
  public registerUser(){
    const user  = new UserRegister(
      this.formControlService.getGeneralInfoFormGroup().controls['firstName'].value,
      this.formControlService.getGeneralInfoFormGroup().controls['lastName'].value,
      this.formControlService.getGeneralInfoFormGroup().controls['country'].value,
      this.formControlService.getGeneralInfoFormGroup().controls['city'].value,
      this.formControlService.getGeneralInfoFormGroup().controls['gender'].value,
      this.formControlService.getGeneralInfoFormGroup().controls['birthDate'].value,
      this.formControlService.getAccountFormGroup().controls['email'].value,
      this.formControlService.getAccountFormGroup().controls['password'].value,
      this.formControlService.getAccountFormGroup().controls['repeatedPassword'].value,
      this.formControlService.getAgreementsFormGroup().controls['declareIsAdult'].value,
      this.formControlService.getAgreementsFormGroup().controls['declareAgreeTerms'].value
    );

    this.registerUserService.registerUser(user);
  }

}
