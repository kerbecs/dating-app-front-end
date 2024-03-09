import {UserMatchAction} from "../../welcome-page/helper/user-match-action";

export class NotificationDto{
  public id! : string;
  public senderId! : number;
  public receiverId! : number;
  public userMatchAction! : UserMatchAction;
  public time! : Date;
  public read! : boolean;
  public senderFirstName! : string;
}
