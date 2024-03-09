import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MenuEventComponent} from "../menu-event/menu-event.component";
import {MapService} from "../../service/map.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    ReactiveFormsModule,
    MenuEventComponent,
    RouterLink
  ],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})
export class AllEventsComponent {
  constructor(public mapService : MapService) {
  }
}
