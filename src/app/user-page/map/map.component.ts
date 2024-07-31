import {AfterViewInit, Component} from '@angular/core';
import {MapService} from "./service/map.service";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MenuComponent} from "./menu/menu.component";
import {MenuFormComponent} from "./menu-form/menu-form.component";
import {NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MenuComponent,
    MenuFormComponent,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './map.component.html',
  styleUrls: [ '../../../../node_modules/leaflet/dist/leaflet.css','./map.component.css']
})
export class MapComponent implements AfterViewInit {
  constructor(public mapService: MapService) {

  }

  ngAfterViewInit() {
    this.mapService.initMap();
  }




}
