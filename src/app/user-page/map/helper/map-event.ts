export class MapEvent {
  private _id!: number
  private _x: number
  private _y: number
  private _userId!: number
  private _description: string
  private _visibilityId!: string
  private _creationDate!: Date;
  private _eventType!: string;
  private _userFullName! : string;
  constructor(x: number, y: number,  description: string) {
    this._x = x;
    this._y = y;
    this._description = description;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
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

  get creationDate(): Date {
    return this._creationDate;
  }

  set creationDate(value: Date) {
    this._creationDate = value;
  }

  get eventType(): string {
    return this._eventType;
  }

  set eventType(value: string) {
    this._eventType = value;
  }

  get userFullName(): string {
    return this._userFullName;
  }

  set userFullName(value: string) {
    this._userFullName = value;
  }
}
