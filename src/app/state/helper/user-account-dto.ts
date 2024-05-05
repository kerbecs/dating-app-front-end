export class UserAccountDto{
  private _id! : number;
  private _email! : string;
  private _isActive! : string;
  private _registrationDate! : Date;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get isActive(): string {
    return this._isActive;
  }

  set isActive(value: string) {
    this._isActive = value;
  }

  get registrationDate(): Date {
    return this._registrationDate;
  }

  set registrationDate(value: Date) {
    this._registrationDate = value;
  }
}
