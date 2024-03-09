import { Component } from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {AddEventFormComponent} from "./add-event-form/add-event-form.component";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    AddEventFormComponent,
    RouterOutlet,
    NgClass
  ],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.css'
})
export class MenuFormComponent {
  constructor(private router : Router) {
  }
  enableScrollY(){
    return this.router.url !== '/user/map/event/newEvent'
  }

}
