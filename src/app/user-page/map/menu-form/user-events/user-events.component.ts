import {AfterViewInit, Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MenuEventComponent} from "../menu-event/menu-event.component";
import {NgForOf} from "@angular/common";
import {MapService} from "../../service/map.service";
import {Store} from "@ngrx/store";
import {storeType} from "../../../../state/store";
import {MapEvent} from "../../helper/map-event";
import {userDataSelector} from "../../../../state/selector/user-data.selector";
import {RouterLink} from "@angular/router";
import {UserDataDto} from "../../../../state/helper/user-data-dto";

@Component({
  selector: 'app-user-events',
  standalone: true,
  imports: [
    FormsModule,
    MenuEventComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './user-events.component.html',
  styleUrl: './user-events.component.css'
})
export class UserEventsComponent{
  private userData? : UserDataDto | null;
  public userEvents : MapEvent[] = []
  constructor(public mapService : MapService, private store : Store<storeType>) {
    this.store.select(userDataSelector).subscribe(userData => {
      this.userData = userData;
    })
    mapService.mapEventsLoadedSubject.subscribe(() => {
      this.userEvents = this.mapService.mapEvents.filter(event => event.userId == this.userData?.userId);
    })
    if(this.userEvents)  this.userEvents = this.mapService.mapEvents.filter(event => event.userId == this.userData?.userId);

  }

}
