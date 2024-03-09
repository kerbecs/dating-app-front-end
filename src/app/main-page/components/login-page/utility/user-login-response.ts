import {UserDataDto} from "../../../../state/helper/user-data-dto";

export class UserLoginResponse{
  private _success : boolean
  private _loginToken : string
  private _generationDate : string
  private _userDataDto : UserDataDto


  constructor(success: boolean, loginToken: string, generationDate: string, userDataDto: UserDataDto) {
    this._success = success;
    this._loginToken = loginToken;
    this._generationDate = generationDate;
    this._userDataDto = userDataDto;
  }

  get success(): boolean {
    return this._success;
  }

  get loginToken(): string {
    return this._loginToken;
  }

  get generationDate(): string {
    return this._generationDate;
  }

  get userDataDto(): UserDataDto {
    return this._userDataDto;
  }

  set userDataDto(value: UserDataDto) {
    this._userDataDto = value;
  }
}
