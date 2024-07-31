import {Component} from '@angular/core';
import {PreferencesService} from "../../service/preferences.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {EnumFormatPipe} from "../../../pipe/enum-format.pipe";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    EnumFormatPipe,
    MatOption,
    MatSelect,
    MatList,
    MatListItem,
    MatDivider,
    MatButton,
    MatIconButton
  ],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent {
  constructor(public preferenceService : PreferencesService) {

  }



}
