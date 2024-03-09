import {UserProfileDto} from "../../user-page/welcome-page/helper/user-profile-dto";

export class UserDataDto{
  private _userId : number;
  private _userProfileDto : UserProfileDto;


  constructor(userId: number, userProfileDto : UserProfileDto) {
    this._userId = userId;
    this._userProfileDto = userProfileDto;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get userProfileDto(): UserProfileDto {
    return this._userProfileDto;
  }

  set userProfileDto(value: UserProfileDto) {
    this._userProfileDto = value;
  }
}
