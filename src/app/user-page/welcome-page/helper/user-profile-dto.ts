import {Coords} from "./coords";

export class UserProfileDto{
  public id! : string;
  public userId! : number;
  public firstName! : string;
  public lastName! : string;
  public countryCode! : string;
  public city! : string;
  public gender! : string;
  public educationList! : string[];
  public preferenceList! : string[];
  public race! : string;
  public sexualOrientation! : string;
  public birthDate! : Date;
  public imgUrl! : string;
  public connexions! : number[];
  public online! : boolean;
  public coords! : Coords;
  public images! : string[];

  private _compatibility! : number;
  private _distance! : number;


  get compatibility(): number {
    return this._compatibility;
  }

  set compatibility(value: number) {
    this._compatibility = value;
  }

  get distance(): number {
    return this._distance;
  }

  set distance(value: number) {
    this._distance = value;
  }
}
