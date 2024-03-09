import { Component } from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MapService} from "../service/map.service";
import {RouterLink} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MapEventService} from "../service/map-event.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(public mapService : MapService,private snackBar: MatSnackBar, private mapEventService : MapEventService) {
  }
  enableAddingMode(){
    this.mapEventService.enableAddingMode();
    this.mapEventService.setAddedMarkerToNull();
    this.snackBar.open('Click on the map to add an event','Close',{duration: 4000})
  }

}
