import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Message} from "../helper/Message";
import {Store} from "@ngrx/store";
import {storeType} from "../../../state/store";
import {userDataSelector} from "../../../state/selector/user-data.selector";
import {UserDataDto} from "../../../state/helper/user-data-dto";
import {fr} from "picmo/dist/i18n";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ChatService{
  public selectedUserMessages : Message[] = [];
  public selectedUserId! : number;
  private userData! : UserDataDto | null;
  public isAFriendSelected = false;
  public newMessageSubject = new Subject<Message>();
  public scrollSubject = new Subject<void>();
  public unreadMessages : number = 0;

  constructor(private http : HttpClient, private store : Store<storeType>) {
    store.select(userDataSelector)
      .subscribe(userData=> {
        if(!userData) return;
        this.userData = userData;
        this.getUnreadMessages();
      })
  }

  public getAllUsersMessages(friendId : number){
    if(friendId == this.selectedUserId) return;
    this.selectedUserId = friendId;

    this.http.get(environment.chatService+'message/'+this.userData?.userId+'/'+friendId)
       .subscribe(messages => {
         this.selectedUserMessages = <Message[]>messages;
         this.selectedUserMessages.forEach(message => {
           if(message.senderId == this.userData?.userId) message.isOwnMessage = true;
         })
         this.readMessages();
       })
  }
  public addMessage(message : Message){
    if(message.senderId == this.userData?.userId) message.isOwnMessage = true;
    this.newMessageSubject.next(message);
    this.selectedUserMessages.push(message);
    if(message.senderId == this.userData?.userId) this.selectedUserMessages.push(message);
    this.scrollSubject.next();

  }
  public getLastMessage( senderId : number){
    return this.http.get(environment.chatService+'message/last-message/'+this.userData?.userId+'/'+senderId);
  }
  private readMessages(){
    const unreadMessages = this.selectedUserMessages.filter(message => !message.isOwnMessage && !message.isRead).length;
    this.unreadMessages -= unreadMessages;

    this.http.put(environment.chatService+'message/read-messages/'+this.selectedUserId+'/'+this.userData?.userId,{})
      .subscribe();
  }
  private getUnreadMessages(){
    this.http.get(environment.chatService+'message/unread-message/'+this.userData?.userId)
      .subscribe(resp => {
        this.unreadMessages = <number>resp;
      })
  }

}
