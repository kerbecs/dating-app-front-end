import {Component, Input} from "@angular/core";
import {Message} from "../../helper/Message";
import {UserDataDto} from "../../../../state/helper/user-data-dto";
import {Store} from "@ngrx/store";
import {storeType} from "../../../../state/store";
import {userDataSelector} from "../../../../state/selector/user-data.selector";
import {FriendMessageComponent} from "./friend-message/friend-message.component";
import {UserMessageComponent} from "./user-message/user-message.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    FriendMessageComponent,
    UserMessageComponent,
    NgIf
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent{
  @Input()
  public message! : Message;
  private userData! : UserDataDto | null;

  constructor(store : Store<storeType>) {
    store.select(userDataSelector)
      .subscribe(userData => {
        this.userData = userData;
      })
  }
}
