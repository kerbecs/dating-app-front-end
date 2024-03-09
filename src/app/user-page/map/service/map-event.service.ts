import {Injectable} from "@angular/core";
import {Marker} from "leaflet";
import {MapService} from "./map.service";
import {MapEvent} from "../helper/map-event";
import {defaultEventIcon} from "../menu-form/add-event-form/helper/event-icons";
import {Subject} from "rxjs";
import {SendMapEvent} from "../helper/send-map-event";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Store} from "@ngrx/store";
import {storeType} from "../../../state/store";
import {loginTokenSelector} from "../../../state/selector/login-token.selector";
import {MapEventFormData} from "../helper/map-event-form-data";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class MapEventService {
  private addingMode = false;
  public userAddedMarkerSubject = new Subject<boolean>()
  public eventAddedSubject = new Subject<boolean>()
  private addedMarker: Marker | null = null;
  private userToken: string | null = null;

  constructor(private mapService: MapService, private http: HttpClient, private router : Router, private store : Store<storeType>) {
    store.select(loginTokenSelector).subscribe(token => this.userToken = token);
    mapService.mapInitializedSubject.subscribe(this.addMapClickEvent.bind(this))
  }

  addMapClickEvent() {
    this.mapService.map.on('click', mapProperty => {
      if (this.addingMode && !this.addedMarker) {
        this.addedMarker = this.mapService.createMarker(new MapEvent(mapProperty.latlng.lat, mapProperty.latlng.lng, ''), this.mapService.createIcon(defaultEventIcon));
        this.userAddedMarkerSubject.next(true);
      }
    })
  }

  saveAddedEvent(mapEventForm: MapEventFormData) {
    const sendMapEvent = new SendMapEvent(
      this.addedMarker?.getLatLng().lat ?? 0, this.addedMarker?.getLatLng().lng ?? 0,
      mapEventForm.description, mapEventForm.visibilityId, mapEventForm.eventType);
    sendMapEvent.setToken(this.userToken ?? '');

    this.mapService.addPopupToMarker(this.addedMarker,new MapEvent(sendMapEvent.getX(),sendMapEvent.getY(),sendMapEvent.getDescription()))

    this.http.post(environment.mapService + 'map/event', sendMapEvent)
      .subscribe((resp) => {
        const mapEvent = <MapEvent>resp;
        mapEvent.userFullName = this.mapService.userDataDto?.userProfileDto.firstName+" "+this.mapService.userDataDto?.userProfileDto.lastName;
        this.mapService.addPopupToMarker(this.addedMarker, mapEvent);
        this.addedMarker = null;
        this.userAddedMarkerSubject.next(false);
        this.addingMode = false;

        this.eventAddedSubject.next(true)
        this.mapService.mapEvents.push(mapEvent);
      })

  }

  enableAddingMode() {
    this.addingMode = true;
  }

  disableAddingMode() {
    this.addingMode = false;
  }

  userAddedMarker() {
    this.userAddedMarkerSubject.next(true);
  }

  removeAddedMarker() {
    if (!this.addedMarker) return;
    this.addedMarker.remove();
    this.addedMarker = null;
  }

  setAddedMarkerToNull() {
    this.addedMarker = null;
  }
  setLinkToMainMap(){
    this.router.navigate(['user','map'])
  }


}
