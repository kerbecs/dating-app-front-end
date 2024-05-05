
export class UserPersonalDataDto{
  public firstName! : string;
  public lastName! : string;
  public countryCode! : string;
  public city! : string;
  public gender! : string;
  public educationList! : string[];
  public race! : string | null;
  public sexualOrientation! : string | null;
  public birthDate! : Date;


  constructor(firstName: string, lastName: string, countryCode: string, city: string, gender: string, educationList: string[], race: string | null, sexualOrientation: string | null, birthDate: Date) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.countryCode = countryCode;
    this.city = city;
    this.gender = gender;
    this.educationList = educationList;
    this.race = race;
    this.sexualOrientation = sexualOrientation;
    this.birthDate = birthDate;
  }
}
