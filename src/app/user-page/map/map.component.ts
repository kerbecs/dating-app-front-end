import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import * as L from 'leaflet';
import {Store} from "@ngrx/store";
import {userLocationSelector} from "../../state/selector/user-location.selector";
import {storeType} from "../../state/store";
import {getUserLocation} from "../../state/action/user-location.actions";
import {MapService} from "./service/map.service";
import {MapEvent} from "./helper/map-event";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MenuComponent} from "./menu/menu.component";
import {MenuFormComponent} from "./menu-form/menu-form.component";
import {NgIf} from "@angular/common";
import {Marker} from "leaflet";
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
