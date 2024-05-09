import {Component} from '@angular/core';
import {FriendsListComponent} from "./friends-list/friends-list.component";
import {InboxComponent} from "./inbox/inbox.component";
import {MenuComponent} from "./menu/menu.component";
import {ElementsControlService} from "./service/elements-control.service";
import {NgIf} from "@angular/common";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {UserMessageComponent} from "./inbox/message/user-message/user-message.component";
import {DatePipe} from "./pipe/date.pipe";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FriendsListComponent,
    InboxComponent,
    MenuComponent,
    NgIf,
    UserMessageComponent,
    DatePipe
  ],
  providers: [
    ElementsControlService
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  constructor(public elementsControlService: ElementsControlService, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      "(min-width: 768px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        elementsControlService.displayFriendsList = true;
        elementsControlService.displayInbox = true;
      }
      else{
        elementsControlService.displayFriendsList = true;
        elementsControlService.displayInbox = false;
      }
    });
  }
}
