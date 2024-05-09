import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ElementsControlService} from "../../service/elements-control.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(public elementControlService : ElementsControlService) {
  }

}
