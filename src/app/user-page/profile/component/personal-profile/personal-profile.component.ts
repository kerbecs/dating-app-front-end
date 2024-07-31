import {Component} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatOption} from "@angular/material/autocomplete";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {Store} from "@ngrx/store";
import {storeType} from "../../../../state/store";
import {countryListSelector} from "../../../../state/selector/country-list.selector";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {MatSlider, MatSliderRangeThumb} from "@angular/material/slider";
import {EnumFormatPipe} from "../../../pipe/enum-format.pipe";
import {educationSelector} from "../../../../state/selector/education.selector";
import {sexualOrientationSelector} from "../../../../state/selector/sexual-orientation.selector";
import {raceSelector} from "../../../../state/selector/race.selector";
import {genderSelector} from "../../../../state/selector/gender.selector";
import {PersonalProfileService} from "../../service/personal-profile.service";

@Component({
  selector: 'app-personal-profile',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton,
    MatSelect,
    MatOption,
    NgForOf,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    NgIf,
    MatSlider,
    MatSliderRangeThumb,
    EnumFormatPipe,
  ],
  templateUrl: './personal-profile.component.html',
  styleUrl: './personal-profile.component.css'
})
export class PersonalProfileComponent {
  public countryList : {name: string, code : string }[] = [];
  public preferenceList : string[] = [];
  public educationList : string[] = [];
  public sexualOrientationList : string[] = [];
  public raceLit : string[] = [];
  public genderList : string[] = [];
  constructor(store : Store<storeType>, public personalProfileService : PersonalProfileService) {
    store.select(countryListSelector)
      .subscribe(countryList => this.countryList = countryList);
    store.select(educationSelector)
      .subscribe(educationList => {
        this.educationList = educationList;
      })
    store.select(sexualOrientationSelector)
      .subscribe(sexualOrientationList => {
        this.sexualOrientationList = sexualOrientationList;
      })
    store.select(raceSelector)
      .subscribe(raceLit => {
        this.raceLit = raceLit;
      })
    store.select(genderSelector)
      .subscribe(genderList => {
        this.genderList = genderList;
      })
  }
  public enableSaveButton(){
  return this.personalProfileService.personalProfileForm.controls['firstName'].valid
    &&
    this.personalProfileService.personalProfileForm.controls['lastName'].valid
    &&
    this.personalProfileService.personalProfileForm.controls['country'].valid
    &&
    this.personalProfileService.personalProfileForm.controls['city'].valid
    &&
    this.personalProfileService.personalProfileForm.controls['gender'].valid
    &&
    this.personalProfileService.personalProfileForm.controls['birthDate'].valid
  }

}
