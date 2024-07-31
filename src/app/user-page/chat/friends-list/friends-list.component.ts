import {Component} from '@angular/core';
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {ElementsControlService} from "../service/elements-control.service";
import {FriendComponent} from "./friend/friend.component";
import {NgForOf} from "@angular/common";
import {FriendsService} from "../service/friends.service";

@Component({
  selector: 'app-friends-list',
  standalone: true,
  imports: [
    SearchBarComponent,
    FriendComponent,
    NgForOf
  ],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.css'
})
export class FriendsListComponent {
  constructor(
    private elementsControlService: ElementsControlService, public friendService: FriendsService) {
  }

  public displayInbox() {
    this.elementsControlService.displayInbox = true;
    this.elementsControlService.displayFriendsList = false;
  }
}
