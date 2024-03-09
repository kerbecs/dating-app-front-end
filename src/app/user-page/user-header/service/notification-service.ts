import {Injectable} from "@angular/core";
import {NotificationDto} from "../helper/NotificationDto";
import {UserMatchAction} from "../../welcome-page/helper/user-match-action";
import {UserDataDto} from "../../../state/helper/user-data-dto";
import {Store} from "@ngrx/store";
import {storeType} from "../../../state/store";
import {userDataSelector} from "../../../state/selector/user-data.selector";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class NotificationService{
  public notifications : NotificationDto[] = [];
  private userData! : UserDataDto;
  constructor(private store : Store<storeType>, private http : HttpClient) {
    store.select(userDataSelector)
      .subscribe(userData => {
        if(!userData) return;
        this.userData = userData;
        this.getActivesNotification()
      })
  }

  public addNotification(notification : NotificationDto){
    this.notifications.unshift(notification);
  }
  private getActivesNotification(){
    this.http.get(environment.notificationService+'notification/'+this.userData.userId)
      .subscribe(resp => {
        this.notifications.push(...<NotificationDto[]>resp);
      })
  }
}
