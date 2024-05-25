import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MapEvent} from "../helper/map-event";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import * as L from "leaflet";
import {Marker} from "leaflet";
import {storeType} from "../../../state/store";
import {Store} from "@ngrx/store";
import {getUserLocation} from "../../../state/action/user-location.actions";
import {userLocationSelector} from "../../../state/selector/user-location.selector";
import {mapOptions} from "../helper/map-options";
import {EventIcon} from "../menu-form/add-event-form/helper/event-icon";
import {defaultEventIcon, homeEventIcon} from "../menu-form/add-event-form/helper/event-icons";
import {Subject} from "rxjs";
import {UserDataDto} from "../../../state/helper/user-data-dto";
import {userDataSelector} from "../../../state/selector/user-data.selector";
import {MapMarker} from "../helper/map-marker";
import {loginTokenSelector} from "../../../state/selector/login-token.selector";


@Injectable({providedIn: "root"})
export class MapService {
  private _map!: L.Map
  private _userLocation: { x: number, y: number } = {x: 51.505, y: -0.09};
  private mapMarkers: MapMarker[] = [];
  private loginToken!: string;
  public mapInitializedSubject = new Subject<void>();
  public userDataDto!: UserDataDto | null;
  public mapEvents: MapEvent[] = [];
  public mapEventsLoadedSubject = new Subject<void>();

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private store: Store<storeType>) {
    store.select(userLocationSelector).subscribe(userLocation => {
      this._userLocation = userLocation
    })
    store.select(userDataSelector).subscribe(userData => {
      this.userDataDto = userData;
    });
    store.select(loginTokenSelector).subscribe(loginToken => {
      if (loginToken) this.loginToken = loginToken
    });
  }

  public initMap() {
    this.map = L.map('map')

    this.changeMapView(this._userLocation.x, this._userLocation.y);
    L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', mapOptions).addTo(this.map);

    this.setUserCurrentPosition();
    this.loadAllUsersEvents();

    this.mapInitializedSubject.next();
  }

  private setUserCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (coords) => {
        const {latitude, longitude} = coords.coords
        this._userLocation = {x: latitude, y: longitude}

        this.store.dispatch(getUserLocation(this._userLocation))
        this.changeMapView(this._userLocation.x, this._userLocation.y);
        this.addHomeMarker();
      },
      () => alert("Can not get your location!"))
  }

  private addHomeMarker() {
    this.createMarker(
      new MapEvent(this._userLocation.x, this._userLocation.y, ''),
      this.createIcon(homeEventIcon)
    )
  }

  private loadAllUsersEvents() {
    this.getMapEvents().subscribe({
      next: resp => {
        (<MapEvent[]>resp).forEach(mapEvent => {
            const marker = this.createMarker(mapEvent, this.createIcon(defaultEventIcon))
            this.addPopupToMarker(marker, mapEvent);
          }
        )
        this.mapEvents = <MapEvent[]>resp;
        this.mapEventsLoadedSubject.next();
        this.checkQueryParams();
      }
    })
  }

  public createMarker(mapEvent: MapEvent, icon: L.Icon) {
    const marker = L.marker(
      [mapEvent.x, mapEvent.y],
      {icon: icon}
    );

    marker.addTo(this.map);

    return marker;
  }

  public addPopupToMarker(marker: Marker | null, mapEvent: MapEvent) {
    if (!marker) return;
    const popupContent = this.popupHTML(mapEvent);

    marker.bindPopup(popupContent);

    marker.on('click', () => {
      marker.openPopup();
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          eventId: mapEvent.id
        }
      })
    });
    this.mapMarkers.push(new MapMarker(mapEvent.id, marker));

  }

  createIcon(eventIcon: EventIcon) {
    return L.icon({
      iconUrl: eventIcon.iconUrl,
      shadowUrl: eventIcon.shadowUrl,
      iconAnchor: eventIcon.iconAnchor, //divide by 2 width from iconSize
      iconSize: eventIcon.iconSize,
    })
  }


  private popupHTML(mapEvent: MapEvent) {
    return `
      <p style="text-align: center"><b>${mapEvent.eventType}</b></p>
      User: <b>${mapEvent.userFullName ?? 'Unknown'} </b> <br>
      Creation date: <b>${mapEvent.creationDate}</b> <br>
      Description: <b>${mapEvent.description}</b>
    `
  }

  public changeMapView(x: number, y: number, z: number = 16) {
    this.map.setView([x, y], z);
  }

  public openPopup(markerId: number) {
    const marker = this.mapMarkers.find(it => it.id == markerId)?.marker;
    if (!marker) return;
    marker?.openPopup()
    this._map.panTo(marker?.getLatLng());
  }

  getMapEvents() {
    return this.http.get(environment.mapService + "map/events", {
      headers: {
        loginToken: this.loginToken
      }
    });
  }

  private checkQueryParams(): void {
    const eventId = this.activatedRoute.snapshot.queryParams['eventId'];
    if (!eventId) return;

    const mapMarket = this.mapMarkers.find(mapMarker => mapMarker.id == eventId)
    const event = this.mapEvents.find(event => event.id == eventId);
    if (!mapMarket || !event) return;
    this.changeMapView(event.x, event.y);
    this.openPopup(mapMarket.id);

  }

  get map(): L.Map {
    return this._map;
  }

  set map(value: L.Map) {
    this._map = value;
  }

  get userLocation(): { x: number; y: number } {
    return this._userLocation;
  }

  set userLocation(value: { x: number; y: number }) {
    this._userLocation = value;
  }


}
