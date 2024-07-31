import {Injectable} from "@angular/core";
import {CompatClient, Stomp} from "@stomp/stompjs";
import {environment} from "../../environments/environment";
import {Message} from "../user-page/chat/helper/Message";
import {Store} from "@ngrx/store";
import {storeType} from "../state/store";
import {userDataSelector} from "../state/selector/user-data.selector";
import {UserDataDto} from "../state/helper/user-data-dto";
import {ChatService} from "../user-page/chat/service/chat.service";
import {NotificationService} from "../user-page/user-header/service/notification-service";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class MessageWebSocketService {
  private WSConnection! : CompatClient;
  private userData! : UserDataDto | null;
  private userSubscribed = false;

  constructor(private store : Store<storeType>, private chatService : ChatService, private notificationService : NotificationService, private router : Router) {
    this.connectStomp();
    this.store.select(userDataSelector)
      .subscribe(user => {
        this.userData = user;
        if(user && !this.userSubscribed) this.receiveMessage();
      })
  }
  receiveMessage(){
    console.log('received')
    if(!this.WSConnection || !this.userData) return;
    this.WSConnection.subscribe('/user/'+this.userData.userId+'/queue/message',(resp) => {
      const message = <Message>JSON.parse(resp.body);
      this.chatService.addMessage(message);
      this.incrementNumberOfUnreadMessages(message);
    })
  }
  sendMessage(content : string){
    if(!this.WSConnection || !this.userData) return;
    const message = new Message();

    message.content = content;
    message.senderId = this.userData.userId;
    message.receiverId = this.chatService.selectedUserId;
    message.isRead = false;


    this.WSConnection.send('/message', {},JSON.stringify(message));
    this.chatService.addMessage(message);
  }
  private connectStomp(){
    this.WSConnection = Stomp.client(environment.chatServiceWS+'ws')
    this.WSConnection.connect({},() => {})
  }
  private incrementNumberOfUnreadMessages(message : Message){
    if(this.chatService.unreadMessages < 0 ) this.chatService.unreadMessages = 0;
    if(this.router.url != '/user/chat'){
      this.chatService.unreadMessages++;
    }
  }

}
