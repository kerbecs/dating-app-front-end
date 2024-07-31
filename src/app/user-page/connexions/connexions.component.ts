import {Component} from '@angular/core';
import {AccountComponent} from "../../main-page/components/register-page/components/account/account.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {NgForOf} from "@angular/common";
import {Store} from "@ngrx/store";
import {storeType} from "../../state/store";
import {UserProfileDto} from "../welcome-page/helper/user-profile-dto";
import {connexionsProfilesSelector} from "../../state/selector/connexions-profiles.selector";

@Component({
  selector: 'app-connexions',
  standalone: true,
  imports: [
    AccountComponent,
    UserProfileComponent,
    NgForOf
  ],
  templateUrl: './connexions.component.html',
  styleUrl: './connexions.component.css'
})
export class ConnexionsComponent {
  public connexionsProfiles: UserProfileDto[] = [];

  constructor(public store: Store<storeType>) {
    this.store.select(connexionsProfilesSelector)
      .subscribe(connexions => {
        this.connexionsProfiles = connexions;
      })
  }

}
