import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {UserHeaderComponent} from "./user-header/user-header.component";
import {MessageWebSocketService} from "../websocket/message-web-socket.service";
import {NotificationWebSocketService} from "../websocket/notification-web-socket.service";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    RouterOutlet,
    UserHeaderComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  public showFriendList = true;
  constructor(private webSocketService : MessageWebSocketService, private notificationWebSocketService : NotificationWebSocketService) {
  }

}
