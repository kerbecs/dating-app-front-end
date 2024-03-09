import {UserMatchAction} from "./user-match-action";

export class UserCompatibilityDto{
  public id! : string;
  public senderId! : number;
  public receiverId! : number;
  public userMatchAction! : UserMatchAction;
  public time! : Date;

  constructor(senderId: number, receiverId: number, userMatchAction: UserMatchAction) {
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.userMatchAction = userMatchAction;
  }
}
