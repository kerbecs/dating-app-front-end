import {Injectable, OnDestroy} from "@angular/core";
import {UserDataDto} from "../state/helper/user-data-dto";
import {Store} from "@ngrx/store";
import {storeType} from "../state/store";
import {userDataSelector} from "../state/selector/user-data.selector";
import {environment} from "../../environments/environment";
import {NotificationService} from "../user-page/user-header/service/notification-service";
import {NotificationDto} from "../user-page/user-header/helper/NotificationDto";
import {CompatClient, IFrame, Stomp} from "@stomp/stompjs";
import {HttpClient} from "@angular/common/http";
import {UserStatusDto} from "./helper/userStatusDto";


@Injectable({providedIn: 'root'})
export class NotificationWebSocketService{
  private WSConnection! : CompatClient;
  private userData! : UserDataDto | null;

  constructor(private store : Store<storeType>, private notificationService : NotificationService, private http: HttpClient) {
    this.store.select(userDataSelector)
      .subscribe(user => {
        if(!user) return;
        this.userData = user;
        this.connectStomp();
      })
  }
  public receiveNotification(){
    if(!this.userData || !this.WSConnection) return;
    this.WSConnection.subscribe('/notification/'+this.userData.userId+'/queue',(resp) => {
      const notification = <NotificationDto>JSON.parse(resp.body);
      this.notificationService.addNotification(notification);
    })
  }
  private connectStomp() {
    this.WSConnection = Stomp.client(environment.notificationServiceWS + 'ws');
    this.WSConnection.connect({userId : this.userData?.userId.toString()},
      () => {
      this.receiveNotification();
    });
  }

}
