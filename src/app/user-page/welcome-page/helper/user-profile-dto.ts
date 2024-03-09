
export class UserProfileDto{
  public id! : string;
  public userId! : number;
  public firstName! : string;
  public lastName! : string;
  public countryCode! : string;
  public city! : string;
  public gender! : string;
  public birthDate! : Date;
  public imgUrl! : string;
  public connexions! : number[];
  public online! : boolean;
}
