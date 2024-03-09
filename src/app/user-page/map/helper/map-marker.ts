import {marker, Marker} from "leaflet";

export class MapMarker{
  private _id : number;
  private _marker : Marker;


  constructor(id: number, marker: Marker) {
    this._id = id;
    this._marker = marker;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get marker(): Marker {
    return this._marker;
  }

  set marker(value: Marker) {
    this._marker = value;
  }
}
