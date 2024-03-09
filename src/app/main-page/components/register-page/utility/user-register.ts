export class UserRegister {
  constructor(
    private firstName : string,
    private lastName : string,
    private countryCode : number,
    private city : string,
    private gender : string,
    private birthDate : number,
    private email : string,
    private password : string,
    private repeatedPassword : string,
    private declareIsAdult : boolean,
    private declareAgreeTerms : boolean
  ) {
  }
}
