import {PointExpression} from "leaflet";

export class EventIcon{
  private _iconUrl: string
  private _shadowUrl: string
  private _iconAnchor: PointExpression
  private _iconSize: PointExpression

  constructor(iconUrl: string, shadowUrl: string, iconAnchor: PointExpression, iconSize: PointExpression) {
    this._iconUrl = iconUrl;
    this._shadowUrl = shadowUrl;
    this._iconAnchor = iconAnchor;
    this._iconSize = iconSize;
  }

  get iconUrl(): string {
    return this._iconUrl;
  }

  set iconUrl(value: string) {
    this._iconUrl = value;
  }

  get shadowUrl(): string {
    return this._shadowUrl;
  }

  set shadowUrl(value: string) {
    this._shadowUrl = value;
  }

  get iconAnchor(): PointExpression {
    return this._iconAnchor;
  }

  set iconAnchor(value: PointExpression) {
    this._iconAnchor = value;
  }

  get iconSize(): PointExpression {
    return this._iconSize;
  }

  set iconSize(value: PointExpression) {
    this._iconSize = value;
  }
}
