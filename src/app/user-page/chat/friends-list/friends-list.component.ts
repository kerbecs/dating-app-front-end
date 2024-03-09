import { Component } from '@angular/core';
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {ElementsControlService} from "../service/elements-control.service";
import {FriendComponent} from "./friend/friend.component";
import {NgForOf} from "@angular/common";
import {Store} from "@ngrx/store";
import {storeType} from "../../../state/store";
import {userDataSelector} from "../../../state/selector/user-data.selector";
import {UserProfileDto} from "../../welcome-page/helper/user-profile-dto";
import {connexionsProfilesSelector} from "../../../state/selector/connexions-profiles.selector";

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
  public userConnexions : UserProfileDto[] = [];
  constructor(
    private elementsControlService : ElementsControlService,
    private store : Store<storeType>) {
    this.store.select(connexionsProfilesSelector)
      .subscribe(connexions => {
        this.userConnexions = connexions;
      })
  }
  public displayInbox(){
    this.elementsControlService.displayInbox = true;
    this.elementsControlService.displayFriendsList = false;
  }
}
