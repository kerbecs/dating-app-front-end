import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {MapEvent} from "../../helper/map-event";
import {MapService} from "../../service/map.service";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu-event',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './menu-event.component.html',
  styleUrl: './menu-event.component.css'
})
export class MenuEventComponent implements AfterViewInit {
  @Input()
  public mapEvent?: MapEvent;

  constructor(private mapService: MapService, private activatedRoute : ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    if(this.activatedRoute.snapshot.queryParams['map-event-id'] && this.activatedRoute.snapshot.queryParams['map-event-id'] == this.mapEvent?.id)
      this.goToEvent();
  }

  clickEvent(event: Event) {
    this.goToEvent();

    event.stopPropagation();
    event.preventDefault();
  }

  private goToEvent() {
    if (!this.mapEvent) return;
    this.mapService.userLocation = {x: this.mapEvent?.x, y: this.mapEvent.y};
    this.mapService.changeMapView()
    this.mapService.openPopup(this.mapEvent.id);
  }

}
