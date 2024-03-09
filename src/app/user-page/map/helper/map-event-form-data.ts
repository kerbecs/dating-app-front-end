export class MapEventFormData{
  private _description : string
  private _visibilityId : string
  private _eventType : string;

  constructor(description: string, visibilityId: string, eventType: string) {
    this._description = description;
    this._visibilityId = visibilityId;
    this._eventType = eventType;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get visibilityId(): string {
    return this._visibilityId;
  }

  set visibilityId(value: string) {
    this._visibilityId = value;
  }

  get eventType(): string {
    return this._eventType;
  }

  set eventType(value: string) {
    this._eventType = value;
  }
}
