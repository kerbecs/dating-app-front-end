import {MessageType} from "./MessageType";

export class Message{
  public messageId! : string;
  public chatId! : string;
  public receiverId! : number;
  public senderId! : number;
  public content! : string;
  public time! : number;
  public isRead! : boolean;
  public messageType!  : MessageType;
  public isOwnMessage = false;
}
