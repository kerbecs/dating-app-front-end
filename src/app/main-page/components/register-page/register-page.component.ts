import {Component, Input} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {GeneralInfoComponent} from "./components/general-info/general-info.component";
import {AccountComponent} from "./components/account/account.component";
import {AgrementsComponent} from "./components/agrements/agrements.component";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormControlService} from "./service/form-control-service";
import {NgIf} from "@angular/common";
import {RegisterUserService} from "./service/register-user-service";

@Component({
  selector: 'app-register-page',
  standalone: true,
    imports: [
        MatTabGroup, MatTab, GeneralInfoComponent, AccountComponent, AgrementsComponent, MatStep, MatFormField, MatLabel, MatStepper, MatInput, FormsModule, MatButton, MatStepperNext, MatStepLabel, ReactiveFormsModule, NgIf
    ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  constructor(public formControlService : FormControlService, public registerUserService : RegisterUserService) {
  }
}
